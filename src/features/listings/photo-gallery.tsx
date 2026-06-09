"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { CarImage } from "./car-image";
import { SaveButton } from "./save-button";
import { cn } from "@/lib/utils";
import type { Listing } from "@/lib/api";

export function PhotoGallery({ listing }: { listing: Listing }) {
  const { images, title } = listing;
  const [active, setActive] = useState(0);
  const list = images.length ? images : [""];
  const go = (d: number) => setActive((a) => (a + d + list.length) % list.length);

  return (
    <div>
      {/* Main */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
        <CarImage src={list[active]} alt={title} priority sizes="(max-width: 1024px) 100vw, 760px" />

        <div className="absolute right-3 top-3">
          <SaveButton listing={listing} />
        </div>

        {list.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur transition-opacity hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur transition-opacity hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              <Camera className="size-3.5" /> {active + 1} / {list.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg ring-1 transition-all",
                i === active ? "ring-2 ring-brand" : "ring-foreground/10 hover:ring-brand/50",
              )}
            >
              <CarImage src={src} alt={`${title} photo ${i + 1}`} sizes="150px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
