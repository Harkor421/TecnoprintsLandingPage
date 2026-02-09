/**
 * Client-side STL parser that calculates volume and estimated material usage.
 * Supports both binary and ASCII STL formats.
 */

const PLA_DENSITY = 1.24 // g/cm³

// Wall thickness and top/bottom layers add material regardless of infill
const SHELL_PERCENTAGE = 0.15 // ~15% of volume is always solid (walls, top, bottom)

const INFILL_MAP: Record<string, number> = {
  baja: 0.15,
  media: 0.30,
  alta: 0.50,
}

interface STLResult {
  volumeCm3: number
  grams: number
  triangleCount: number
}

/**
 * Calculate the signed volume of a tetrahedron formed by a triangle and the origin.
 * Used to compute the total volume of a closed mesh.
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

function isBinarySTL(buffer: ArrayBuffer): boolean {
  // ASCII STL starts with "solid", but some binary files also do.
  // Check if the declared triangle count matches the file size.
  if (buffer.byteLength < 84) return false

  const view = new DataView(buffer)
  const triangleCount = view.getUint32(80, true)
  const expectedSize = 84 + triangleCount * 50

  // If file size matches binary format, treat as binary
  if (buffer.byteLength === expectedSize) return true

  // Check if it starts with "solid" and contains "facet" (ASCII indicators)
  const header = new TextDecoder().decode(new Uint8Array(buffer, 0, 80))
  if (header.startsWith('solid') && new TextDecoder().decode(new Uint8Array(buffer)).includes('facet')) {
    return false
  }

  return true
}

function parseBinarySTL(buffer: ArrayBuffer): { volume: number; triangleCount: number } {
  const view = new DataView(buffer)
  const triangleCount = view.getUint32(80, true)
  let volume = 0

  for (let i = 0; i < triangleCount; i++) {
    const offset = 84 + i * 50

    // Skip normal vector (12 bytes), read 3 vertices
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
  }

  return { volume: Math.abs(volume), triangleCount }
}

function parseASCIISTL(text: string): { volume: number; triangleCount: number } {
  const vertexRegex = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/g
  const vertices: [number, number, number][] = []
  let match

  while ((match = vertexRegex.exec(text)) !== null) {
    vertices.push([parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])])
  }

  let volume = 0
  const triangleCount = Math.floor(vertices.length / 3)

  for (let i = 0; i < vertices.length; i += 3) {
    volume += signedVolumeOfTriangle(vertices[i], vertices[i + 1], vertices[i + 2])
  }

  return { volume: Math.abs(volume), triangleCount }
}

/**
 * Parse an STL file and estimate material usage.
 * Most STL files use millimeters, so volume is converted from mm³ to cm³.
 */
export async function parseSTLFile(
  file: File,
  quality: string
): Promise<STLResult> {
  const buffer = await file.arrayBuffer()

  let volume: number
  let triangleCount: number

  if (isBinarySTL(buffer)) {
    const result = parseBinarySTL(buffer)
    volume = result.volume
    triangleCount = result.triangleCount
  } else {
    const text = new TextDecoder().decode(buffer)
    const result = parseASCIISTL(text)
    volume = result.volume
    triangleCount = result.triangleCount
  }

  // Convert mm³ to cm³ (most STL files are in mm)
  const volumeCm3 = volume / 1000

  // Calculate effective fill: shell is always solid + infill for the interior
  const infillRate = INFILL_MAP[quality] ?? 0.30
  const effectiveFill = SHELL_PERCENTAGE + (1 - SHELL_PERCENTAGE) * infillRate

  const grams = volumeCm3 * effectiveFill * PLA_DENSITY

  return {
    volumeCm3: Math.round(volumeCm3 * 100) / 100,
    grams: Math.round(grams * 10) / 10,
    triangleCount,
  }
}
