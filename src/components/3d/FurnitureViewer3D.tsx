"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { FurnitureProduct, Locale } from "@/types";
import { RotateCw, Eye, Sun, Box, AlertCircle, RefreshCw } from "lucide-react";

interface ViewerProps {
  product: FurnitureProduct;
  locale?: Locale;
  className?: string;
  height?: string;
}

// Procedural Parametric Architectural Desk / Table Model with verified dimensions
function ArchitecturalFurnitureMesh({
  product,
  wireframe,
  autoRotate,
}: {
  product: FurnitureProduct;
  wireframe: boolean;
  autoRotate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  // Calculate normalized scale based on verified dimensions
  const dims = product.dimensions || { width: 240, height: 76, depth: 100, unit: "cm" };
  const w = (dims.width || 200) / 100; // in meters
  const h = (dims.height || 75) / 100;
  const d = (dims.depth || 90) / 100;

  // Wood & Metal Materials
  const walnutWood = new THREE.MeshStandardMaterial({
    color: "#3d271d",
    roughness: 0.35,
    metalness: 0.05,
    wireframe,
  });

  const titaniumMetal = new THREE.MeshStandardMaterial({
    color: "#8a95a5",
    roughness: 0.2,
    metalness: 0.9,
    wireframe,
  });

  const leatherPad = new THREE.MeshStandardMaterial({
    color: "#18181b",
    roughness: 0.7,
    metalness: 0.0,
    wireframe,
  });

  const goldAccent = new THREE.MeshStandardMaterial({
    color: "#c5a467",
    roughness: 0.25,
    metalness: 0.85,
    wireframe,
  });

  return (
    <group ref={groupRef} position={[0, -h / 2, 0]}>
      {/* Tabletop Slab */}
      <mesh position={[0, h - 0.04, 0]} castShadow receiveShadow material={walnutWood}>
        <boxGeometry args={[w, 0.08, d]} />
      </mesh>

      {/* Recessed Leather Writing Pad */}
      <mesh position={[0, h + 0.002, 0.05]} receiveShadow material={leatherPad}>
        <boxGeometry args={[w * 0.55, 0.005, d * 0.55]} />
      </mesh>

      {/* Inset Gold Joinery Trim */}
      <mesh position={[0, h - 0.04, 0]}>
        <boxGeometry args={[w + 0.004, 0.015, d + 0.004]} />
        <primitive object={goldAccent} attach="material" />
      </mesh>

      {/* Titanium Brushed Legs / Pylons */}
      <mesh position={[-w / 2 + 0.18, (h - 0.08) / 2, 0]} castShadow material={titaniumMetal}>
        <boxGeometry args={[0.1, h - 0.08, d * 0.85]} />
      </mesh>

      <mesh position={[w / 2 - 0.18, (h - 0.08) / 2, 0]} castShadow material={titaniumMetal}>
        <boxGeometry args={[0.1, h - 0.08, d * 0.85]} />
      </mesh>

      {/* Integrated Cable Management Modesty Panel */}
      <mesh position={[0, (h - 0.08) * 0.6, -d * 0.25]} castShadow material={walnutWood}>
        <boxGeometry args={[w - 0.46, h * 0.5, 0.03]} />
      </mesh>

      {/* Ground Level Plinth Runners */}
      <mesh position={[-w / 2 + 0.18, 0.02, 0]} material={titaniumMetal}>
        <boxGeometry args={[0.14, 0.04, d * 0.9]} />
      </mesh>
      <mesh position={[w / 2 - 0.18, 0.02, 0]} material={titaniumMetal}>
        <boxGeometry args={[0.14, 0.04, d * 0.9]} />
      </mesh>
    </group>
  );
}

export function FurnitureViewer3D({
  product,
  locale = "ar",
  className = "",
  height = "h-[450px] md:h-[550px]",
}: ViewerProps) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightPreset, setLightPreset] = useState<"studio" | "warm" | "cool">("studio");
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const hasVerified3D = product.model3dUrl || product.modelType === "procedural" || product.dimensions;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-primary-900 to-primary-950 border border-border/20 shadow-2xl ${height} ${className}`}
      dir="ltr"
    >
      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Verification Status Badge */}
        <div className="pointer-events-auto bg-surface-dark/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs text-silver">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-white">
            {locale === "ar" ? "معاينة هندسية 3D" : "Interactive 3D CAD"}
          </span>
          <span className="text-white/40">|</span>
          <span className="text-[11px] text-silver font-mono">
            {product.dimensions
              ? `${product.dimensions.width}×${product.dimensions.depth}×${product.dimensions.height} cm`
              : "Standard Spec"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-surface-dark/80 backdrop-blur-md border border-white/10 p-1 rounded-xl">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
            className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1 ${
              autoRotate ? "bg-white/15 text-white" : "text-silver hover:text-white hover:bg-white/5"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe CAD"
            className={`p-2 rounded-lg transition-colors text-xs ${
              wireframe ? "bg-white/15 text-amber-300" : "text-silver hover:text-white hover:bg-white/5"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() =>
              setLightPreset(
                lightPreset === "studio" ? "warm" : lightPreset === "warm" ? "cool" : "studio"
              )
            }
            title="Toggle Lighting Setup"
            className="p-2 rounded-lg text-silver hover:text-white hover:bg-white/5 transition-colors text-xs"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetCamera}
            title="Reset Perspective"
            className="p-2 rounded-lg text-silver hover:text-white hover:bg-white/5 transition-colors text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [3, 2.2, 3.2], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <color attach="background" args={["#0c1424"]} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={lightPreset === "warm" ? 0.8 : 0.6} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          color={lightPreset === "warm" ? "#fff5eb" : lightPreset === "cool" ? "#e6f0ff" : "#ffffff"}
        />
        <pointLight position={[-4, 3, -4]} intensity={0.5} color="#c5a467" />
        <directionalLight position={[0, -2, -2]} intensity={0.2} color="#8a95a5" />

        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-2 text-silver bg-primary-950/90 p-4 rounded-xl border border-white/10">
                <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">
                  {locale === "ar" ? "تحميل النموذج الهندسي..." : "Loading 3D Model..."}
                </span>
              </div>
            </Html>
          }
        >
          <ArchitecturalFurnitureMesh
            product={product}
            wireframe={wireframe}
            autoRotate={autoRotate}
          />

          <ContactShadows
            position={[0, -0.4, 0]}
            opacity={0.65}
            scale={5}
            blur={2}
            far={2}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.8}
          maxDistance={7}
          maxPolarAngle={Math.PI / 2 + 0.05}
        />
      </Canvas>

      {/* Bottom Hint Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-silver/70 pointer-events-none">
        <div className="bg-surface-dark/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
          {locale === "ar"
            ? "اسحب للتدوير • العجلة للتقريب • زر الفأرة الأيمن للإزاحة"
            : "Drag to rotate • Scroll to zoom • Right-click to pan"}
        </div>
        <div className="hidden sm:block bg-surface-dark/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 font-mono">
          SKU: {product.sku}
        </div>
      </div>
    </div>
  );
}

export default FurnitureViewer3D;
