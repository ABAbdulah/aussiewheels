"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Banknote, Search, Repeat, RotateCcw } from "lucide-react";
import Link from "next/link";
import { POPULAR_MAKES, AU_STATES } from "@/lib/site";
import { fmtPrice } from "@/lib/format";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MODES = [
  { key: "selling", label: "Selling", Icon: Banknote, blurb: "See what your car could sell for privately." },
  { key: "buying", label: "Buying", Icon: Search, blurb: "Check if a listed car is priced fairly." },
  { key: "trade-in", label: "Trade-in", Icon: Repeat, blurb: "Estimate your trade-in value at a dealer." },
] as const;

const MAKE_TIER: Record<string, number> = {
  "Mercedes-Benz": 1.6, BMW: 1.55, Audi: 1.5, Lexus: 1.5, Volvo: 1.35, Polestar: 1.35,
  Tesla: 1.4, "Land Rover": 1.6, Toyota: 1.2, Mazda: 1.05, Subaru: 1.1, Ford: 1.1,
  Volkswagen: 1.15, Kia: 1.0, Hyundai: 1.0, Honda: 1.05, Nissan: 1.0, Isuzu: 1.15,
  Mitsubishi: 0.95, MG: 0.8, BYD: 1.0, Suzuki: 0.9,
};

const inputCls = "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";
const selectCls = cn(inputCls, "appearance-none");

type Result = { low: number; median: number; high: number } | null;

export function ValuationWidget({ defaultMode = "selling" }: { defaultMode?: "selling" | "buying" | "trade-in" }) {
  const [mode, setMode] = useState<(typeof MODES)[number]["key"]>(defaultMode);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [odometer, setOdometer] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState<Result>(null);

  const valid = make && model && year && odometer;

  function estimate() {
    const y = parseInt(year, 10) || new Date().getFullYear();
    const km = parseInt(odometer.replace(/\D/g, ""), 10) || 0;
    const age = Math.max(0, new Date().getFullYear() - y);
    const tier = MAKE_TIER[make] ?? 1;
    let base = 52000 * tier - age * 3200 - km * 0.09;
    base = Math.max(4500, base);
    if (mode === "trade-in") base *= 0.86; // dealer margin
    const spread = mode === "buying" ? 0.07 : 0.09;
    setResult({
      low: Math.round((base * (1 - spread)) / 100) * 100,
      median: Math.round(base / 100) * 100,
      high: Math.round((base * (1 + spread)) / 100) * 100,
    });
  }

  const reset = () => setResult(null);

  return (
    <div className="overflow-hidden rounded-2xl border bg-card ring-1 ring-foreground/5">
      {/* Mode tabs */}
      <div className="grid grid-cols-3 border-b">
        {MODES.map((m) => {
          const active = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => { setMode(m.key); reset(); }}
              className={cn("flex flex-col items-center gap-1 px-2 py-3 text-sm font-semibold transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}
            >
              <m.Icon className="size-4" />
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {!result ? (
          <>
            <p className="mb-5 text-sm text-muted-foreground">{MODES.find((m) => m.key === mode)!.blurb}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <select className={selectCls} value={make} onChange={(e) => setMake(e.target.value)} aria-label="Make">
                <option value="">Make</option>
                {POPULAR_MAKES.map((m) => <option key={m}>{m}</option>)}
              </select>
              <input className={inputCls} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
              <input className={inputCls} inputMode="numeric" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))} />
              <input className={inputCls} inputMode="numeric" placeholder="Odometer (km)" value={odometer} onChange={(e) => setOdometer(e.target.value.replace(/\D/g, ""))} />
              <select className={cn(selectCls, "sm:col-span-2")} value={state} onChange={(e) => setState(e.target.value)} aria-label="State">
                <option value="">State (optional)</option>
                {AU_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <Button onClick={estimate} disabled={!valid} className="mt-5 h-11 w-full gap-2">
              <Sparkles className="size-4" /> Get my valuation
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">Free · No obligation · No follow-up calls</p>
          </>
        ) : (
          <div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {mode === "buying" ? "Fair price range" : mode === "trade-in" ? "Estimated trade-in value" : "Estimated private sale value"}
              </p>
              <div className="mt-1 text-3xl font-extrabold tracking-tight tnum">
                {fmtPrice(result.low)} – {fmtPrice(result.high)}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {[year, make, model].filter(Boolean).join(" ")} · ≈ {fmtPrice(result.median)} typical
              </p>
            </div>

            {/* Range bar */}
            <div className="mt-5">
              <div className="relative h-2.5 rounded-full bg-gradient-to-r from-success/40 via-brand to-success/40">
                <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow" />
              </div>
              <div className="mt-1.5 flex justify-between text-xs font-medium tnum">
                <span>{fmtPrice(result.low)}</span><span>{fmtPrice(result.high)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              {mode === "buying" ? (
                <Link href="/cars" className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2")}>
                  Browse cars in this range <ArrowRight className="size-4" />
                </Link>
              ) : (
                <>
                  <Link href="/sell/create" className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2")}>
                    Create an ad <ArrowRight className="size-4" />
                  </Link>
                  <Link href="/sell/instant-offer" className={cn(buttonVariants({ variant: "outline" }), "h-11")}>
                    Get an Instant Offer instead
                  </Link>
                </>
              )}
              <button onClick={reset} className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <RotateCcw className="size-3.5" /> Value another car
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
