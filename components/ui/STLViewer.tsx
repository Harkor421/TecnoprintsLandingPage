'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface STLViewerProps {
  url: string
  modelName?: string
}

export default function STLViewer({ url, modelName = 'Model' }: STLViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !url) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 200

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8)
    light1.position.set(100, 100, 100)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xffffff, 0.6)
    light2.position.set(-100, -100, 100)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Load STL
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => {
        const geometry = parseSTL(arrayBuffer)
        geometry.center()
        geometry.computeBoundingBox()

        const material = new THREE.MeshPhongMaterial({ color: 0x00d84f, shininess: 100 })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Auto-scale camera
        const bbox = geometry.boundingBox
        if (bbox) {
          const size = bbox.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const fov = camera.fov * (Math.PI / 180)
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
          cameraZ *= 1.5
          camera.position.z = cameraZ
          camera.lookAt(scene.position)
        }
      })
      .catch(err => console.error('Error loading STL:', err))

    // Mouse controls
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }

    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
    })

    renderer.domElement.addEventListener('mousemove', (e) => {
      if (!isDragging) return

      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y += deltaX * 0.01
          child.rotation.x += deltaY * 0.01
        }
      })

      previousMousePosition = { x: e.clientX, y: e.clientY }
    })

    renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false
    })

    // Mouse wheel zoom
    renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
      camera.position.z += e.deltaY * 0.5
    }, { passive: false })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.remove()
    }
  }, [url])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-background rounded-lg overflow-hidden border border-border"
      style={{ minHeight: '600px' }}
    />
  )
}

// STL Parser
function parseSTL(arrayBuffer: ArrayBuffer): THREE.BufferGeometry {
  const view = new DataView(arrayBuffer)
  const isASCII = isASCIISTL(arrayBuffer)

  if (isASCII) {
    return parseASCIISTL(new TextDecoder().decode(arrayBuffer))
  } else {
    return parseBinarySTL(arrayBuffer)
  }
}

function isASCIISTL(arrayBuffer: ArrayBuffer): boolean {
  const view = new Uint8Array(arrayBuffer)
  const header = new TextDecoder().decode(view.slice(0, 5))
  return header === 'solid'
}

function parseBinarySTL(arrayBuffer: ArrayBuffer): THREE.BufferGeometry {
  const view = new DataView(arrayBuffer)
  const faces = view.getUint32(80, true)

  const geometry = new THREE.BufferGeometry()
  const vertices = []
  const normals = []

  let offset = 84
  for (let i = 0; i < faces; i++) {
    const nx = view.getFloat32(offset, true)
    const ny = view.getFloat32(offset + 4, true)
    const nz = view.getFloat32(offset + 8, true)
    offset += 12

    for (let j = 0; j < 3; j++) {
      vertices.push(
        view.getFloat32(offset, true),
        view.getFloat32(offset + 4, true),
        view.getFloat32(offset + 8, true)
      )
      normals.push(nx, ny, nz)
      offset += 12
    }

    offset += 2
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3))

  return geometry
}

function parseASCIISTL(content: string): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const vertices = []
  const normals = []

  const vertexPattern = /vertex\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)/g
  const normalPattern = /facet\s+normal\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)/g

  let vertexMatch
  let normalMatch
  const normalArray = []

  while ((normalMatch = normalPattern.exec(content)) !== null) {
    normalArray.push(parseFloat(normalMatch[1]), parseFloat(normalMatch[3]), parseFloat(normalMatch[5]))
  }

  let normalIndex = 0
  while ((vertexMatch = vertexPattern.exec(content)) !== null) {
    vertices.push(parseFloat(vertexMatch[1]), parseFloat(vertexMatch[3]), parseFloat(vertexMatch[5]))

    if (normalIndex < normalArray.length) {
      normals.push(normalArray[normalIndex], normalArray[normalIndex + 1], normalArray[normalIndex + 2])
    }

    if ((vertices.length / 3) % 3 === 0) {
      normalIndex += 3
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
  if (normals.length > 0) {
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3))
  } else {
    geometry.computeVertexNormals()
  }

  return geometry
}
