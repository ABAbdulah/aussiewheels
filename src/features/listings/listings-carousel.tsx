"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ListingCard, type ListingCardProps } from "./listing-card";

type Props = {
  listings: (ListingCardProps & { id: string })[];
};

export function ListingsCarousel({ listings }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 300;
    el.scrollBy({ left: dir === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Scroll area */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {listings.map((l) => (
          <div key={l.id} className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-[300px]">
            <ListingCard {...l} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute -left-4 top-1/3 flex size-8 items-center justify-center rounded-full border bg-background shadow-sm transition-shadow hover:shadow-md disabled:opacity-30"
      >
        <ChevronLeft className="size-4" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute -right-4 top-1/3 flex size-8 items-center justify-center rounded-full border bg-background shadow-sm transition-shadow hover:shadow-md"
      >
        <ChevronRight className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
