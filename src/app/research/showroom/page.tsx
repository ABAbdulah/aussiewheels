import Link from "next/link";
import type { Metadata } from "next";
import { Star, ArrowRight, Zap, Users, Wrench, Crown, Gauge, Mountain, Baby, Sparkles } from "lucide-react";
import { fetchListings, type Listing, type ListingFilters } from "@/lib/api";
import { fmtPrice } from "@/lib/format";
import { CarImage } from "@/features/listings/car-image";
import { ShowroomControls } from "@/features/showroom/showroom-controls";
import { Section } from "@/components/section";
import { BODY_TYPES } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "New car showroom",
  description: "Explore new cars from 60+ makes — compare specs, pricing and expert review scores.",
};
export const revalidate = 60;

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const LIFESTYLES = [
  { slug: "family", label: "Family", Icon: Users, filter: { bodyType: "SUV" } },
  { slug: "electric", label: "Electric", Icon: Zap, filter: { fuel: "Electric" } },
  { slug: "tradie", label: "Tradie", Icon: Wrench, filter: { bodyType: "Ute" } },
  { slug: "first-car", label: "First car", Icon: Baby, filter: { priceMax: 30000 } },
  { slug: "prestige", label: "Prestige", Icon: Crown, filter: { priceMin: 70000 } },
  { slug: "performance", label: "Performance", Icon: Gauge, filter: { bodyType: "Coupe" } },
  { slug: "hybrid", label: "Hybrid", Icon: Sparkles, filter: { fuel: "Hybrid" } },
  { slug: "offroad-4x4", label: "Off-road 4x4", Icon: Mountain, filter: { driveType: "4x4" } },
] as const;

export default async function ShowroomPage({ searchParams }: { searchParams: Promise<SP> }) {
  const raw = await searchParams;
  const lifestyle = one(raw.lifestyle);
  const lifeFilter = LIFESTYLES.find((l) => l.slug === lifestyle)?.filter ?? {};

  const filters: ListingFilters = {
    make: one(raw.make),
    bodyType: one(raw.bodyType),
    sort: one(raw.sort) ?? "featured",
    limit: 30,
    ...lifeFilter,
  };

  const [{ items, total }, topRated] = await Promise.all([
    fetchListings(filters),
    fetchListings({ sort: "featured", limit: 4 }),
  ]);

  const topRatedSorted = [...topRated.items].sort((a, b) => (b.reviewScore ?? 0) - (a.reviewScore ?? 0));
  const activeBody = one(raw.bodyType);

  const mkLink = (mutate: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(raw)) {
      const val = one(v);
      if (val) p.set(k, val);
    }
    mutate(p);
    const qs = p.toString();
    return `/research/showroom${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">New car showroom</h1>
          <p className="mt-2 max-w-xl text-primary-foreground/80">
            Explore new cars from over 60 makes — compare specs, drive-away pricing and expert
            review scores, all in one place.
          </p>
        </div>
      </section>

      {/* Lifestyle */}
      <Section className="mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {LIFESTYLES.map((l) => {
            const active = lifestyle === l.slug;
            return (
              <Link
                key={l.slug}
                href={active ? mkLink((p) => p.delete("lifestyle")) : mkLink((p) => p.set("lifestyle", l.slug))}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card hover:border-brand/40",
                )}
              >
                <l.Icon className="size-4" /> {l.label}
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Top rated */}
      <Section className="mt-8">
        <h2 className="text-lg font-bold">Top rated by our experts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topRatedSorted.map((l) => (
            <Link key={l.id} href={`/cars/${l.slug}`} className="group flex items-center gap-3 rounded-xl border bg-card p-3 ring-1 ring-foreground/5 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                <CarImage src={l.images[0]} alt={l.title} sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold group-hover:text-brand">{l.make} {l.model}</div>
                <div className="text-xs text-muted-foreground">From {fmtPrice(l.driveawayPrice ?? l.price)}</div>
              </div>
              {l.reviewScore && <ScoreBadge score={l.reviewScore} />}
            </Link>
          ))}
        </div>
      </Section>

      {/* Body type filter + controls */}
      <Section className="mt-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">{total} models {activeBody ? `· ${activeBody}` : "to explore"}</h2>
          <ShowroomControls />
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          <Link href={mkLink((p) => p.delete("bodyType"))} className={cn("rounded-full border px-3 py-1 text-xs font-medium", !activeBody ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
            All
          </Link>
          {BODY_TYPES.slice(0, 8).map((b) => (
            <Link key={b} href={mkLink((p) => p.set("bodyType", b))} className={cn("rounded-full border px-3 py-1 text-xs font-medium", activeBody === b ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
              {b}
            </Link>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed py-20 text-center text-sm text-muted-foreground">
            No models match. <Link href="/research/showroom" className="font-semibold text-brand hover:underline">Reset filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((l, i) => <ShowroomCard key={l.id} listing={l} priority={i < 3} />)}
          </div>
        )}
      </Section>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex shrink-0 flex-col items-center rounded-lg bg-primary px-2 py-1 text-primary-foreground">
      <span className="text-sm font-extrabold leading-none tnum">{score}</span>
      <span className="text-[8px] uppercase opacity-70">/ 100</span>
    </span>
  );
}

function ShowroomCard({ listing: l, priority }: { listing: Listing; priority?: boolean }) {
  return (
    <Link href={`/cars/${l.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/40">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <CarImage src={l.images[0]} alt={l.title} priority={priority} sizes="(max-width:1024px) 50vw, 380px" className="transition-transform duration-300 group-hover:scale-[1.04]" />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          {l.condition === "new" ? "Brand new" : l.condition === "demo" ? "Demo" : "New car to order"}
        </span>
        {l.reviewScore && (
          <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
            <Star className="size-2.5 fill-current" /> {l.reviewScore}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold tracking-tight group-hover:text-brand">{l.make} {l.model}</h3>
        <p className="text-xs text-muted-foreground">{l.bodyType} · {l.fuel}{l.variant ? ` · ${l.variant}` : ""}</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">From</div>
            <div className="text-lg font-bold tracking-tight tnum">{fmtPrice(l.driveawayPrice ?? l.price)}</div>
            <div className="text-[11px] text-muted-foreground">drive away</div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
