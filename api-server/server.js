const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

// CORS — allow Tecnoprints domains
app.use(cors({
  origin: [
    'https://tecnoprints.com',
    'https://www.tecnoprints.com',
    'http://localhost:3000',
    /\.vercel\.app$/,
  ],
}))

// ─── Routes ─────────────────────────────────────────────────

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

    // Extract STL file URL
    const stlFile = d.designFiles?.find(f => f.name?.toLowerCase().endsWith('.stl'))
    const stlUrl = stlFile?.downloadUrl || null

    res.json({
      id: d.id,
      title: d.title,
      description: d.summary || d.description || '',
      cover: d.cover,
      likeCount: d.likeCount,
      downloadCount: d.downloadCount,
      printCount: d.printCount,
      creator: d.designCreator?.name || 'Unknown',
      tags: d.tags || [],
      url: `https://makerworld.com/en/models/${d.id}`,
      weight: d.instances?.[0]?.weight || 0,
      printTimeMinutes: printTimeMinutes,
      images: images,
      files: d.designFiles || [],
      stlUrl: stlUrl,
    })
  } catch (err) {
    console.error('[MakerWorld] Model detail error:', err.message)
    res.status(500).json({ error: 'Failed to fetch model' })
  }
})

// ─── Start ──────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Tecnoprints API running on port ${PORT}`)
})
