"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import type { Group } from "three";

function Shape() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // ease toward the pointer, slow constant spin
    g.rotation.y += ((state.pointer.x * 0.6) - g.rotation.y) * 0.05 + delta * 0.15;
    g.rotation.x += ((-state.pointer.y * 0.5) - g.rotation.x) * 0.05;
  });
  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <Icosahedron args={[1.35, 24]}>
          <MeshDistortMaterial color="#d4ff3d" distort={0.42} speed={2.2} roughness={0.25} metalness={0.15} />
        </Icosahedron>
        <Icosahedron args={[1.62, 2]}>
          <meshBasicMaterial color="#efe9dd" wireframe transparent opacity={0.12} />
        </Icosahedron>
      </Float>
    </group>
  );
}

/** Three.js hero object. Loaded client-side only. */
export default function Blob() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, -3]} intensity={6} color="#efe9dd" />
      <Shape />
    </Canvas>
  );
}
