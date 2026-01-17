import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  ContactShadows,
} from '@react-three/drei';
import type { Mesh, Group } from 'three';

// Animated floating resin ring
function AnimatedResinRing() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-1.2, 0.3, 0]}>
        <torusGeometry args={[0.5, 0.18, 32, 64]} />
        <MeshTransmissionMaterial
          color="#78afad"
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          ior={1.5}
          chromaticAberration={0.02}
        />
      </mesh>
    </Float>
  );
}

// Animated candle
function AnimatedCandle() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.3, 0.5]}>
        {/* Candle body - bear shape approximation */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#fef3e2" roughness={0.8} />
        </mesh>
        {/* Body */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#fef3e2" roughness={0.8} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.25, 0.6, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fef3e2" roughness={0.8} />
        </mesh>
        <mesh position={[0.25, 0.6, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fef3e2" roughness={0.8} />
        </mesh>
        {/* Wick */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#3d3d3d" />
        </mesh>
      </group>
    </Float>
  );
}

// Crystal/gem decoration
function AnimatedCrystal() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[1.2, 0.2, -0.3]}>
      <octahedronGeometry args={[0.4]} />
      <MeshTransmissionMaterial
        color="#bee0da"
        transmission={0.95}
        thickness={1}
        roughness={0}
        ior={2.4}
        chromaticAberration={0.03}
      />
    </mesh>
  );
}

// Loading placeholder
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#bee0da" wireframe />
    </mesh>
  );
}

// Main scene
function FeaturedScene() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
      />
      
      {/* Fill light */}
      <directionalLight position={[-3, 3, -3]} intensity={0.4} />
      
      {/* Rim lights for that premium glow */}
      <pointLight position={[3, 2, -3]} intensity={0.8} color="#78afad" />
      <pointLight position={[-3, 2, 3]} intensity={0.6} color="#bee0da" />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Products */}
      <Suspense fallback={<Loader />}>
        <AnimatedResinRing />
        <AnimatedCandle />
        <AnimatedCrystal />
      </Suspense>

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.3}
        scale={8}
        blur={2.5}
        far={3}
      />
    </>
  );
}

interface FeaturedProduct3DProps {
  className?: string;
}

export function FeaturedProduct3D({ className = '' }: FeaturedProduct3DProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <FeaturedScene />
      </Canvas>
    </div>
  );
}
