"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const makes = [
  "Toyota", "Mazda", "Ford", "Hyundai", "Kia", "Tesla",
  "BYD", "Mitsubishi", "Subaru", "Volkswagen", "BMW", "Mercedes-Benz",
];

const modelsByMake: Record<string, string[]> = {
  Toyota: ["Corolla", "RAV4", "HiLux", "LandCruiser", "Camry", "Prado"],
  Mazda: ["CX-5", "CX-3", "Mazda3", "BT-50", "CX-60"],
  Ford: ["Ranger", "Everest", "Mustang", "Puma"],
  Hyundai: ["i30", "Tucson", "Kona", "Santa Fe", "Ioniq 6"],
  Kia: ["Cerato", "Sportage", "Seltos", "Sorento", "EV6"],
  Tesla: ["Model 3", "Model Y", "Model S"],
  BYD: ["Atto 3", "Seal", "Dolphin", "Sealion"],
  Mitsubishi: ["ASX", "Outlander", "Eclipse Cross", "Triton"],
  Subaru: ["Forester", "Outback", "Impreza", "XV"],
  Volkswagen: ["Golf", "Tiguan", "T-Roc", "Amarok"],
  BMW: ["3 Series", "5 Series", "X3", "X5"],
  "Mercedes-Benz": ["A-Class", "C-Class", "GLC", "GLE"],
};

const bodyTypes = ["SUV", "Sedan", "Hatch", "Ute", "Wagon", "Van", "Coupe", "Convertible"];
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
const conditions = ["New and used", "New", "Used", "Demo"];
const prices = ["$5,000", "$10,000", "$15,000", "$20,000", "$25,000", "$30,000", "$40,000", "$50,000", "$75,000", "$100,000"];

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

function FilterSelect({ label, value, options, onChange, disabled, placeholder }: FilterSelectProps) {
  return (
    <div className="relative">
      <label className="block text-[11px] font-light text-muted-foreground mb-0.5 leading-none">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full h-10 appearance-none rounded-lg border border-input bg-background pl-3 pr-8 text-sm font-light text-foreground disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors hover:border-ring/40 cursor-pointer"
        >
          <option value="">{placeholder ?? `All ${label.toLowerCase()}s`}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
      </div>
    </div>
  );
}

export function CarSearchBar() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [state, setState] = useState("");
  const [condition, setCondition] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  function handleSearch() {
    const p = new URLSearchParams();
    if (make) p.set("make", make);
    if (model) p.set("model", model);
    if (bodyType) p.set("body", bodyType);
    if (state) p.set("state", state);
    if (condition && condition !== "New and used") p.set("condition", condition.toLowerCase());
    if (priceMin) p.set("priceMin", priceMin.replace(/\D/g, ""));
    if (priceMax) p.set("priceMax", priceMax.replace(/\D/g, ""));
    router.push(`/buy/cars?${p.toString()}`);
  }

  const models = make ? (modelsByMake[make] ?? []) : [];

  return (
    <div className="rounded-2xl bg-background shadow-lg shadow-black/8 border border-border/60 p-5">
      {/* Heading row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Find your next car</h2>
        <button
          onClick={handleSearch}
          className="flex items-center gap-1.5 text-xs font-light text-primary hover:underline"
        >
          <Search className="size-3.5" />
          Quick search
        </button>
      </div>

      {/* Main filter row */}
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <FilterSelect label="Make" value={make} options={makes} onChange={(v) => { setMake(v); setModel(""); }} placeholder="All makes" />
        <FilterSelect label="Model" value={model} options={models} onChange={setModel} disabled={!make} placeholder="All models" />
        <FilterSelect label="Body type" value={bodyType} options={bodyTypes} onChange={setBodyType} placeholder="All body types" />
        <FilterSelect label="Location" value={state} options={states} onChange={setState} placeholder="All states" />
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="h-10 w-full rounded-lg px-5 text-sm font-medium lg:whitespace-nowrap"
          >
            Show cars
          </Button>
        </div>
      </div>

      {/* Secondary filters */}
      <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
        <div className="relative">
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="h-7 appearance-none rounded-full border border-input bg-background pl-3 pr-7 text-xs font-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50"
          >
            <option value="New and used">New and used</option>
            {conditions.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <select
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="h-7 appearance-none rounded-full border border-input bg-background pl-3 pr-7 text-xs font-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50"
          >
            <option value="">Price min</option>
            {prices.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        </div>
        <div className="relative">
          <select
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="h-7 appearance-none rounded-full border border-input bg-background pl-3 pr-7 text-xs font-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50"
          >
            <option value="">Price max</option>
            {prices.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        </div>
        {(make || model || bodyType || state || priceMin || priceMax) && (
          <button
            onClick={() => { setMake(""); setModel(""); setBodyType(""); setState(""); setPriceMin(""); setPriceMax(""); }}
            className="text-xs font-light text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
