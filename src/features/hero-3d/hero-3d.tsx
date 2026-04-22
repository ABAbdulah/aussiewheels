"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";

export function Hero3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [3.8, 2.4, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        className="touch-none!"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
