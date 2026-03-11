import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get('keyword') || ''
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
  const limit = 12

  if (!keyword.trim()) {
    return NextResponse.json({ models: [], total: 0 })
  }

  try {
    const offset = (page - 1) * limit
    const url = `https://api.bambulab.com/v1/search-service/select/design2?keyword=${encodeURIComponent(keyword)}&limit=${limit}&offset=${offset}`

    const resp = await fetch(url)
    if (!resp.ok) {
      return NextResponse.json(
        { error: 'API unavailable', models: [], total: 0 },
        { status: 502 }
      )
    }

    const data = await resp.json()
    const hits = data?.hits || []
    const total = data?.total || 0

    const models = hits.map((d: Record<string, unknown>) => ({
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
    return NextResponse.json(
      { error: 'Failed to fetch models', models: [], total: 0 },
      { status: 500 }
    )
  }
}
