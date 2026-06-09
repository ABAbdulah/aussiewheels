"use client";

import Image from "next/image";
import { useState } from "react";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#1B3A5C] to-[#2E6DA4]",
  "from-[#243b53] to-[#3a6ea5]",
  "from-[#2E6DA4] to-[#1B3A5C]",
  "from-slate-700 to-slate-900",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

function Placeholder({ alt, className }: { alt: string; className?: string }) {
  const g = GRADIENTS[hash(alt) % GRADIENTS.length];
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br text-white/90",
        g,
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Car className="size-10 opacity-80" strokeWidth={1.5} />
        <span className="px-3 text-center text-xs font-medium opacity-80">{alt}</span>
      </div>
    </div>
  );
}

export function CarImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
  className,
}: {
  src?: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Placeholder alt={alt} className={className} />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
