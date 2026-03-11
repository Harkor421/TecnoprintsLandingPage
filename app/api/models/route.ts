import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// Cache build ID in memory
let cachedBuildId: string | null = null
let buildIdFetchedAt = 0
const BUILD_ID_TTL = 60 * 60 * 1000 // 1 hour

function curlGet(url: string, maxSize?: number): string {
  // maxSize limits output to avoid ENOBUFS on large pages
  const sizeFlag = maxSize ? `--max-filesize ${maxSize}` : ''
  const cmd = `curl -s "${url}" -H "User-Agent: ${UA}" -H "Accept: application/json,text/html" --max-time 10 --compressed ${sizeFlag}`
  return execSync(cmd, {
    encoding: 'utf-8',
    timeout: 15000,
    maxBuffer: 10 * 1024 * 1024, // 10MB buffer
  })
}

function getBuildId(): string | null {
  const now = Date.now()
  if (cachedBuildId && now - buildIdFetchedAt < BUILD_ID_TTL) {
    return cachedBuildId
  }

  try {
    // Fetch just enough of the page to find the buildId
    const html = curlGet('https://makerworld.com/en')
    const match = html.match(/"buildId"\s*:\s*"([^"]+)"/)
    if (match) {
      cachedBuildId = match[1]
      buildIdFetchedAt = now
      return cachedBuildId
    }
  } catch (err) {
    console.error('getBuildId error:', err)
  }

  return null
}

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get('keyword') || ''
  const page = request.nextUrl.searchParams.get('page') || '1'

  if (!keyword.trim()) {
    return NextResponse.json({ models: [], total: 0 })
  }

  try {
    let buildId = getBuildId()
    if (!buildId) {
      cachedBuildId = null
      buildId = getBuildId()
      if (!buildId) {
        return NextResponse.json(
          { error: 'API unavailable', models: [], total: 0 },
          { status: 502 }
        )
      }
    }

    const searchUrl = `https://makerworld.com/_next/data/${buildId}/en/search/models.json?keyword=${encodeURIComponent(keyword)}&orderBy=downloadCount&page=${page}`
    const raw = curlGet(searchUrl)
    const data = JSON.parse(raw)

    const designs = data?.pageProps?.designs || []
    const total = data?.pageProps?.total || 0

    const models = designs.map((d: Record<string, unknown>) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      cover: d.cover,
      likeCount: d.likeCount,
      downloadCount: d.downloadCount,
      printCount: d.printCount,
      creator: (d.designCreator as Record<string, unknown>)?.name || 'Unknown',
      tags: d.tags || [],
      url: `https://makerworld.com/en/models/${d.id}`,
    }))

    return NextResponse.json({ models, total })
  } catch (err) {
    console.error('MakerWorld API error:', err)
    cachedBuildId = null
    return NextResponse.json(
      { error: 'Failed to fetch models', models: [], total: 0 },
      { status: 500 }
    )
  }
}
