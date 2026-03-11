/**
 * Client-side STL parser + layer-by-layer slicer.
 * Mimics real slicer behavior (like Bambu Studio / Cura):
 *   1. Parse STL → extract triangles
 *   2. Slice mesh at every layer height → get cross-section contours
 *   3. Per layer: compute perimeter (for walls) and area (for infill)
 *   4. Detect top/bottom layers → solid fill instead of infill
 *   5. Sum material across all layers
 */

type Vec3 = [number, number, number]
type Vec2 = [number, number]

// ─── Slicer Parameters ──────────────────────────────────────

const PLA_DENSITY = 1.24        // g/cm³
const LINE_WIDTH_MM = 0.4       // extrusion width (nozzle diameter)
const NUM_WALLS = 2             // perimeter count
const TOP_BOTTOM_LAYERS = 3     // solid layers top + bottom
const LAYER_HEIGHT_MM = 0.2     // default layer height
const FIRST_LAYER_HEIGHT = 0.2  // first layer

const INFILL_MAP: Record<string, number> = {
  baja: 0.15,
  media: 0.30,
  alta: 0.50,
}

const PRICE_PER_GRAM_COP = 450

// ─── Result Interface ───────────────────────────────────────

export interface STLResult {
  volumeCm3: number
  surfaceAreaCm2: number
  grams: number
  triangleCount: number
  layerCount: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  priceEstimateCOP: number
  shellGrams: number
  infillGrams: number
}

// ─── Triangle Storage ───────────────────────────────────────

interface Triangle {
  v: [Vec3, Vec3, Vec3]
  zMin: number
  zMax: number
}

// ─── Geometry Helpers ───────────────────────────────────────

function signedVolumeOfTriangle(p1: Vec3, p2: Vec3, p3: Vec3): number {
  return (
    (p1[0] * (p2[1] * p3[2] - p3[1] * p2[2]) -
      p2[0] * (p1[1] * p3[2] - p3[1] * p1[2]) +
      p3[0] * (p1[1] * p2[2] - p2[1] * p1[2])) / 6.0
  )
}

function triangleArea(p1: Vec3, p2: Vec3, p3: Vec3): number {
  const ax = p2[0] - p1[0], ay = p2[1] - p1[1], az = p2[2] - p1[2]
  const bx = p3[0] - p1[0], by = p3[1] - p1[1], bz = p3[2] - p1[2]
  const cx = ay * bz - az * by
  const cy = az * bx - ax * bz
  const cz = ax * by - ay * bx
  return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz)
}

/**
 * Intersect a triangle with a horizontal plane at Z.
 * Returns the intersection segment [point1, point2] in XY, or null.
 */
function intersectTrianglePlane(tri: Triangle, z: number): [Vec2, Vec2] | null {
  const [a, b, c] = tri.v
  const az = a[2], bz = b[2], cz = c[2]

  // Classify vertices as above/below/on the plane
  const eps = 1e-6
  const da = az - z, db = bz - z, dc = cz - z

  const points: Vec2[] = []

  // Check each edge for intersection
  const edges: [Vec3, number, Vec3, number][] = [
    [a, da, b, db],
    [b, db, c, dc],
    [c, dc, a, da],
  ]

  for (const [p1, d1, p2, d2] of edges) {
    if (Math.abs(d1) < eps && Math.abs(d2) < eps) {
      // Edge lies on plane — return the edge itself
      points.push([p1[0], p1[1]], [p2[0], p2[1]])
      if (points.length >= 2) break
    } else if (Math.abs(d1) < eps) {
      // p1 is on the plane
      points.push([p1[0], p1[1]])
    } else if (Math.abs(d2) < eps) {
      // will be caught as p1 of next edge
    } else if ((d1 > 0) !== (d2 > 0)) {
      // Edge crosses the plane
      const t = d1 / (d1 - d2)
      points.push([
        p1[0] + t * (p2[0] - p1[0]),
        p1[1] + t * (p2[1] - p1[1]),
      ])
    }
  }

  if (points.length >= 2) {
    return [points[0], points[1]]
  }
  return null
}

/**
 * Chain unordered line segments into closed contours.
 * Returns array of contours, each contour is an array of XY points.
 */
