'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function PrintingLayers() {
  const groupRef = useRef<THREE.Group>(null)
  const layersRef = useRef<THREE.Mesh[]>([])

  const layers = useMemo(() => {
    const items = []
    const layerCount = 20

    for (let i = 0; i < layerCount; i++) {
      items.push({
        y: i * 0.08 - (layerCount * 0.08) / 2,
        delay: i * 0.1,
        scale: 1 - (i * 0.02),
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }

    // Animate layer opacity based on time
    layersRef.current.forEach((mesh, i) => {
      if (mesh && mesh.material) {
        const material = mesh.material as THREE.MeshBasicMaterial
        const time = state.clock.elapsedTime
        const layerTime = (time * 0.3 + layers[i].delay) % (layers.length * 0.15)
        const targetOpacity = layerTime > i * 0.15 ? 0.15 : 0.03
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.02)
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {layers.map((layer, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) layersRef.current[i] = el }}
          position={[0, layer.y, 0]}
          scale={[layer.scale, 1, layer.scale]}
        >
          <boxGeometry args={[2.5, 0.06, 2.5]} />
          <meshBasicMaterial
            color="#1ed760"
            transparent
            opacity={0.03}
            wireframe={false}
          />
        </mesh>
      ))}

      {/* Wireframe outline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 1.6, 2.6]} />
        <meshBasicMaterial
          color="#1ed760"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </group>
  )
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial
        color="#1ed760"
        transparent
        opacity={0.04}
        wireframe
      />
    </mesh>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1ed760"
        size={0.03}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

export default function PrintingBackground() {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [4, 2, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PrintingLayers />
        <GridFloor />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
