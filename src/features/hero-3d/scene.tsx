"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import type { Group, Mesh } from "three";

function SpinY({ speed = 0.2, children }: { speed?: number; children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function OrbitingSphere({
  radius = 2.2,
  speed = 0.35,
  height = 0.4,
  size = 0.18,
  color = "#111111",
  phase = 0,
}: {
  radius?: number;
  speed?: number;
  height?: number;
  size?: number;
  color?: string;
  phase?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = height + Math.sin(t * 2) * 0.08;
  });
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[size, 48, 48]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.65} />
    </mesh>
  );
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <Environment preset="studio" />

      {/* Slow-turning primary ring — the hero shape */}
      <SpinY speed={0.18}>
        <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.35}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <torusGeometry args={[1.55, 0.09, 64, 180]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.22} metalness={0.9} />
          </mesh>
        </Float>
      </SpinY>

      {/* Central sphere */}
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.55}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.55, 64, 64]} />
          <meshStandardMaterial color="#fafafa" roughness={0.28} metalness={0.55} />
        </mesh>
      </Float>

      {/* Two orbiting accent dots — the only hint of color */}
      <OrbitingSphere radius={2.1} height={0.7} size={0.13} color="#111111" speed={0.4} />
      <OrbitingSphere
        radius={2.4}
        height={-0.2}
        size={0.1}
        color="#d4d4d8"
        speed={-0.3}
        phase={Math.PI}
      />

      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.35}
        scale={9}
        blur={2.6}
        far={3.5}
        resolution={512}
      />
    </>
  );
}
