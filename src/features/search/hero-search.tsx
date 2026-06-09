"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { POPULAR_MAKES, BODY_TYPES, AU_STATES } from "@/lib/site";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "all", label: "All", params: {} },
  { key: "used", label: "Used", params: { condition: "used" } },
  { key: "new", label: "New", params: { condition: "new" } },
  { key: "dealer", label: "Dealer", params: { sellerType: "dealer" } },
  { key: "private", label: "Private", params: { sellerType: "private" } },
] as const;

const PRICE_STEPS = [10000, 20000, 30000, 40000, 50000, 75000, 100000];

const selectCls =
  "h-11 w-full appearance-none rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30";

export function HeroSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const [make, setMake] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState("");
  const [priceMax, setPriceMax] = useState("");

  function submit() {
    const params = new URLSearchParams();
    const tabParams = TABS.find((t) => t.key === tab)!.params as Record<string, string>;
    Object.entries(tabParams).forEach(([k, v]) => params.set(k, v));
    if (make) params.set("make", make);
    if (body) params.set("bodyType", body);
    if (state) params.set("state", state);
    if (priceMax) params.set("priceMax", priceMax);
    router.push(`/cars${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className={cn("w-full rounded-2xl bg-card/95 p-2 shadow-2xl ring-1 ring-foreground/10 backdrop-blur", className)}>
      {/* Tabs */}
      <div className="flex gap-1 px-1 pt-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
              tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="mt-2 grid grid-cols-1 gap-2 p-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <select aria-label="Make" value={make} onChange={(e) => setMake(e.target.value)} className={selectCls}>
          <option value="">Any make</option>
          {POPULAR_MAKES.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select aria-label="Body type" value={body} onChange={(e) => setBody(e.target.value)} className={selectCls}>
          <option value="">Any body type</option>
          {BODY_TYPES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select aria-label="State" value={state} onChange={(e) => setState(e.target.value)} className={selectCls}>
          <option value="">All states</option>
          {AU_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select aria-label="Max price" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className={selectCls}>
          <option value="">Max price</option>
          {PRICE_STEPS.map((p) => (
            <option key={p} value={p}>${p.toLocaleString("en-AU")}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={submit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
        >
          <Search className="size-4" />
          Search
        </button>
      </div>
    </div>
  );
}
