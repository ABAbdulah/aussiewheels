"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useSaved } from "@/features/saved/saved-store";
import { ListingCard } from "@/features/listings/listing-card";

export default function SavedPage() {
  const saved = useSaved();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Heart className="size-5 text-rose-500" />
        <h1 className="text-2xl font-bold tracking-tight">Saved cars</h1>
        {saved.length > 0 && <span className="text-sm text-muted-foreground">({saved.length})</span>}
      </div>

      {saved.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-24 text-center">
          <Heart className="mx-auto size-9 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-3 text-base font-semibold">No saved cars yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any listing to save it here for later.</p>
          <Link href="/cars" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">Browse cars</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
