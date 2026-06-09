"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { POPULAR_MAKES, AU_STATES } from "@/lib/site";
import { fmtPrice } from "@/lib/format";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputCls = "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";
const selectCls = cn(inputCls, "appearance-none");

export function InstantOfferForm() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [odometer, setOdometer] = useState("");
  const [state, setState] = useState("");
  const [offer, setOffer] = useState<number | null>(null);

  const valid = make && model && year && odometer;

  function getOffer() {
    const y = parseInt(year, 10) || new Date().getFullYear();
    const km = parseInt(odometer.replace(/\D/g, ""), 10) || 0;
    const age = Math.max(0, new Date().getFullYear() - y);
    const base = Math.max(3500, 46000 - age * 3000 - km * 0.085) * 0.88; // dealer offer
    setOffer(Math.round(base / 100) * 100);
  }

  if (offer != null) {
    return (
      <div className="rounded-2xl border bg-card p-6 ring-1 ring-foreground/5 sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-semibold text-success">
          <CheckCircle2 className="size-3.5" /> Instant Offer ready
        </span>
        <p className="mt-4 text-sm text-muted-foreground">Your guaranteed offer for the {year} {make} {model}</p>
        <div className="mt-1 text-4xl font-extrabold tracking-tight tnum">{fmtPrice(offer)}</div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="size-3.5" /> Valid for 7 days · paid next business day after inspection</p>

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
          <button className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2")}>Accept this offer <ArrowRight className="size-4" /></button>
          <Link href="/sell/create" className={cn(buttonVariants({ variant: "outline" }), "h-11")}>Create an ad instead</Link>
        </div>
        <button onClick={() => setOffer(null)} className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <RotateCcw className="size-3.5" /> Value a different car
        </button>
        <p className="mt-4 text-[11px] text-muted-foreground">Final offer is subject to inspection. T&amp;Cs apply. Not all vehicles are eligible.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-6 ring-1 ring-foreground/5 sm:p-8">
      <h2 className="text-lg font-bold">Get your free Instant Offer</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tell us about your car — it takes less than a minute.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <select className={selectCls} value={make} onChange={(e) => setMake(e.target.value)} aria-label="Make">
          <option value="">Make</option>
          {POPULAR_MAKES.map((m) => <option key={m}>{m}</option>)}
        </select>
        <input className={inputCls} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
        <input className={inputCls} inputMode="numeric" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))} />
        <input className={inputCls} inputMode="numeric" placeholder="Odometer (km)" value={odometer} onChange={(e) => setOdometer(e.target.value.replace(/\D/g, ""))} />
        <select className={cn(selectCls, "sm:col-span-2")} value={state} onChange={(e) => setState(e.target.value)} aria-label="State">
          <option value="">State</option>
          {AU_STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <Button onClick={getOffer} disabled={!valid} className="mt-5 h-11 w-full gap-2">
        <Sparkles className="size-4" /> Get my Instant Offer
      </Button>
    </div>
  );
}