function chainSegments(segments: [Vec2, Vec2][]): Vec2[][] {
  if (segments.length === 0) return []

  const eps = 0.01 // tolerance for matching endpoints (mm)
  const contours: Vec2[][] = []
  const used = new Uint8Array(segments.length)

  // Build spatial index: hash endpoints to segment indices
  const gridSize = eps * 10
  const endpointMap = new Map<string, { segIdx: number; end: 0 | 1 }[]>()

  function hashKey(x: number, y: number): string {
    return `${Math.round(x / gridSize)},${Math.round(y / gridSize)}`
  }

  for (let i = 0; i < segments.length; i++) {
    for (const end of [0, 1] as const) {
      const p = segments[i][end]
      const key = hashKey(p[0], p[1])
      if (!endpointMap.has(key)) endpointMap.set(key, [])
      endpointMap.get(key)!.push({ segIdx: i, end })
    }
  }

  function findNext(px: number, py: number, excludeIdx: number): { segIdx: number; end: 0 | 1 } | null {
    // Search in neighboring cells
    const cx = Math.round(px / gridSize)
    const cy = Math.round(py / gridSize)

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${cx + dx},${cy + dy}`
        const entries = endpointMap.get(key)
        if (!entries) continue
        for (const entry of entries) {
          if (entry.segIdx === excludeIdx || used[entry.segIdx]) continue
          const p = segments[entry.segIdx][entry.end]
          const dist = Math.abs(p[0] - px) + Math.abs(p[1] - py)
          if (dist < eps) return entry
        }
      }
    }
    return null
  }

  for (let i = 0; i < segments.length; i++) {
    if (used[i]) continue
    used[i] = 1

    const contour: Vec2[] = [segments[i][0], segments[i][1]]
    let lastPt = segments[i][1]

    // Follow chain forward
    for (let iter = 0; iter < segments.length; iter++) {
      const next = findNext(lastPt[0], lastPt[1], -1)
      if (!next) break
      used[next.segIdx] = 1
      // The matched end connects to lastPt; the other end extends the contour
      const otherEnd = next.end === 0 ? 1 : 0
      const newPt = segments[next.segIdx][otherEnd]
      contour.push(newPt)
      lastPt = newPt

      // Check if contour closed
      const dist = Math.abs(lastPt[0] - contour[0][0]) + Math.abs(lastPt[1] - contour[0][1])
      if (dist < eps && contour.length > 2) break
    }

    if (contour.length >= 3) {
      contours.push(contour)
    }
  }

  return contours
}

/**
 * Calculate the area of a polygon using the shoelace formula.
 */
function polygonArea(pts: Vec2[]): number {
  let area = 0
  const n = pts.length
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += pts[i][0] * pts[j][1]
    area -= pts[j][0] * pts[i][1]
  }
  return Math.abs(area) / 2
}

/**
 * Calculate the perimeter of a polygon.
 */
function polygonPerimeter(pts: Vec2[]): number {
  let perimeter = 0
  const n = pts.length
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const dx = pts[j][0] - pts[i][0]
    const dy = pts[j][1] - pts[i][1]
    perimeter += Math.sqrt(dx * dx + dy * dy)
  }
  return perimeter
}

// ─── STL Parsing ────────────────────────────────────────────

function isBinarySTL(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 84) return false
  const view = new DataView(buffer)
  const count = view.getUint32(80, true)
  const expected = 84 + count * 50
  if (buffer.byteLength === expected) return true
  const header = new TextDecoder().decode(new Uint8Array(buffer, 0, 80))
  if (header.startsWith('solid') && new TextDecoder().decode(new Uint8Array(buffer)).includes('facet')) {
    return false
  }
  return true
}

interface ParseResult {
  triangles: Triangle[]
  volume: number
  surfaceArea: number
  min: Vec3
  max: Vec3
}

function parseBinarySTL(buffer: ArrayBuffer): ParseResult {
  const view = new DataView(buffer)
  const count = view.getUint32(80, true)
  const triangles: Triangle[] = new Array(count)
  let volume = 0, surfaceArea = 0
  const min: Vec3 = [Infinity, Infinity, Infinity]
  const max: Vec3 = [-Infinity, -Infinity, -Infinity]

  for (let i = 0; i < count; i++) {
    const off = 84 + i * 50
    const p1: Vec3 = [view.getFloat32(off + 12, true), view.getFloat32(off + 16, true), view.getFloat32(off + 20, true)]
    const p2: Vec3 = [view.getFloat32(off + 24, true), view.getFloat32(off + 28, true), view.getFloat32(off + 32, true)]
    const p3: Vec3 = [view.getFloat32(off + 36, true), view.getFloat32(off + 40, true), view.getFloat32(off + 44, true)]

    const zMin = Math.min(p1[2], p2[2], p3[2])
    const zMax = Math.max(p1[2], p2[2], p3[2])
    triangles[i] = { v: [p1, p2, p3], zMin, zMax }

    volume += signedVolumeOfTriangle(p1, p2, p3)
    surfaceArea += triangleArea(p1, p2, p3)

    for (const p of [p1, p2, p3]) {
      for (let j = 0; j < 3; j++) {
        if (p[j] < min[j]) min[j] = p[j]
        if (p[j] > max[j]) max[j] = p[j]
      }
    }
  }

  return { triangles, volume: Math.abs(volume), surfaceArea, min, max }
}

function parseASCIISTL(text: string): ParseResult {
  const vertexRegex = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/g
  const verts: Vec3[] = []
  let m
  while ((m = vertexRegex.exec(text)) !== null) {
    verts.push([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])])
  }

  const triCount = Math.floor(verts.length / 3)
  const triangles: Triangle[] = new Array(triCount)
  let volume = 0, surfaceArea = 0
  const min: Vec3 = [Infinity, Infinity, Infinity]
  const max: Vec3 = [-Infinity, -Infinity, -Infinity]

  for (let i = 0; i < triCount; i++) {
    const p1 = verts[i * 3], p2 = verts[i * 3 + 1], p3 = verts[i * 3 + 2]
    const zMin = Math.min(p1[2], p2[2], p3[2])
    const zMax = Math.max(p1[2], p2[2], p3[2])
    triangles[i] = { v: [p1, p2, p3], zMin, zMax }

    volume += signedVolumeOfTriangle(p1, p2, p3)
    surfaceArea += triangleArea(p1, p2, p3)

    for (const p of [p1, p2, p3]) {
      for (let j = 0; j < 3; j++) {
        if (p[j] < min[j]) min[j] = p[j]
        if (p[j] > max[j]) max[j] = p[j]
      }
    }
  }

  return { triangles, volume: Math.abs(volume), surfaceArea, min, max }
}

// ─── Layer-by-Layer Slicer ──────────────────────────────────

interface SliceLayerResult {
  area: number       // mm² cross-section area
  perimeter: number  // mm total perimeter
}

/**
 * Slice mesh at a given Z height. Returns cross-section area and perimeter.
 */
function sliceAtZ(activeTriangles: Triangle[], z: number): SliceLayerResult {
  // Collect intersection segments
  const segments: [Vec2, Vec2][] = []

  for (const tri of activeTriangles) {
    if (z < tri.zMin || z > tri.zMax) continue
    const seg = intersectTrianglePlane(tri, z)
    if (seg) segments.push(seg)
  }

  if (segments.length < 2) return { area: 0, perimeter: 0 }

  // Chain segments into closed contours
  const contours = chainSegments(segments)

  let totalArea = 0
  let totalPerimeter = 0

  for (const contour of contours) {
    totalArea += polygonArea(contour)
    totalPerimeter += polygonPerimeter(contour)
  }

  return { area: totalArea, perimeter: totalPerimeter }
}

/**
 * Determine if a layer is a "top" or "bottom" solid layer.
 * A layer is bottom-solid if there's no geometry N layers below.
 * A layer is top-solid if there's no geometry N layers above.
 */
function computeSolidLayers(
  layerAreas: number[],
  topBottomCount: number
): boolean[] {
  const n = layerAreas.length
  const isSolid = new Array<boolean>(n).fill(false)
  const threshold = 0.01 // mm² minimum area to count as "has geometry"

  for (let i = 0; i < n; i++) {
    if (layerAreas[i] < threshold) continue

    // Check bottom: is this within topBottomCount layers of the bottom of the part at this XY?
    // Simplified: check if any of the N layers below have significantly less area (means we're near bottom)
    let isBottom = false
    for (let j = 1; j <= topBottomCount; j++) {
      if (i - j < 0 || layerAreas[i - j] < layerAreas[i] * 0.5) {
        isBottom = true
        break
      }
    }

    // Check top: check if any of the N layers above have significantly less area
    let isTop = false
    for (let j = 1; j <= topBottomCount; j++) {
      if (i + j >= n || layerAreas[i + j] < layerAreas[i] * 0.5) {
        isTop = true
        break
      }
    }

    isSolid[i] = isBottom || isTop
  }

  return isSolid
}

// ─── Main Export ────────────────────────────────────────────

export async function parseSTLFile(
  file: File,
  quality: string
): Promise<STLResult> {
  const buffer = await file.arrayBuffer()

  let parsed: ParseResult
  if (isBinarySTL(buffer)) {
    parsed = parseBinarySTL(buffer)
  } else {
    const text = new TextDecoder().decode(buffer)
    parsed = parseASCIISTL(text)
  }

  const { triangles, volume, surfaceArea, min, max } = parsed

  const width = max[0] - min[0]
  const height = max[1] - min[1]  // Y dimension
  const depth = max[2] - min[2]   // Z dimension (print height)
  const volumeCm3 = volume / 1000
  const surfaceAreaCm2 = surfaceArea / 100

  const infillRate = INFILL_MAP[quality] ?? 0.30
  const wallThicknessTotal = LINE_WIDTH_MM * NUM_WALLS

  // ─── Layer-by-layer slicing ────────────────────────────────

  // Sort triangles by zMin for efficient sweep
  const sorted = triangles.slice().sort((a, b) => a.zMin - b.zMin)

  // Generate layer heights
  const zStart = min[2] + FIRST_LAYER_HEIGHT / 2
  const zEnd = max[2]
  const layers: number[] = []
  let z = zStart
  while (z < zEnd) {
    layers.push(z)
    z += LAYER_HEIGHT_MM
  }

  const layerCount = layers.length
  if (layerCount === 0) {
    // Very thin model — fallback to single layer
    layers.push((min[2] + max[2]) / 2)
  }

  // Slice each layer with sweep line
  const layerAreas: number[] = []
  const layerPerimeters: number[] = []
  let triStart = 0

  for (const layerZ of layers) {
    // Advance start pointer past triangles that are entirely below this layer
    while (triStart < sorted.length && sorted[triStart].zMax < layerZ - 0.01) {
      triStart++
    }

    // Collect active triangles (those that span this Z)
    const active: Triangle[] = []
    for (let i = triStart; i < sorted.length; i++) {
      if (sorted[i].zMin > layerZ + 0.01) break
      if (sorted[i].zMax >= layerZ - 0.01) {
        active.push(sorted[i])
      }
    }

    const result = sliceAtZ(active, layerZ)
    layerAreas.push(result.area)
    layerPerimeters.push(result.perimeter)
  }

  // Determine top/bottom solid layers
  const solidLayers = computeSolidLayers(layerAreas, TOP_BOTTOM_LAYERS)

  // ─── Accumulate material per layer ─────────────────────────

  let shellVolumeMm3 = 0
  let infillVolumeMm3 = 0

  for (let i = 0; i < layerAreas.length; i++) {
    const area = layerAreas[i]
    const perimeter = layerPerimeters[i]
    const lh = i === 0 ? FIRST_LAYER_HEIGHT : LAYER_HEIGHT_MM

    if (area < 0.01) continue

    // Wall material: perimeter × line_width × num_walls × layer_height
    const wallVolume = perimeter * LINE_WIDTH_MM * NUM_WALLS * lh

    // Interior area (area minus the walls)
    const interiorArea = Math.max(area - perimeter * wallThicknessTotal, 0)

    if (solidLayers[i]) {
      // Top/bottom layer: 100% solid fill for interior
      shellVolumeMm3 += wallVolume + interiorArea * lh
    } else {
      // Normal layer: walls are solid, interior gets infill
      shellVolumeMm3 += wallVolume
      infillVolumeMm3 += interiorArea * lh * infillRate
    }
  }

  // ─── Convert to grams ──────────────────────────────────────

  const shellGrams = (shellVolumeMm3 / 1000) * PLA_DENSITY
  const infillGrams = (infillVolumeMm3 / 1000) * PLA_DENSITY
  const grams = shellGrams + infillGrams
  const priceEstimateCOP = Math.round(grams * PRICE_PER_GRAM_COP)

  return {
    volumeCm3: Math.round(volumeCm3 * 100) / 100,
    surfaceAreaCm2: Math.round(surfaceAreaCm2 * 100) / 100,
    grams: Math.round(grams * 10) / 10,
    triangleCount: triangles.length,
    layerCount: layerAreas.length,
    dimensions: {
      width: Math.round(width * 10) / 10,
      height: Math.round(height * 10) / 10,
      depth: Math.round(depth * 10) / 10,
    },
    priceEstimateCOP,
    shellGrams: Math.round(shellGrams * 10) / 10,
    infillGrams: Math.round(infillGrams * 10) / 10,
  }
}
