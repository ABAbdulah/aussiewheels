"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Car, ClipboardList, Camera, Tag, Package, CheckCircle2, ChevronLeft, ChevronRight,
  Upload, Check, Sparkles, PartyPopper, Star,
} from "lucide-react";
import { toast } from "sonner";
import {
  POPULAR_MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVE_TYPES, CONDITIONS, AU_STATES,
} from "@/lib/site";
import { fmtPrice } from "@/lib/format";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "vehicle", label: "Vehicle", Icon: Car },
  { key: "details", label: "Details", Icon: ClipboardList },
  { key: "photos", label: "Photos", Icon: Camera },
  { key: "pricing", label: "Price", Icon: Tag },
  { key: "package", label: "Package", Icon: Package },
  { key: "review", label: "Review", Icon: CheckCircle2 },
] as const;

const FEATURES = [
  "Apple CarPlay", "Android Auto", "Reversing camera", "Sat-nav", "Leather seats",
  "Sunroof", "Heated seats", "Adaptive cruise", "Blind-spot monitor", "Tow bar",
  "Keyless entry", "Alloy wheels",
];

const PACKAGES = [
  { key: "standard", name: "Standard", price: 49, perks: ["Runs until sold", "Secure payments"] },
  { key: "premium", name: "Premium", price: 99, perks: ["1.7× more appearances", "1.4× more views"] },
  { key: "ultimate", name: "Ultimate", price: 159, perks: ["2.7× more appearances", "Showcase + History snapshot"] },
] as const;

const inputCls =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";
const selectCls = cn(inputCls, "appearance-none");

type State = {
  rego: string; vin: string; make: string; model: string; variant: string; year: string;
  odometer: string; colour: string; transmission: string; fuel: string; bodyType: string;
  driveType: string; condition: string; suburb: string; state: string;
  features: string[]; description: string; price: string; photos: number;
  pkg: string;
};

