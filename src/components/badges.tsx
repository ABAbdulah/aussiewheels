import { cn } from "@/lib/utils";
import type { PriceIndicator, Condition, SellerType } from "@/lib/api";
import { TrendingDown, Zap, Leaf, Fuel, Store, User, BadgePercent } from "lucide-react";

// ── Base pill ───────────────────────────────────────────────────────────────
export function Pill({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none whitespace-nowrap ring-1 ring-inset [&_svg]:size-3",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ── Price comparison (Great / Good / Fair / High) ────────────────────────────
const PRICE_STYLES: Record<PriceIndicator, { label: string; cls: string }> = {
  great: { label: "Great Price", cls: "bg-success/12 text-success ring-success/25" },
  good: { label: "Good Price", cls: "bg-brand/10 text-brand ring-brand/25" },
  fair: { label: "Fair Price", cls: "bg-muted text-muted-foreground ring-border" },
  high: { label: "Above Market", cls: "bg-amber-500/12 text-amber-700 ring-amber-500/25 dark:text-amber-400" },
};

export function PriceComparisonBadge({
  indicator,
  className,
}: {
  indicator: PriceIndicator;
  className?: string;
}) {
  const s = PRICE_STYLES[indicator];
  return (
    <Pill className={cn(s.cls, className)} title="Algorithmic price guide based on comparable listings">
      <TrendingDown />
      {s.label}
    </Pill>
  );
}

// ── Fuel type ────────────────────────────────────────────────────────────────
export function FuelTypeBadge({ fuel, className }: { fuel: string; className?: string }) {
  const f = fuel.toLowerCase();
  let cls = "bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-300";
  let Icon = Fuel;
  if (f === "electric") {
    cls = "bg-emerald-500/12 text-emerald-700 ring-emerald-500/25 dark:text-emerald-400";
    Icon = Zap;
  } else if (f.includes("hybrid")) {
    cls = "bg-teal-500/12 text-teal-700 ring-teal-500/25 dark:text-teal-400";
    Icon = Leaf;
  } else if (f === "diesel") {
    cls = "bg-zinc-500/10 text-zinc-700 ring-zinc-500/20 dark:text-zinc-300";
  }
  return (
    <Pill className={cn(cls, className)}>
      <Icon />
      {fuel}
    </Pill>
  );
}

// ── Seller type ──────────────────────────────────────────────────────────────
export function SellerTypeBadge({ seller, className }: { seller: SellerType; className?: string }) {
  return seller === "dealer" ? (
    <Pill className={cn("bg-brand/10 text-brand ring-brand/25", className)}>
      <Store />
      Dealer
    </Pill>
  ) : (
    <Pill className={cn("bg-muted text-foreground/70 ring-border", className)}>
      <User />
      Private
    </Pill>
  );
}

// ── Condition ────────────────────────────────────────────────────────────────
const CONDITION_STYLES: Record<Condition, { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-primary text-primary-foreground ring-transparent" },
  demo: { label: "Demo", cls: "bg-amber-500 text-white ring-transparent" },
  used: { label: "Used", cls: "bg-card text-foreground/70 ring-border" },
};

export function ConditionBadge({ condition, className }: { condition: Condition; className?: string }) {
  const s = CONDITION_STYLES[condition];
  return <Pill className={cn(s.cls, className)}>{s.label}</Pill>;
}

// ── Special offer ────────────────────────────────────────────────────────────
export function SpecialOfferBadge({ className }: { className?: string }) {
  return (
    <Pill className={cn("bg-amber-500 text-white ring-transparent", className)}>
      <BadgePercent />
      Special Offer
    </Pill>
  );
}
