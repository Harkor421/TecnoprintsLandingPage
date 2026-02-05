'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Bambu Lab style printer frame
function PrinterFrame() {
  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[3, 0.15, 2.8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Front feet/supports */}
      <mesh position={[-1.2, -1.45, 1.2]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[1.2, -1.45, 1.2]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Vertical pillars - back left and right */}
      <mesh position={[-1.3, 0, -1.1]}>
        <boxGeometry args={[0.15, 3.2, 0.15]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.3, 0, -1.1]}>
        <boxGeometry args={[0.15, 3.2, 0.15]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top horizontal beam */}
      <mesh position={[0, 1.5, -1.1]}>
        <boxGeometry args={[2.75, 0.2, 0.2]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Z-axis rails (vertical) on pillars */}
      <mesh position={[-1.15, 0, -1.1]}>
        <boxGeometry args={[0.05, 2.8, 0.08]} />
        <meshStandardMaterial color="#00D67F" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.15, 0, -1.1]}>
        <boxGeometry args={[0.05, 2.8, 0.08]} />
        <meshStandardMaterial color="#00D67F" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Electronics box - right side */}
      <mesh position={[1.6, -0.5, -0.3]}>
        <boxGeometry args={[0.4, 1.5, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Screen on electronics box */}
      <mesh position={[1.81, -0.3, 0]}>
        <boxGeometry args={[0.02, 0.5, 0.7]} />
        <meshStandardMaterial color="#00D67F" emissive="#00D67F" emissiveIntensity={0.3} />
      </mesh>

      {/* Spool holder - top right */}
      <mesh position={[1.6, 1.2, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Filament spool */}
      <mesh position={[1.6, 1.2, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.12, 8, 24]} />
        <meshStandardMaterial color="#00D67F" metalness={0.3} roughness={0.6} />
      </mesh>
    </group>
  )
}

// X-axis gantry that moves up and down
function XGantry() {
  const gantryRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (gantryRef.current) {
      // Move gantry up and down (Z movement)
      const zPos = Math.sin(clock.elapsedTime * 0.4) * 0.3
      gantryRef.current.position.y = 0.5 + zPos
    }
  })

  return (
    <group ref={gantryRef} position={[0, 0.5, -1.1]}>
      {/* Main X-axis beam */}
      <mesh position={[0, 0, 0.6]}>
        <boxGeometry args={[2.5, 0.18, 0.18]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* X-axis rail */}
      <mesh position={[0, -0.05, 0.7]}>
        <boxGeometry args={[2.3, 0.04, 0.06]} />
        <meshStandardMaterial color="#00D67F" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left carriage mount */}
      <mesh position={[-1.2, 0, 0.4]}>
        <boxGeometry args={[0.15, 0.25, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Right carriage mount */}
      <mesh position={[1.2, 0, 0.4]}>
        <boxGeometry args={[0.15, 0.25, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

// Print head that moves along X-axis
function PrintHead() {
  const headRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (headRef.current) {
      // Move along X-axis
      headRef.current.position.x = Math.sin(clock.elapsedTime * 1.5) * 0.8
      // Y position follows gantry
      const zPos = Math.sin(clock.elapsedTime * 0.4) * 0.3
      headRef.current.position.y = 0.5 + zPos
    }
  })

  return (
    <group ref={headRef} position={[0, 0.5, -0.4]}>
      {/* Print head body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.35, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cooling fan front */}
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[0.3, 0.25, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Hot end / nozzle */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.02, 0.15, 8]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#ff6b00"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Part cooling duct */}
      <mesh position={[0.12, -0.15, 0.12]} rotation={[0.3, 0, 0.2]}>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <meshStandardMaterial color="#00D67F" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* LED light strip */}
      <mesh position={[0, 0.1, 0.19]}>
        <boxGeometry args={[0.35, 0.03, 0.02]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

// Build plate that moves in Y (front/back)
function BuildPlate() {
  const plateRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (plateRef.current) {
      // Move front and back
      plateRef.current.position.z = Math.sin(clock.elapsedTime * 0.8) * 0.3
    }
  })

  return (
    <group ref={plateRef} position={[0, -1.35, 0.3]}>
      {/* Build plate base/carriage */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[2.2, 0.08, 2]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Heated bed */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.04, 1.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* PEI/Textured build surface */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[1.9, 0.01, 1.7]} />
        <meshStandardMaterial
          color="#2d2d2d"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Y-axis rails */}
      <mesh position={[-0.9, -0.15, 0]}>
        <boxGeometry args={[0.06, 0.04, 2.2]} />
        <meshStandardMaterial color="#00D67F" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.9, -0.15, 0]}>
        <boxGeometry args={[0.06, 0.04, 2.2]} />
        <meshStandardMaterial color="#00D67F" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Object being printed
function PrintedObject() {
  const objectRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(({ clock }) => {
    if (objectRef.current && materialRef.current) {
      // Grow slowly
      const progress = (Math.sin(clock.elapsedTime * 0.2) + 1) / 2
      objectRef.current.scale.y = 0.1 + progress * 0.9

      // Position on build plate (follows plate movement)
      const plateZ = Math.sin(clock.elapsedTime * 0.8) * 0.3
      objectRef.current.position.z = 0.3 + plateZ
      objectRef.current.position.y = -1.3 + (objectRef.current.scale.y * 0.25)

      // Subtle glow pulse
      materialRef.current.emissiveIntensity = 0.15 + Math.sin(clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <mesh ref={objectRef} position={[0, -1.1, 0.3]}>
      {/* Benchy-like shape - simplified boat */}
      <boxGeometry args={[0.5, 0.5, 0.35]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#00D67F"
        emissive="#00A86B"
        emissiveIntensity={0.15}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
  )
}

// Filament path from spool to print head
function FilamentPath() {
  const points = useMemo(() => {
    return [
      new THREE.Vector3(1.6, 1.2, -0.5),
      new THREE.Vector3(1.2, 1.4, -0.8),
      new THREE.Vector3(0.5, 1.3, -0.6),
      new THREE.Vector3(0, 0.7, -0.4),
    ]
  }, [])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])

  return (
    <mesh>
      <tubeGeometry args={[curve, 20, 0.02, 8, false]} />
      <meshStandardMaterial color="#00D67F" metalness={0.3} roughness={0.6} />
    </mesh>
  )
}

// Ambient particles for effect
function PrintParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(30 * 3)
    for (let i = 0; i < 30; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.3
      positions[i * 3 + 1] = Math.random() * 0.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      // Follow print head position roughly
      const headX = Math.sin(clock.elapsedTime * 1.5) * 0.8
      const headY = 0.5 + Math.sin(clock.elapsedTime * 0.4) * 0.3
      particlesRef.current.position.set(headX, headY - 0.4, -0.4 + Math.sin(clock.elapsedTime * 0.8) * 0.3)
      particlesRef.current.rotation.y = clock.elapsedTime
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00D67F"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 3, 3]} intensity={0.4} color="#00D67F" />
      <spotLight
        position={[0, 4, 2]}
        angle={0.4}
        penumbra={1}
        intensity={0.6}
        color="#ffffff"
      />

      <Float speed={1} rotationIntensity={0} floatIntensity={0.2}>
        <group rotation={[0.1, 0, 0]} scale={0.85}>
          <PrinterFrame />
          <XGantry />
          <PrintHead />
          <BuildPlate />
          <PrintedObject />
          <FilamentPath />
          <PrintParticles />
        </group>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  )
}

export default function PrinterScene() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [4, 2.5, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
