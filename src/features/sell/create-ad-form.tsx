"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAKES = ["Audi", "BMW", "Ford", "Holden", "Hyundai", "Kia", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Subaru", "Tesla", "Toyota", "Volkswagen", "Other"];
const STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
const YEARS = Array.from({ length: 30 }, (_, i) => String(2026 - i));
const BODY_TYPES = ["Cab Chassis", "Convertible", "Coupe", "Hatch", "Sedan", "SUV", "Ute", "Van", "Wagon"];
const TRANSMISSIONS = ["Automatic", "Manual", "Semi-Automatic", "CVT"];
const FUELS = ["Diesel", "Electric", "Hybrid", "LPG", "Petrol", "PHEV"];
const CONDITIONS = ["Used", "New", "Demo"];

type PhotoFile = { file: File; url: string };

export function CreateAdForm() {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    registration: "",
    state: "",
    make: "",
    model: "",
    year: "",
    odometer: "",
    bodyType: "",
    transmission: "",
    fuel: "",
    condition: "",
    price: "",
    description: "",
    suburb: "",
    name: "",
    email: "",
    phone: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const newPhotos = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 20 - photos.length)
      .map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    setErrors((prev) => ({ ...prev, photos: "" }));
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.make) errs.make = "Required";
    if (!form.year) errs.year = "Required";
    if (!form.state) errs.state = "Required";
    if (!form.odometer) errs.odometer = "Required";
    if (!form.price) errs.price = "Required";
    if (!form.condition) errs.condition = "Required";
    if (!form.name) errs.name = "Required";
    if (!form.email) errs.email = "Required";
    if (photos.length === 0) errs.photos = "At least one photo is required";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErr = document.querySelector("[data-error]");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border bg-emerald-50 dark:bg-emerald-950/20 p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-500" strokeWidth={1.5} />
        <h2 className="mt-4 text-xl font-semibold">Your ad has been submitted!</h2>
        <p className="mt-2 text-sm font-light text-muted-foreground">
          We&apos;ll review your listing and it will be live within a few hours. We&apos;ll email you once it&apos;s published.
        </p>
        <Button className="mt-6 rounded-full! font-light" onClick={() => { setSubmitted(false); setForm({ registration: "", state: "", make: "", model: "", year: "", odometer: "", bodyType: "", transmission: "", fuel: "", condition: "", price: "", description: "", suburb: "", name: "", email: "", phone: "" }); setPhotos([]); }}>
          Create another ad
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-10">

      {/* ── Photos (mandatory) ── */}
      <section>
        <h2 className="text-base font-semibold">
          Photos <span className="text-destructive">*</span>
        </h2>
        <p className="mt-0.5 text-xs font-light text-muted-foreground">Upload up to 20 photos. First photo will be the cover image.</p>

        <div
          data-error={errors.photos ? "true" : undefined}
          className={cn(
            "mt-3 rounded-xl border-2 border-dashed transition-colors",
            dragOver ? "border-primary bg-primary/5" : errors.photos ? "border-destructive" : "border-muted-foreground/20 hover:border-primary/40"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addPhotos(e.dataTransfer.files); }}
        >
          {photos.length === 0 ? (
            <button
              type="button"
              className="flex w-full flex-col items-center gap-3 py-12 text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-8 text-muted-foreground/50" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">Drag &amp; drop photos here</p>
                <p className="text-xs font-light text-muted-foreground">or click to browse — JPG, PNG, WebP up to 10MB each</p>
              </div>
            </button>
          ) : (
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((p, i) => (
                  <div key={p.url} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="" className="h-full w-full object-cover" />
                    {i === 0 && (
                      <span className="absolute left-1 top-1 rounded bg-primary/80 px-1.5 py-0.5 text-[10px] font-medium text-white">Cover</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                {photos.length < 20 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    <ImageIcon className="size-5" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {errors.photos && <p className="mt-1.5 text-xs text-destructive">{errors.photos}</p>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addPhotos(e.target.files)}
        />
      </section>

      {/* ── Car details ── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold">Car details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Registration plate" error={errors.registration}>
            <input
              placeholder="e.g. ABC123"
              value={form.registration}
              onChange={(e) => set("registration", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="State" required error={errors.state}>
            <select value={form.state} onChange={(e) => set("state", e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <Field label="Make" required error={errors.make}>
            <select value={form.make} onChange={(e) => set("make", e.target.value)} className={inputCls}>
              <option value="">Select make</option>
              {MAKES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>

          <Field label="Model" error={errors.model}>
            <input
              placeholder="e.g. Camry"
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Year" required error={errors.year}>
            <select value={form.year} onChange={(e) => set("year", e.target.value)} className={inputCls}>
              <option value="">Select year</option>
              {YEARS.map((y) => <option key={y}>{y}</option>)}
            </select>
          </Field>

          <Field label="Odometer (km)" required error={errors.odometer}>
            <input
              type="number"
              placeholder="e.g. 84000"
              min={0}
              value={form.odometer}
              onChange={(e) => set("odometer", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Body type" error={errors.bodyType}>
            <select value={form.bodyType} onChange={(e) => set("bodyType", e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {BODY_TYPES.map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>

          <Field label="Transmission" error={errors.transmission}>
            <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>

          <Field label="Fuel type" error={errors.fuel}>
            <select value={form.fuel} onChange={(e) => set("fuel", e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {FUELS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>

          <Field label="Condition" required error={errors.condition}>
            <select value={form.condition} onChange={(e) => set("condition", e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Asking price (AUD)" required error={errors.price}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-light text-muted-foreground">$</span>
            <input
              type="number"
              placeholder="e.g. 24000"
              min={0}
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className={cn(inputCls, "pl-7")}
            />
          </div>
        </Field>

        <Field label="Suburb or postcode" error={errors.suburb}>
          <input
            placeholder="e.g. Surry Hills, 2010"
            value={form.suburb}
            onChange={(e) => set("suburb", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Description" error={errors.description}>
          <textarea
            placeholder="Tell buyers about the car — service history, extras, reason for selling…"
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className={cn(inputCls, "resize-none")}
          />
        </Field>
      </section>

      {/* ── Contact details ── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold">Your contact details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required error={errors.name}>
            <input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Phone number" error={errors.phone}>
            <input
              type="tel"
              placeholder="04xx xxx xxx"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Email address" required error={errors.email} className="sm:col-span-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="border-t pt-6">
        <p className="mb-4 text-xs font-light text-muted-foreground">
          By submitting you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Terms &amp; Conditions</a> and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
        <Button type="submit" size="lg" className="w-full rounded-xl! font-light text-base sm:w-auto sm:px-12">
          Submit listing
        </Button>
      </div>
    </form>
  );
}

const inputCls = "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm font-light outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/60";

function Field({
  label, required, error, children, className,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div data-error={error ? "true" : undefined} className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
