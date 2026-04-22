"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, X, Search, Bookmark, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ── filter data ──────────────────────────────── */
const MAKES = ["Audi", "BMW", "Ford", "Holden", "Hyundai", "Kia", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Subaru", "Tesla", "Toyota", "Volkswagen"];
const STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
const YEAR_RANGE = Array.from({ length: 26 }, (_, i) => String(2026 - i));
const PRICE_OPTS = ["$5,000", "$10,000", "$15,000", "$20,000", "$25,000", "$30,000", "$40,000", "$50,000", "$75,000", "$100,000", "$150,000"];
const BODY_TYPES = ["Cab Chassis", "Convertible", "Coupe", "Hatch", "Sedan", "SUV", "Ute", "Van", "Wagon"];
const TRANSMISSIONS = ["Automatic", "Manual", "Semi-Automatic", "CVT"];
const FUELS = ["Diesel", "Electric", "Hybrid", "LPG", "Petrol", "PHEV"];
const ODO_OPTS = ["10,000 km", "25,000 km", "50,000 km", "75,000 km", "100,000 km", "150,000 km", "200,000 km"];

/* ── helpers ──────────────────────────────────── */
function useFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`?${next.toString()}`, { scroll: false });
  }

  function remove(key: string) {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    next.delete("page");
    router.push(`?${next.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push("?", { scroll: false });
  }

  function get(key: string) {
    return params.get(key) ?? "";
  }

  const activeCount = [...params.keys()].filter((k) => k !== "page").length;

  return { set, remove, get, clearAll, activeCount };
}

/* ── collapsible section ─────────────────────── */
function Section({
  label,
  icon,
  defaultOpen = false,
  children,
  badge,
}: {
  label: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b">
      <button
        className="flex w-full items-center justify-between px-0 py-3 text-sm font-medium transition-colors hover:text-primary"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
          {badge && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
              {badge}
            </span>
          )}
        </span>
        {open ? (
          <ChevronDown className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
        ) : (
          <ChevronRight className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
        )}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

/* ── chip list ────────────────────────────────── */
function ChipFilter({
  options,
  param,
  filters,
}: {
  options: string[];
  param: string;
  filters: ReturnType<typeof useFilters>;
}) {
  const selected = filters.get(param);
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => filters.set(param, selected === opt ? "" : opt)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs font-light transition-colors",
            selected === opt
              ? "border-primary bg-primary/10 text-primary"
              : "hover:border-primary/50 hover:text-primary"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ── selected value pill ─────────────────────── */
function ActivePill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      {label}
      <button onClick={onRemove} className="hover:text-destructive" aria-label={`Remove ${label} filter`}>
        <X className="size-3" />
      </button>
    </span>
  );
}

/* ── main sidebar ────────────────────────────── */
export function FilterSidebar() {
  const filters = useFilters();
  const [, startTransition] = useTransition();

  const make = filters.get("make");
  const state = filters.get("state");
  const body = filters.get("body");
  const condition = filters.get("condition");
  const transmission = filters.get("transmission");
  const fuel = filters.get("fuel");
  const priceMin = filters.get("priceMin");
  const priceMax = filters.get("priceMax");
  const keyword = filters.get("keyword");
  const kmMax = filters.get("kmMax");

  return (
    <aside className="w-full">
      {/* Save search */}
      <Button variant="outline" size="sm" className="mb-5 w-full gap-2 rounded-full! font-light">
        <Bookmark className="size-3.5" strokeWidth={1.5} />
        Save search
      </Button>

      {/* Filters header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-base font-semibold">Filters</span>
        {filters.activeCount > 0 && (
          <button
            onClick={() => startTransition(() => filters.clearAll())}
            className="text-xs font-light text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active filter pills */}
      {filters.activeCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {make && <ActivePill label={make} onRemove={() => filters.remove("make")} />}
          {state && <ActivePill label={state} onRemove={() => filters.remove("state")} />}
          {body && <ActivePill label={body} onRemove={() => filters.remove("body")} />}
          {condition && <ActivePill label={condition} onRemove={() => filters.remove("condition")} />}
          {transmission && <ActivePill label={transmission} onRemove={() => filters.remove("transmission")} />}
          {fuel && <ActivePill label={fuel} onRemove={() => filters.remove("fuel")} />}
          {priceMin && <ActivePill label={`From ${priceMin}`} onRemove={() => filters.remove("priceMin")} />}
          {priceMax && <ActivePill label={`Up to ${priceMax}`} onRemove={() => filters.remove("priceMax")} />}
          {kmMax && <ActivePill label={`Up to ${kmMax}`} onRemove={() => filters.remove("kmMax")} />}
        </div>
      )}

      {/* Quick search */}
      <div className="mb-3 flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
        <Search className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
        <input
          placeholder="Quick search"
          defaultValue={keyword}
          className="flex-1 bg-transparent text-sm font-light outline-none placeholder:text-muted-foreground"
          onChange={(e) =>
            startTransition(() => {
              const v = e.target.value.trim();
              filters.set("keyword", v);
            })
          }
        />
        <span className="rounded border px-1 py-0.5 text-[10px] font-medium text-muted-foreground">
          NEW
        </span>
      </div>

      {/* ── Popular section ─────────── */}
      <Section label="Popular" icon={<Flame className="size-3.5 text-primary" strokeWidth={1.5} />} defaultOpen>
        <div className="space-y-0">
          {/* Make */}
          <div className="rounded-lg border bg-muted/30 overflow-hidden">
            <button
              className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-light hover:bg-muted/60"
              onClick={() => !make && filters.set("make", "")}
            >
              <span>Make</span>
              <ChevronRight className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
            </button>
            {make && (
              <div className="border-t px-3 py-2.5 bg-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{make}</span>
                  <button onClick={() => filters.remove("make")} className="text-muted-foreground hover:text-destructive">
                    <X className="size-4 rounded-full bg-primary text-primary-foreground p-0.5" />
                  </button>
                </div>
                <button
                  className="mt-2 flex w-full items-center justify-between text-sm font-light text-foreground/70 hover:text-foreground"
                >
                  <span>Model</span>
                  <ChevronRight className="size-3.5" strokeWidth={1.5} />
                </button>
              </div>
            )}
            {!make && (
              <div className="border-t">
                <div className="max-h-40 overflow-y-auto divide-y">
                  {MAKES.map((m) => (
                    <button
                      key={m}
                      className="flex w-full items-center justify-between px-3 py-2 text-sm font-light hover:bg-accent hover:text-primary"
                      onClick={() => filters.set("make", m)}
                    >
                      {m}
                      <ChevronRight className="size-3 text-muted-foreground" strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="mt-px rounded-lg border bg-muted/30">
            <button className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-light hover:bg-muted/60">
              <span>Location{state ? `: ${state}` : ""}</span>
              {state ? (
                <button onClick={() => filters.remove("state")} className="text-muted-foreground hover:text-destructive">
                  <X className="size-3.5" />
                </button>
              ) : (
                <ChevronRight className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
              )}
            </button>
            {!state && (
              <div className="border-t divide-y max-h-40 overflow-y-auto">
                {STATES.map((s) => (
                  <button
                    key={s}
                    onClick={() => filters.set("state", s)}
                    className="flex w-full px-3 py-2 text-sm font-light hover:bg-accent hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year */}
          <div className="mt-px rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between px-3 py-2.5 text-sm font-light">
              <span>Year</span>
            </div>
            <div className="border-t grid grid-cols-2 gap-2 px-3 py-2">
              <div>
                <label className="text-[10px] text-muted-foreground">From</label>
                <select
                  className="mt-0.5 w-full rounded border bg-background px-2 py-1 text-xs font-light"
                  value={filters.get("yearMin")}
                  onChange={(e) => filters.set("yearMin", e.target.value)}
                >
                  <option value="">Any</option>
                  {YEAR_RANGE.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground">To</label>
                <select
                  className="mt-0.5 w-full rounded border bg-background px-2 py-1 text-xs font-light"
                  value={filters.get("yearMax")}
                  onChange={(e) => filters.set("yearMax", e.target.value)}
                >
                  <option value="">Any</option>
                  {YEAR_RANGE.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-px rounded-lg border bg-muted/30">
            <div className="px-3 py-2.5 text-sm font-light">Price</div>
            <div className="border-t grid grid-cols-2 gap-2 px-3 py-2">
              <div>
                <label className="text-[10px] text-muted-foreground">Min</label>
                <select
                  className="mt-0.5 w-full rounded border bg-background px-2 py-1 text-xs font-light"
                  value={priceMin}
                  onChange={(e) => filters.set("priceMin", e.target.value)}
                >
                  <option value="">Any</option>
                  {PRICE_OPTS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground">Max</label>
                <select
                  className="mt-0.5 w-full rounded border bg-background px-2 py-1 text-xs font-light"
                  value={priceMax}
                  onChange={(e) => filters.set("priceMax", e.target.value)}
                >
                  <option value="">Any</option>
                  {PRICE_OPTS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Other filter sections ─────── */}
      <Section label="Odometer">
        <ChipFilter options={ODO_OPTS} param="kmMax" filters={filters} />
      </Section>

      <Section label="Transmission">
        <ChipFilter options={TRANSMISSIONS} param="transmission" filters={filters} />
      </Section>

      <Section label="Body type">
        <ChipFilter options={BODY_TYPES} param="body" filters={filters} />
      </Section>

      <Section label="New / used">
        <ChipFilter
          options={["New", "Used", "Demo"]}
          param="condition"
          filters={filters}
        />
      </Section>

      <Section label="Fuel / electric">
        <ChipFilter options={FUELS} param="fuel" filters={filters} />
      </Section>

      <Section label="Engine"><p className="text-xs font-light text-muted-foreground">Coming soon</p></Section>
      <Section label="Seller details"><p className="text-xs font-light text-muted-foreground">Coming soon</p></Section>
      <Section label="Style"><p className="text-xs font-light text-muted-foreground">Coming soon</p></Section>
      <Section label="Features"><p className="text-xs font-light text-muted-foreground">Coming soon</p></Section>
    </aside>
  );
}