export function CreateAdWizard() {
  const sp = useSearchParams();
  const initialPkg = sp.get("package") ?? "premium";
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>({
    rego: "", vin: "", make: "", model: "", variant: "", year: "",
    odometer: "", colour: "", transmission: "Automatic", fuel: "Petrol", bodyType: "",
    driveType: "", condition: "Used", suburb: "", state: "", features: [],
    description: "", price: "", photos: 0, pkg: initialPkg,
  });

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));
  const toggleFeature = (f: string) =>
    setS((p) => ({ ...p, features: p.features.includes(f) ? p.features.filter((x) => x !== f) : [...p.features, f] }));

  const priceNum = parseInt(s.price.replace(/\D/g, ""), 10) || 0;

  // Mock market guidance + ad rating
  const guide = useMemo(() => {
    const base = priceNum || 35000;
    const low = Math.round(base * 0.88);
    const high = Math.round(base * 1.12);
    const pos = priceNum ? Math.min(100, Math.max(0, ((priceNum - low) / (high - low)) * 100)) : 50;
    return { low, median: base, high, pos };
  }, [priceNum]);

  const adRating = useMemo(() => {
    let score = 0;
    if (s.make && s.model && s.year) score += 25;
    if (s.odometer && s.colour) score += 15;
    if (s.photos >= 5) score += 25;
    else if (s.photos > 0) score += 12;
    if (s.description.length > 80) score += 20;
    if (s.features.length >= 4) score += 15;
    return Math.min(100, score);
  }, [s]);

  const canNext = () => {
    if (step === 0) return !!(s.make && s.model && s.year);
    if (step === 3) return priceNum > 0;
    return true;
  };

  const next = () => setStep((i) => Math.min(STEPS.length - 1, i + 1));
  const back = () => setStep((i) => Math.max(0, i - 1));

  const publish = () =>
    toast.success("Your ad is live! 🎉", {
      description: `${s.year} ${s.make} ${s.model} listed for ${fmtPrice(priceNum)}.`,
    });

  return (
    <div className="mx-auto max-w-3xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center">
        {STEPS.map((st, i) => (
          <div key={st.key} className="flex flex-1 items-center last:flex-none">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full border-2 transition-colors",
                  i < step && "border-success bg-success text-success-foreground",
                  i === step && "border-primary bg-primary text-primary-foreground",
                  i > step && "border-border bg-card text-muted-foreground",
                )}
              >
                {i < step ? <Check className="size-4" /> : <st.Icon className="size-4" />}
              </span>
              <span className={cn("hidden text-[11px] font-medium sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>
                {st.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className={cn("mx-1 h-0.5 flex-1 rounded sm:mx-2", i < step ? "bg-success" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-6 ring-1 ring-foreground/5 sm:p-8">
        {/* ── Step 0: Vehicle ── */}
        {step === 0 && (
          <Step title="What are you selling?" sub="Look up your car by rego, or enter the details manually.">
            <div className="grid gap-3 sm:grid-cols-2">
              <Labeled label="Registration plate">
                <input className={inputCls} placeholder="e.g. ABC123" value={s.rego} onChange={(e) => set("rego", e.target.value.toUpperCase())} />
              </Labeled>
              <Labeled label="State">
                <select className={selectCls} value={s.state} onChange={(e) => set("state", e.target.value)}>
                  <option value="">Select state</option>
                  {AU_STATES.map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              </Labeled>
            </div>
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or enter manually <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Labeled label="Make *">
                <select className={selectCls} value={s.make} onChange={(e) => set("make", e.target.value)}>
                  <option value="">Select make</option>
                  {POPULAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </Labeled>
              <Labeled label="Model *">
                <input className={inputCls} placeholder="e.g. Corolla" value={s.model} onChange={(e) => set("model", e.target.value)} />
              </Labeled>
              <Labeled label="Year *">
                <input className={inputCls} inputMode="numeric" placeholder="e.g. 2022" value={s.year} onChange={(e) => set("year", e.target.value.replace(/\D/g, "").slice(0, 4))} />
              </Labeled>
              <Labeled label="Variant / series">
                <input className={inputCls} placeholder="e.g. Ascent Sport" value={s.variant} onChange={(e) => set("variant", e.target.value)} />
              </Labeled>
            </div>
          </Step>
        )}

        {/* ── Step 1: Details ── */}
        {step === 1 && (
          <Step title="Vehicle details" sub="The more detail you add, the better your ad performs.">
            <div className="grid gap-3 sm:grid-cols-2">
              <Labeled label="Odometer (km)">
                <input className={inputCls} inputMode="numeric" placeholder="e.g. 42000" value={s.odometer} onChange={(e) => set("odometer", e.target.value.replace(/\D/g, ""))} />
              </Labeled>
              <Labeled label="Colour"><input className={inputCls} placeholder="e.g. Eclipse Black" value={s.colour} onChange={(e) => set("colour", e.target.value)} /></Labeled>
              <Labeled label="Transmission">
                <select className={selectCls} value={s.transmission} onChange={(e) => set("transmission", e.target.value)}>
                  {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Labeled>
              <Labeled label="Fuel type">
                <select className={selectCls} value={s.fuel} onChange={(e) => set("fuel", e.target.value)}>
                  {FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}
                </select>
              </Labeled>
              <Labeled label="Body type">
                <select className={selectCls} value={s.bodyType} onChange={(e) => set("bodyType", e.target.value)}>
                  <option value="">Select</option>
                  {BODY_TYPES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Labeled>
              <Labeled label="Drive type">
                <select className={selectCls} value={s.driveType} onChange={(e) => set("driveType", e.target.value)}>
                  <option value="">Select</option>
                  {DRIVE_TYPES.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Labeled>
              <Labeled label="Condition">
                <select className={selectCls} value={s.condition} onChange={(e) => set("condition", e.target.value)}>
                  {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Labeled>
              <Labeled label="Suburb"><input className={inputCls} placeholder="e.g. Parramatta" value={s.suburb} onChange={(e) => set("suburb", e.target.value)} /></Labeled>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Features</p>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => {
                  const on = s.features.includes(f);
                  return (
                    <button key={f} onClick={() => toggleFeature(f)} className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors", on ? "border-brand bg-brand/10 text-brand" : "border-border hover:bg-muted")}>
                      {on && <Check className="mr-1 inline size-3" />}{f}
                    </button>
                  );
                })}
              </div>
            </div>

            <Labeled label="Description" className="mt-4">
              <textarea
                rows={4}
                className={cn(inputCls, "h-auto resize-y py-2")}
                placeholder="Describe your car's condition, service history and standout features…"
                value={s.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Labeled>
          </Step>
        )}

        {/* ── Step 2: Photos ── */}
        {step === 2 && (
          <Step title="Add photos" sub="Ads with 5+ photos get significantly more enquiries.">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 py-12 text-center transition-colors hover:border-brand/50 hover:bg-accent/40">
              <Upload className="size-8 text-brand" strokeWidth={1.5} />
              <span className="text-sm font-medium">Click to upload or drag & drop</span>
              <span className="text-xs text-muted-foreground">JPG or PNG, up to 20 photos</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => set("photos", e.target.files?.length ?? 0)} />
            </label>
            {s.photos > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {Array.from({ length: Math.min(s.photos, 10) }).map((_, i) => (
                  <div key={i} className="grid aspect-[4/3] place-items-center rounded-lg bg-gradient-to-br from-[#1B3A5C] to-[#2E6DA4] text-white/80">
                    <Camera className="size-5" />
                  </div>
                ))}
              </div>
            )}
            <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
              {["Shoot in daylight, front 3/4 angle first", "Clean the car inside and out", "Capture the dash, seats and odometer"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Sparkles className="size-3.5 text-brand" /> {t}</li>
              ))}
            </ul>
          </Step>
        )}

        {/* ── Step 3: Pricing ── */}
        {step === 3 && (
          <Step title="Set your price" sub="We've estimated a fair market range from live data.">
            <Labeled label="Asking price (AUD) *">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input className={cn(inputCls, "pl-7 text-lg font-semibold")} inputMode="numeric" placeholder="0" value={s.price} onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))} />
              </div>
            </Labeled>

            {/* Pricing guidance */}
            <div className="mt-5 rounded-xl border bg-muted/30 p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Below market</span><span>Market range</span><span>Above market</span>
              </div>
              <div className="relative mt-2 h-2.5 rounded-full bg-gradient-to-r from-success via-brand to-amber-500">
                <div className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow" style={{ left: `${guide.pos}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium tnum">
                <span>{fmtPrice(guide.low)}</span>
                <span className="text-muted-foreground">≈ {fmtPrice(guide.median)}</span>
                <span>{fmtPrice(guide.high)}</span>
              </div>
            </div>
          </Step>
        )}

        {/* ── Step 4: Package ── */}
        {step === 4 && (
          <Step title="Choose your package" sub="Every package runs until your car sells.">
            <div className="grid gap-3 sm:grid-cols-3">
              {PACKAGES.map((p) => {
                const active = s.pkg === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => set("pkg", p.key)}
                    className={cn("flex flex-col rounded-xl border-2 p-4 text-left transition-all", active ? "border-brand bg-brand/[0.04] shadow-sm" : "border-border hover:border-brand/40")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{p.name}</span>
                      {active && <CheckCircle2 className="size-4 text-brand" />}
                    </div>
                    <div className="mt-1 text-xl font-extrabold tnum">${p.price}</div>
                    <ul className="mt-2 space-y-1">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-1.5 text-xs text-muted-foreground"><Check className="size-3 text-success" /> {perk}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {/* ── Step 5: Review ── */}
        {step === 5 && (
          <Step title="Review & publish" sub="One last check before your ad goes live.">
            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">{[s.year, s.make, s.model, s.variant].filter(Boolean).join(" ") || "Your car"}</div>
                  <div className="text-sm text-muted-foreground">{[s.odometer && `${Number(s.odometer).toLocaleString("en-AU")} km`, s.transmission, s.fuel, s.bodyType].filter(Boolean).join(" · ")}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold tnum">{priceNum ? fmtPrice(priceNum) : "—"}</div>
                  <div className="text-xs uppercase text-brand">{s.pkg} package</div>
                </div>
              </div>
            </div>

            {/* Ad rating */}
            <div className="mt-4 rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-semibold"><Star className="size-4 text-amber-500" /> Ad rating</span>
                <span className="text-sm font-bold tnum">{adRating}/100</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full rounded-full transition-all", adRating >= 70 ? "bg-success" : adRating >= 40 ? "bg-amber-500" : "bg-destructive")} style={{ width: `${adRating}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {adRating >= 70 ? "Great ad! You're ready to attract buyers." : "Add more photos and detail to boost your rating."}
              </p>
            </div>

            <button onClick={publish} className={cn(buttonVariants({ variant: "default" }), "mt-5 h-11 w-full gap-2 text-sm")}>
              <PartyPopper className="size-4" /> Publish my ad — ${PACKAGES.find((p) => p.key === s.pkg)?.price}
            </button>
          </Step>
        )}

        {/* Nav */}
        <div className="mt-7 flex items-center justify-between border-t pt-5">
          <Button variant="ghost" onClick={back} disabled={step === 0} className="h-10">
            <ChevronLeft className="size-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} disabled={!canNext()} className="h-10 px-6">
              Continue <ChevronRight className="size-4" />
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">Ready to publish</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Labeled({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
