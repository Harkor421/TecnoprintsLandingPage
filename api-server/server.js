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

app.get('/api/models', async (req, res) => {
  const keyword = req.query.keyword || ''
  const page = parseInt(req.query.page || '1', 10)
  const limit = 12

  try {
    const offset = (page - 1) * limit
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) })
    if (keyword.trim()) params.set('keyword', keyword.trim())
    const url = `https://api.bambulab.com/v1/search-service/select/design2?${params}`

    const resp = await fetch(url)
    if (!resp.ok) {
      console.error(`[MakerWorld] API returned ${resp.status}`)
      return res.status(502).json({ error: 'API unavailable', models: [], total: 0 })
    }

    const data = await resp.json()
    const hits = data?.hits || []
    const total = data?.total || 0

    const models = hits.map((d) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      cover: d.cover,
      likeCount: d.likeCount,
      downloadCount: d.downloadCount,
      printCount: d.printCount,
      creator: d.designCreator?.name || 'Unknown',
      tags: d.tags || [],
      url: `https://makerworld.com/en/models/${d.id}`,
    }))

    res.json({ models, total })
  } catch (err) {
    console.error('[MakerWorld] Search error:', err.message)
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
