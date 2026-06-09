"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "./search-filters";
import { SORT_OPTIONS } from "@/lib/site";
import type { Facets } from "@/lib/api";

export function SortSelect() {
  const router = useRouter();
  const sp = useSearchParams();
  const value = sp.get("sort") ?? "featured";

  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
      <select
        aria-label="Sort by"
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(sp.toString());
          next.set("sort", e.target.value);
          next.delete("page");
          router.push(`/cars?${next.toString()}`, { scroll: false });
        }}
        className="h-9 appearance-none rounded-lg border border-input bg-card pl-8 pr-8 text-sm font-medium outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function MobileFilters({ facets }: { facets: Facets | null }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" className="h-9 gap-1.5 lg:hidden" />}>
        <SlidersHorizontal className="size-4" />
        Filters
      </SheetTrigger>
      <SheetContent side="left" className="w-[90vw] max-w-sm overflow-y-auto">
        <SheetHeader className="px-4 pb-0">
          <SheetTitle>Filter cars</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-8">
          <SearchFilters facets={facets} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
