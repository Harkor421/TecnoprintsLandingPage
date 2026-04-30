const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')

const app = express()
const PORT = process.env.PORT || 3001
const server = http.createServer(app)

// ─── WebSocket Manager ──────────────────────────────────────

const BAMBUFARM_API = 'https://bambufarm-api-production.up.railway.app'
const CAMERA_REFRESH_INTERVAL = 1500 // 1.5 seconds

class CameraManager {
  constructor() {
    this.connections = new Map() // clientId → { ws, printers[], refreshInterval }
    this.frameCache = new Map() // printerId → Buffer (latest JPEG)
  }

  addConnection(clientId, ws, printers) {
    if (this.connections.has(clientId)) {
      const old = this.connections.get(clientId)
      if (old.refreshInterval) clearInterval(old.refreshInterval)
    }

    const connection = { ws, printers, refreshInterval: null, isAlive: true }

    // Start fetching frames for this client's printers
    connection.refreshInterval = setInterval(() => this._fetchFrames(printers), CAMERA_REFRESH_INTERVAL)

    this.connections.set(clientId, connection)
    console.log(`[WS] Camera client ${clientId} connected, watching ${printers.length} cameras`)
  }

  removeConnection(clientId) {
    const conn = this.connections.get(clientId)
    if (conn && conn.refreshInterval) clearInterval(conn.refreshInterval)
    this.connections.delete(clientId)
    console.log(`[WS] Camera client ${clientId} disconnected`)
  }

  async _fetchFrames(printers) {
    for (const printerId of printers) {
      try {
        const res = await fetch(`${BAMBUFARM_API}/api/public/cameras/${printerId}/frame`, {
          timeout: 5000,
        })
        if (res.ok) {
          const buffer = await res.arrayBuffer()
          this.frameCache.set(printerId, Buffer.from(buffer))
          this._broadcastFrame(printerId, buffer)
        }
      } catch (err) {
        console.warn(`[WS] Failed to fetch frame for ${printerId}:`, err.message)
      }
    }
  }

  _broadcastFrame(printerId, frameBuffer) {
    // Send to all clients subscribed to this printer
    for (const [, conn] of this.connections) {
      if (conn.printers.includes(printerId) && conn.ws.readyState === 1) {
        try {
          conn.ws.send(JSON.stringify({
            type: 'frame',
            printerId,
            timestamp: Date.now(),
          }), (err) => {
            if (err) console.error('[WS] Send failed:', err.message)
          })
        } catch (err) {
          console.error('[WS] Broadcast error:', err.message)
        }
      }
    }
  }

  getFrame(printerId) {
    return this.frameCache.get(printerId) || null
  }
}

const cameraManager = new CameraManager()

// CORS — allow Tecnoprints domains
app.use(cors({
  origin: [
    'https://tecnoprints.com',
    'https://www.tecnoprints.com',
    'http://localhost:3000',
    /\.vercel\.app$/,
  ],
}))

// ─── REST Routes ─────────────────────────────────────────────

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// In-memory cache to avoid hammering MakerWorld
const modelsCache = new Map() // cacheKey → { data, expiresAt }
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

// Image transform for smaller thumbnails (BBL OSS supports resize)
const thumbnailUrl = (url) => {
  if (!url) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}x-oss-process=image/resize,w_400/format,webp/quality,Q_80`
}

const mapHit = (d) => ({
  id: d.id,
  title: d.title,
  slug: d.slug,
  cover: thumbnailUrl(d.cover),
  coverFull: d.cover,
  likeCount: d.likeCount || 0,
  downloadCount: d.downloadCount || 0,
  printCount: d.printCount || 0,
  collectionCount: d.collectionCount || 0,
  creator: d.designCreator?.name || 'Unknown',
  tags: d.tags || [],
  url: `https://makerworld.com/en/models/${d.id}`,
  hotScore: d.hotScore || 0,
  createTime: d.createTime || '',
})

// Fetch a larger pool from MakerWorld for client-side sorting
async function fetchPool(endpoint, { keyword = '', limit = 50, offset = 0 } = {}) {
  const cacheKey = `pool::${endpoint}::${keyword}::${limit}::${offset}`
  const cached = modelsCache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) return cached.data

  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) })
  if (keyword) params.set('keyword', keyword)

  const url = `https://api.bambulab.com/v1/search-service/select/${endpoint}?${params}`
  const resp = await fetch(url)
  if (!resp.ok) {
    console.error(`[MakerWorld] ${endpoint} returned ${resp.status}`)
    return { hits: [], total: 0 }
  }

  const data = await resp.json()
  const result = { hits: data?.hits || [], total: data?.total || 0 }

  modelsCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_TTL_MS })

  // Cleanup old cache entries occasionally
  if (modelsCache.size > 100) {
    const now = Date.now()
    for (const [key, val] of modelsCache.entries()) {
      if (val.expiresAt < now) modelsCache.delete(key)
    }
  }

  return result
}

// Available sort modes
//   default / recommend  → /select/design2 (recent recommended)
//   hot                  → /select/design (sorted by hotScore)
//   mostDownloaded       → fetch larger pool from /select/design, sort by downloadCount
//   mostLiked            → fetch larger pool from /select/design, sort by likeCount
//   mostPrinted          → fetch larger pool from /select/design, sort by printCount
//   mostCollected        → fetch larger pool from /select/design, sort by collectionCount
//   newest               → fetch larger pool, sort by createTime desc
const SORT_MODES = new Set([
  '', 'default', 'recommend', 'hot', 'newest',
  'mostDownloaded', 'mostLiked', 'mostPrinted', 'mostCollected',
])

