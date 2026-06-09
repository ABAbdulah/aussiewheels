"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { POPULAR_MAKES } from "@/lib/site";
import { cn } from "@/lib/utils";

const SORTS = [
  { value: "featured", label: "Latest" },
  { value: "price_asc", label: "Price (low to high)" },
  { value: "price_desc", label: "Price (high to low)" },
  { value: "year_desc", label: "Year (newest)" },
];

const selectCls =
  "h-9 appearance-none rounded-lg border border-input bg-card pl-3 pr-8 text-sm font-medium outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";

export function ShowroomControls() {
  const router = useRouter();
  const sp = useSearchParams();

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/research/showroom?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <select aria-label="Make" value={sp.get("make") ?? ""} onChange={(e) => update("make", e.target.value)} className={selectCls}>
        <option value="">All makes</option>
        {POPULAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <div className="relative inline-flex items-center">
        <ArrowUpDown className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
        <select aria-label="Sort" value={sp.get("sort") ?? "featured"} onChange={(e) => update("sort", e.target.value)} className={cn(selectCls, "pl-8")}>
          {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
    </div>
  );
}
