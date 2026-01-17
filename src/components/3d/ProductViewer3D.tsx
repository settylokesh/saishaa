import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Center,
  Float,
} from '@react-three/drei';
import type { Mesh } from 'three';
import { isWebGLSupported } from '@/utils/cn';

interface ProductViewer3DProps {
  modelUrl?: string;
  productType?: 'resin' | 'candles' | 'crafts';
  autoRotate?: boolean;
  className?: string;
}

// Loading spinner for 3D canvas
function CanvasLoader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#bee0da" wireframe />
    </mesh>
  );
}

// Fallback component when WebGL is not supported
function WebGLFallback({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-brand-bg rounded-2xl ${className}`}>
      <div className="text-center p-8">
        <svg
          className="w-16 h-16 mx-auto text-brand-primary/50 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <p className="text-gray-600 text-sm">
          3D preview not available in your browser
        </p>
      </div>
    </div>
  );
}

// Resin material - glass-like translucent
function ResinMaterial() {
  return (
    <meshPhysicalMaterial
      color="#9ecfcb"
      transmission={0.6}
      thickness={2}
      roughness={0.1}
      metalness={0}
      ior={1.5}
      reflectivity={0.5}
      clearcoat={1}
      clearcoatRoughness={0}
    />
  );
}

// Candle material - waxy
function CandleMaterial() {
  return (
    <meshStandardMaterial
      color="#f5e6d3"
      roughness={0.7}
      metalness={0}
    />
  );
}

// Craft material - matte
function CraftMaterial() {
  return (
    <meshStandardMaterial
      color="#d4a574"
      roughness={0.8}
      metalness={0}
    />
  );
}

// Procedural placeholder shapes based on product type
function PlaceholderShape({ productType = 'resin' }: { productType?: string }) {
  const meshRef = useRef<Mesh>(null);

  // Render different shapes based on product type
  if (productType === 'candles') {
    return (
      <group>
        {/* Heart shape approximation for candles */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.9, 1.2, 32]} />
          <CandleMaterial />
        </mesh>
        {/* Wick */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#3d3d3d" />
        </mesh>
        {/* Flame */}
        <mesh position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffaa00" />
        </mesh>
      </group>
    );
  }

  if (productType === 'crafts') {
    // Photo frame shape
    return (
      <group>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.8, 0.15]} />
          <CraftMaterial />
        </mesh>
        {/* Inner frame cutout visual */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.1, 1.4, 0.05]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    );
  }

  // Default: Resin ring/band (torus)
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.7, 0.25, 32, 64]} />
      <ResinMaterial />
    </mesh>
  );
}

// GLB/GLTF Model Loader
function ModelLoader({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

// Main 3D Scene
function Scene({
  modelUrl,
  productType,
  autoRotate,
}: {
  modelUrl?: string;
  productType?: string;
  autoRotate?: boolean;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      {/* Rim light for that premium feel */}
      <pointLight position={[0, 5, -5]} intensity={0.8} color="#bee0da" />

      {/* Environment for realistic reflections */}
      <Environment preset="studio" />

      {/* Product */}
      <Center>
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.3}
          floatingRange={[-0.1, 0.1]}
        >
          <Suspense fallback={<CanvasLoader />}>
            {modelUrl ? (
              <ModelLoader url={modelUrl} />
            ) : (
              <PlaceholderShape productType={productType} />
            )}
          </Suspense>
        </Float>
      </Center>

      {/* Contact shadow */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        far={2}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={2}
        maxDistance={6}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
      />
    </>
  );
}

export function ProductViewer3D({
  modelUrl,
  productType = 'resin',
  autoRotate = true,
  className = 'aspect-square',
}: ProductViewer3DProps) {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  if (!webGLSupported) {
    return <WebGLFallback className={className} />;
  }

  return (
    <div className={`relative bg-gradient-to-b from-brand-bg to-brand-muted/30 rounded-2xl overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene
          modelUrl={modelUrl}
          productType={productType}
          autoRotate={autoRotate}
        />
      </Canvas>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
        Drag to rotate
      </div>
    </div>
  );
}

// Preload models if needed
// useGLTF.preload('/models/product.glb');
