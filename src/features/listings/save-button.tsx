"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Listing } from "@/lib/api";
import { toggleSaved, useIsSaved } from "@/features/saved/saved-store";

export function SaveButton({
  listing,
  className,
  variant = "overlay",
}: {
  listing: Listing;
  className?: string;
  variant?: "overlay" | "inline";
}) {
  const saved = useIsSaved(listing.id);
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved" : "Save listing"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const now = toggleSaved(listing);
        toast[now ? "success" : "message"](now ? "Saved" : "Removed from saved", { description: listing.title });
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all active:scale-90",
        variant === "overlay"
          ? "size-8 bg-white/90 text-foreground shadow-sm backdrop-blur hover:bg-white"
          : "size-9 border border-border bg-card hover:bg-muted",
        className,
      )}
    >
      <Heart className={cn("size-4 transition-colors", saved ? "fill-rose-500 text-rose-500" : "text-foreground/70")} />
    </button>
  );
}
