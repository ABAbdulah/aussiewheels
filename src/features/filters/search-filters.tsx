"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import type { Facets } from "@/lib/api";
import {
  BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVE_TYPES, CONDITIONS,
  SELLER_TYPES, AU_STATES,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const PRICE_STEPS = [5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000, 150000, 200000];
const KM_STEPS = [10000, 30000, 50000, 75000, 100000, 150000, 200000];
const YEARS = Array.from({ length: 26 }, (_, i) => new Date().getFullYear() + 1 - i);

const selectCls =
  "h-9 w-full appearance-none rounded-lg border border-input bg-card px-2.5 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border/70 py-4 first:pt-0">
      <h3 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

export function SearchFilters({ facets, onNavigate }: { facets: Facets | null; onNavigate?: () => void }) {
  const router = useRouter();
  const sp = useSearchParams();

  const get = (k: string) => sp.get(k) ?? "";
  const getList = (k: string) => (sp.get(k) ? sp.get(k)!.split(",").filter(Boolean) : []);

  const navigate = useCallback(
    (next: URLSearchParams) => {
      next.delete("page");
      const qs = next.toString();
      router.push(`/cars${qs ? `?${qs}` : ""}`, { scroll: false });
      onNavigate?.();
    },
    [router, onNavigate],
  );

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    navigate(next);
  };

  const toggleInList = (key: string, value: string) => {
    const cur = getList(key);
    const nextList = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    const next = new URLSearchParams(sp.toString());
    if (nextList.length) next.set(key, nextList.join(","));
    else next.delete(key);
    navigate(next);
  };

  const toggleBool = (key: string) => {
    const next = new URLSearchParams(sp.toString());
    if (get(key)) next.delete(key);
    else next.set(key, "true");
    navigate(next);
  };

  const makeOptions = facets?.makes.map((m) => `${m.value} (${m.count})|${m.value}`) ?? [];
  const stateOptions = facets?.states.map((s) => s.value) ?? AU_STATES;

  const hasFilters = [...sp.keys()].some((k) => !["sort", "page"].includes(k));

  return (
    <div className="text-sm">
      <div className="flex items-center justify-between pb-3">
        <span className="font-semibold">Filters</span>
        {hasFilters && (
          <button
            onClick={() => navigate(new URLSearchParams(get("sort") ? { sort: get("sort") } : {}))}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
          >
            <X className="size-3" /> Clear all
          </button>
        )}
      </div>

      {/* Condition */}
      <Group title="Condition">
        <div className="flex gap-1.5">
          {CONDITIONS.map((c) => {
            const active = get("condition") === c.toLowerCase();
            return (
              <button
                key={c}
                onClick={() => setParam("condition", active ? "" : c.toLowerCase())}
                className={cn(
                  "flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Group>

      {/* Seller type */}
      <Group title="Seller type">
        <div className="flex gap-1.5">
          {SELLER_TYPES.map((s) => {
            const active = get("sellerType") === s.toLowerCase();
            return (
              <button
                key={s}
                onClick={() => setParam("sellerType", active ? "" : s.toLowerCase())}
                className={cn(
                  "flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Group>

      {/* Make */}
      <Group title="Make">
        <select className={selectCls} value={get("make")} onChange={(e) => setParam("make", e.target.value)}>
          <option value="">Any make</option>
          {makeOptions.map((opt) => {
            const [label, value] = opt.split("|");
            return <option key={value} value={value}>{label}</option>;
          })}
        </select>
      </Group>

      {/* Price */}
      <Group title="Price">
        <div className="flex items-center gap-2">
          <select className={selectCls} value={get("priceMin")} onChange={(e) => setParam("priceMin", e.target.value)}>
            <option value="">Min</option>
            {PRICE_STEPS.map((p) => <option key={p} value={p}>${p.toLocaleString("en-AU")}</option>)}
          </select>
          <span className="text-muted-foreground">–</span>
          <select className={selectCls} value={get("priceMax")} onChange={(e) => setParam("priceMax", e.target.value)}>
            <option value="">Max</option>
            {PRICE_STEPS.map((p) => <option key={p} value={p}>${p.toLocaleString("en-AU")}</option>)}
          </select>
        </div>
      </Group>

      {/* Body type */}
      <Group title="Body type">
        <div className="grid grid-cols-2 gap-1.5">
          {BODY_TYPES.map((b) => {
            const active = getList("bodyType").includes(b);
            return (
              <label
                key={b}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition-colors",
                  active ? "border-brand bg-brand/5 text-brand" : "border-border hover:bg-muted",
                )}
              >
                <input type="checkbox" checked={active} onChange={() => toggleInList("bodyType", b)} className="size-3.5 accent-[var(--brand)]" />
                {b}
              </label>
            );
          })}
        </div>
      </Group>

      {/* Fuel */}
      <Group title="Fuel type">
        <div className="grid grid-cols-2 gap-1.5">
          {FUEL_TYPES.map((f) => {
            const active = getList("fuel").includes(f);
            return (
              <label
                key={f}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition-colors",
                  active ? "border-brand bg-brand/5 text-brand" : "border-border hover:bg-muted",
                )}
              >
                <input type="checkbox" checked={active} onChange={() => toggleInList("fuel", f)} className="size-3.5 accent-[var(--brand)]" />
                {f}
              </label>
            );
          })}
        </div>
      </Group>

      {/* Year + Odometer */}
      <Group title="Year & odometer">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <select className={selectCls} value={get("yearMin")} onChange={(e) => setParam("yearMin", e.target.value)}>
              <option value="">Year from</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select className={selectCls} value={get("yearMax")} onChange={(e) => setParam("yearMax", e.target.value)}>
              <option value="">Year to</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <select className={selectCls} value={get("kmMax")} onChange={(e) => setParam("kmMax", e.target.value)}>
            <option value="">Max odometer</option>
            {KM_STEPS.map((k) => <option key={k} value={k}>Under {k.toLocaleString("en-AU")} km</option>)}
          </select>
        </div>
      </Group>

      {/* Transmission + Drive */}
      <Group title="Transmission & drive">
        <div className="flex items-center gap-2">
          <select className={selectCls} value={get("transmission")} onChange={(e) => setParam("transmission", e.target.value)}>
            <option value="">Any trans.</option>
            {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className={selectCls} value={get("driveType")} onChange={(e) => setParam("driveType", e.target.value)}>
            <option value="">Any drive</option>
            {DRIVE_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </Group>

      {/* Location */}
      <Group title="Location">
        <select className={selectCls} value={get("state")} onChange={(e) => setParam("state", e.target.value)}>
          <option value="">All states</option>
          {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Group>

      {/* Toggles */}
      <Group title="More options">
        <div className="space-y-1.5">
          {[
            { key: "specialOffer", label: "Special offers only" },
            { key: "tradeIn", label: "Accepts trade-in" },
          ].map((t) => (
            <label key={t.key} className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={!!get(t.key)} onChange={() => toggleBool(t.key)} className="size-4 accent-[var(--brand)]" />
              {t.label}
            </label>
          ))}
        </div>
      </Group>
    </div>
  );
}
