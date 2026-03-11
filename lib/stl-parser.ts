/**
 * Client-side STL parser that calculates volume, surface area, bounding box,
 * and estimated material usage with accurate shell/infill modeling.
 * Supports both binary and ASCII STL formats.
 */

const PLA_DENSITY = 1.24 // g/cm³

// Slicer-like parameters for material estimation
const WALL_THICKNESS_MM = 0.4 // nozzle width per wall
const NUM_WALLS = 2 // number of perimeter walls
const TOP_BOTTOM_LAYERS = 3 // solid top/bottom layers
const LAYER_HEIGHT_MM = 0.2 // default layer height

const INFILL_MAP: Record<string, number> = {
  baja: 0.15,
  media: 0.30,
  alta: 0.50,
}

// Price per gram of PLA in COP (Colombian Pesos)
const PRICE_PER_GRAM_COP = 450

export interface STLResult {
  volumeCm3: number
  surfaceAreaCm2: number
  grams: number
  triangleCount: number
  dimensions: {
    width: number  // mm
    height: number // mm
    depth: number  // mm
  }
  priceEstimateCOP: number
  shellGrams: number
  infillGrams: number
}

/**
 * Signed volume of tetrahedron formed by a triangle and the origin.
 */
function signedVolumeOfTriangle(
  p1: [number, number, number],
  p2: [number, number, number],
  p3: [number, number, number]
): number {
  return (
    (p1[0] * (p2[1] * p3[2] - p3[1] * p2[2]) -
      p2[0] * (p1[1] * p3[2] - p3[1] * p1[2]) +
      p3[0] * (p1[1] * p2[2] - p2[1] * p1[2])) /
    6.0
  )
}

/**
 * Area of a triangle given 3 vertices using the cross product method.
 */
function triangleArea(
  p1: [number, number, number],
  p2: [number, number, number],
  p3: [number, number, number]
): number {
  // vectors from p1 to p2 and p1 to p3
  const ax = p2[0] - p1[0], ay = p2[1] - p1[1], az = p2[2] - p1[2]
  const bx = p3[0] - p1[0], by = p3[1] - p1[1], bz = p3[2] - p1[2]
  // cross product magnitude / 2
  const cx = ay * bz - az * by
  const cy = az * bx - ax * bz
  const cz = ax * by - ay * bx
  return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz)
}

function isBinarySTL(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 84) return false

  const view = new DataView(buffer)
  const triangleCount = view.getUint32(80, true)
  const expectedSize = 84 + triangleCount * 50

  if (buffer.byteLength === expectedSize) return true

  const header = new TextDecoder().decode(new Uint8Array(buffer, 0, 80))
  if (header.startsWith('solid') && new TextDecoder().decode(new Uint8Array(buffer)).includes('facet')) {
    return false
  }

  return true
}

interface ParsedMesh {
  volume: number       // mm³
  surfaceArea: number  // mm²
  triangleCount: number
  min: [number, number, number]
  max: [number, number, number]
}

function parseBinarySTL(buffer: ArrayBuffer): ParsedMesh {
  const view = new DataView(buffer)
  const triangleCount = view.getUint32(80, true)
  let volume = 0
  let surfaceArea = 0
  const min: [number, number, number] = [Infinity, Infinity, Infinity]
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity]

  for (let i = 0; i < triangleCount; i++) {
    const offset = 84 + i * 50

    const p1: [number, number, number] = [
      view.getFloat32(offset + 12, true),
      view.getFloat32(offset + 16, true),
      view.getFloat32(offset + 20, true),
    ]
    const p2: [number, number, number] = [
      view.getFloat32(offset + 24, true),
      view.getFloat32(offset + 28, true),
      view.getFloat32(offset + 32, true),
    ]
    const p3: [number, number, number] = [
      view.getFloat32(offset + 36, true),
      view.getFloat32(offset + 40, true),
      view.getFloat32(offset + 44, true),
    ]

    volume += signedVolumeOfTriangle(p1, p2, p3)
    surfaceArea += triangleArea(p1, p2, p3)

    // Update bounding box
    for (const p of [p1, p2, p3]) {
      for (let j = 0; j < 3; j++) {
        if (p[j] < min[j]) min[j] = p[j]
        if (p[j] > max[j]) max[j] = p[j]
      }
    }
  }

  return { volume: Math.abs(volume), surfaceArea, triangleCount, min, max }
}

