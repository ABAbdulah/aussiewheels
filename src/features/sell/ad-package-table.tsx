import Link from "next/link";
import { Check, Minus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Cell = boolean | string;

const TIERS = [
  { key: "standard", name: "Standard", price: 49, tagline: "Get seen", highlight: false },
  { key: "premium", name: "Premium", price: 99, tagline: "Sell faster", highlight: false },
  { key: "ultimate", name: "Ultimate", price: 159, tagline: "Best value", highlight: true },
] as const;

const ROWS: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Search appearances", values: ["1× baseline", "1.7× more", "2.7× more"] },
  { label: "Views by buyers", values: ["1× baseline", "1.4× more", "2.0× more"] },
  { label: "Secure payment (Pay through AussieWheels)", values: [true, true, true] },
  { label: "Showcase near top of results", values: [false, false, true] },
  { label: "Vehicle History Snapshot on ad", values: [false, false, true] },
  { label: "Virtual phone number", values: [false, false, true] },
  { label: "Listing duration", values: ["Until sold", "Until sold", "Until sold"] },
];

function renderCell(v: Cell) {
  if (v === true) return <Check className="mx-auto size-4 text-success" />;
  if (v === false) return <Minus className="mx-auto size-4 text-muted-foreground/50" />;
  return <span className="text-sm font-medium">{v}</span>;
}

export function AdPackageTable({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card ring-1 ring-foreground/5", className)}>
      {/* Header row */}
      <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b bg-muted/40">
        <div className="hidden p-4 sm:block" />
        {TIERS.map((t) => (
          <div
            key={t.key}
            className={cn(
              "relative p-4 text-center",
              t.highlight && "bg-primary text-primary-foreground",
            )}
          >
            {t.highlight && (
              <span className="absolute left-1/2 top-2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold text-white">
                <Star className="size-2.5 fill-current" /> BEST
              </span>
            )}
            <div className={cn("text-sm font-bold", t.highlight && "mt-3")}>{t.name}</div>
            <div className={cn("text-[11px]", t.highlight ? "text-primary-foreground/75" : "text-muted-foreground")}>{t.tagline}</div>
            <div className="mt-1.5 text-xl font-extrabold tracking-tight tnum">${t.price}</div>
          </div>
        ))}
      </div>

      {/* Feature rows */}
      {ROWS.map((row, i) => (
        <div key={row.label} className={cn("grid grid-cols-[1.4fr_repeat(3,1fr)] items-center", i % 2 && "bg-muted/20")}>
          <div className="p-3 text-xs font-medium text-foreground/80 sm:text-sm">{row.label}</div>
          {row.values.map((v, idx) => (
            <div key={idx} className={cn("p-3 text-center", TIERS[idx].highlight && "bg-primary/[0.04]")}>
              {renderCell(v)}
            </div>
          ))}
        </div>
      ))}

      {/* CTA row */}
      <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] border-t bg-muted/30">
        <div className="hidden p-3 sm:block" />
        {TIERS.map((t) => (
          <div key={t.key} className={cn("p-3", t.highlight && "bg-primary/[0.04]")}>
            <Link
              href={`/sell/create?package=${t.key}`}
              className={cn(
                buttonVariants({ variant: t.highlight ? "default" : "outline" }),
                "h-9 w-full text-xs",
              )}
            >
              Select
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