app.get('/api/models', async (req, res) => {
  const keyword = (req.query.keyword || '').toString().trim()
  const page = Math.max(1, parseInt(req.query.page || '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '12', 10)))
  const sortRaw = (req.query.sort || '').toString()
  const sort = SORT_MODES.has(sortRaw) ? sortRaw : ''

  try {
    let models = []
    let total = 0

    if (sort === 'recommend' || sort === 'default' || sort === '') {
      // Use /select/design2 (recommended/recent feed)
      const offset = (page - 1) * limit
      const pool = await fetchPool('design2', { keyword, limit, offset })
      models = pool.hits.map(mapHit)
      total = pool.total
    } else if (sort === 'hot') {
      // Use /select/design with normal pagination (already sorted by hotScore)
      const offset = (page - 1) * limit
      const pool = await fetchPool('design', { keyword, limit, offset })
      models = pool.hits.map(mapHit)
      total = pool.total
    } else {
      // Client-side sort: fetch a bigger pool from /select/design then sort
      const POOL_SIZE = 50
      const pool = await fetchPool('design', { keyword, limit: POOL_SIZE, offset: 0 })
      let sorted = pool.hits.map(mapHit)

      switch (sort) {
        case 'mostDownloaded':
          sorted.sort((a, b) => b.downloadCount - a.downloadCount)
          break
        case 'mostLiked':
          sorted.sort((a, b) => b.likeCount - a.likeCount)
          break
        case 'mostPrinted':
          sorted.sort((a, b) => b.printCount - a.printCount)
          break
        case 'mostCollected':
          sorted.sort((a, b) => b.collectionCount - a.collectionCount)
          break
        case 'newest':
          sorted.sort((a, b) => (b.createTime > a.createTime ? 1 : -1))
          break
      }

      // Apply pagination on the sorted pool
      const offset = (page - 1) * limit
      models = sorted.slice(offset, offset + limit)
      total = pool.total
    }

    res.json({ models, total })
  } catch (err) {
    console.error('[MakerWorld] Error:', err.message)
    res.status(500).json({ error: 'Failed to fetch models', models: [], total: 0 })
  }
})

app.get('/api/models/:id', async (req, res) => {
  const { id } = req.params
  const url = `https://api.bambulab.com/v1/design-service/design/${id}`

  try {
    const resp = await fetch(url)
    if (!resp.ok) {
      console.error(`[MakerWorld] Model detail returned ${resp.status}`)
      return res.status(502).json({ error: 'API unavailable' })
    }

    const d = await resp.json()

    // Extract images and print time from first instance
    const pictures = d.instances?.[0]?.pictures || []
    const images = pictures.map(p => p.url)
    // prediction is in seconds, convert to minutes
    const printTimeMinutes = Math.round((d.instances?.[0]?.prediction || 0) / 60)

    res.json({
      id: d.id,
      title: d.title,
      description: d.summary || d.description || '',
      cover: d.coverUrl,
      likeCount: d.likeCount,
      downloadCount: d.downloadCount,
      printCount: d.printCount,
      creator: d.designCreator?.name || 'Unknown',
      tags: d.tags || [],
      url: `https://makerworld.com/en/models/${d.id}`,
      weight: d.instances?.[0]?.weight || 0,
      printTimeMinutes: printTimeMinutes,
      images: images,
    })
  } catch (err) {
    console.error('[MakerWorld] Model detail error:', err.message)
    res.status(500).json({ error: 'Failed to fetch model' })
  }
})

// ─── WebSocket Server ───────────────────────────────────────

const wss = new WebSocketServer({ noServer: true })

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (url.pathname === '/ws/cameras') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      handleCameraWebSocket(ws)
    })
  } else {
    socket.destroy()
  }
})

function handleCameraWebSocket(ws) {
  const clientId = `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  let authenticated = false
  let watchedPrinters = []

  const authTimeout = setTimeout(() => {
    if (!authenticated) {
      ws.close(4001, 'Auth timeout')
    }
  }, 10000)

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())

      if (!authenticated) {
        // Expect: { type: 'init', printers: [...] }
        if (msg.type === 'init' && Array.isArray(msg.printers)) {
          authenticated = true
          watchedPrinters = msg.printers
          clearTimeout(authTimeout)
          cameraManager.addConnection(clientId, ws, watchedPrinters)
          ws.send(JSON.stringify({ type: 'ready', printers: watchedPrinters }))
          console.log(`[WS] Client ${clientId} authenticated for cameras:`, watchedPrinters)
        } else {
          ws.close(4002, 'Invalid init message')
        }
        return
      }

      // Handle frame requests
      if (msg.type === 'frame_request' && msg.printerId) {
        const frameBuffer = cameraManager.getFrame(msg.printerId)
        if (frameBuffer) {
          ws.send(frameBuffer, { binary: true }, (err) => {
            if (err) console.error('[WS] Send frame failed:', err.message)
          })
        }
      }

      // Ping/pong
      if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }))
      }
    } catch (err) {
      console.error('[WS] Message parse error:', err.message)
    }
  })

  ws.on('close', () => {
    clearTimeout(authTimeout)
    cameraManager.removeConnection(clientId)
  })

  ws.on('error', (err) => {
    console.error(`[WS] Client ${clientId} error:`, err.message)
  })
}

// ─── Start Server ───────────────────────────────────────────

server.listen(PORT, () => {
  console.log(`Tecnoprints API running on port ${PORT}`)
  console.log(`  REST API: http://localhost:${PORT}/api/...`)
  console.log(`  WebSocket: ws://localhost:${PORT}/ws/cameras`)
})