function parseASCIISTL(text: string): ParsedMesh {
  const vertexRegex = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/g
  const vertices: [number, number, number][] = []
  let match

  while ((match = vertexRegex.exec(text)) !== null) {
    vertices.push([parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])])
  }

  let volume = 0
  let surfaceArea = 0
  const min: [number, number, number] = [Infinity, Infinity, Infinity]
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity]
  const triangleCount = Math.floor(vertices.length / 3)

  for (let i = 0; i < vertices.length; i += 3) {
    volume += signedVolumeOfTriangle(vertices[i], vertices[i + 1], vertices[i + 2])
    surfaceArea += triangleArea(vertices[i], vertices[i + 1], vertices[i + 2])

    for (const p of [vertices[i], vertices[i + 1], vertices[i + 2]]) {
      for (let j = 0; j < 3; j++) {
        if (p[j] < min[j]) min[j] = p[j]
        if (p[j] > max[j]) max[j] = p[j]
      }
    }
  }

  return { volume: Math.abs(volume), surfaceArea, triangleCount, min, max }
}

/**
 * Parse an STL file and estimate material usage using slicer-like calculations.
 *
 * Estimation model:
 * 1. Shell material = surfaceArea × wallThickness × numWalls × density
 * 2. Top/bottom material = (bbox cross-section area) × layerHeight × topBottomLayers × density
 * 3. Interior volume = totalVolume - shellVolume
 * 4. Infill material = interiorVolume × infillRate × density
 * 5. Total = shell + top/bottom + infill
 */
export async function parseSTLFile(
  file: File,
  quality: string
): Promise<STLResult> {
  const buffer = await file.arrayBuffer()

  let mesh: ParsedMesh

  if (isBinarySTL(buffer)) {
    mesh = parseBinarySTL(buffer)
  } else {
    const text = new TextDecoder().decode(buffer)
    mesh = parseASCIISTL(text)
  }

  const { volume, surfaceArea, triangleCount, min, max } = mesh

  // Dimensions in mm
  const width = max[0] - min[0]
  const height = max[1] - min[1]
  const depth = max[2] - min[2]

  // Convert to cm³ and cm²
  const volumeCm3 = volume / 1000       // mm³ → cm³
  const surfaceAreaCm2 = surfaceArea / 100 // mm² → cm²

  // Shell volume estimation (walls)
  // Shell = outer surface × wall thickness × number of walls
  const shellThicknessMm = WALL_THICKNESS_MM * NUM_WALLS
  const shellVolumeMm3 = surfaceArea * shellThicknessMm

  // Top/bottom solid layers
  // Approximate: use bounding box XY cross-section × layer height × num layers × 2 (top + bottom)
  const topBottomVolumeMm3 = width * depth * LAYER_HEIGHT_MM * TOP_BOTTOM_LAYERS * 2

  // Total solid volume (shell + top/bottom), capped at total volume
  const solidVolumeMm3 = Math.min(shellVolumeMm3 + topBottomVolumeMm3, volume)

  // Interior volume for infill
  const interiorVolumeMm3 = Math.max(volume - solidVolumeMm3, 0)

  // Infill rate
  const infillRate = INFILL_MAP[quality] ?? 0.30

  // Material in mm³
  const totalMaterialMm3 = solidVolumeMm3 + (interiorVolumeMm3 * infillRate)

  // Convert to grams
  const totalMaterialCm3 = totalMaterialMm3 / 1000
  const grams = totalMaterialCm3 * PLA_DENSITY

  const shellGrams = (solidVolumeMm3 / 1000) * PLA_DENSITY
  const infillGrams = ((interiorVolumeMm3 * infillRate) / 1000) * PLA_DENSITY

  // Price estimate
  const priceEstimateCOP = Math.round(grams * PRICE_PER_GRAM_COP)

  return {
    volumeCm3: Math.round(volumeCm3 * 100) / 100,
    surfaceAreaCm2: Math.round(surfaceAreaCm2 * 100) / 100,
    grams: Math.round(grams * 10) / 10,
    triangleCount,
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
