"use client";

import dynamic from "next/dynamic";

const Hero3DClient = dynamic(() => import("./hero-3d").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-3xl bg-muted/40" />,
});

export function Hero3D({ className }: { className?: string }) {
  return <Hero3DClient className={className} />;
}
