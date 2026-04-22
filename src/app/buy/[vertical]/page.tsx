import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { verticals, type VerticalSlug } from "@/lib/site";
import { fetchListings } from "@/lib/api";
import { ListingCard } from "@/features/listings/listing-card";
import { FilterSidebar } from "@/features/filters/filter-sidebar";
import { AdSlot } from "@/components/ad-slot";

const slugSet = new Set<VerticalSlug>(verticals.map((v) => v.slug));

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.slug }));
}

type RawSP = Record<string, string | string[] | undefined>;
function sp(v: string | string[] | undefined) {
  return typeof v === "string" ? v : undefined;
}

type Props = {
  params: Promise<{ vertical: string }>;
  searchParams: Promise<RawSP>;
};

const SORT_LABELS: [string, string][] = [
  ["", "Featured"],
  ["price_asc", "Price (low → high)"],
  ["price_desc", "Price (high → low)"],
  ["newest", "Newest first"],
  ["km_asc", "Lowest km"],
];

export default async function BuyVerticalPage({ params, searchParams }: Props) {
  const { vertical } = await params;
  if (!slugSet.has(vertical as VerticalSlug)) notFound();

  const raw = await searchParams;
  const make         = sp(raw["make"]);
  const model        = sp(raw["model"]);
  const body         = sp(raw["body"]);
  const state        = sp(raw["state"]);
  const condition    = sp(raw["condition"]);
  const fuel         = sp(raw["fuel"]);
  const transmission = sp(raw["transmission"]);
  const priceMinRaw  = sp(raw["priceMin"]);
  const priceMaxRaw  = sp(raw["priceMax"]);
  const yearMinRaw   = sp(raw["yearMin"]);
  const yearMaxRaw   = sp(raw["yearMax"]);
  const kmMaxRaw     = sp(raw["kmMax"]);
  const keyword      = sp(raw["keyword"]);
  const pageRaw      = sp(raw["page"]);

  const page    = Math.max(1, parseInt(pageRaw ?? "1", 10) || 1);
  const priceMin = priceMinRaw ? parseInt(priceMinRaw.replace(/\D/g, ""), 10) : undefined;
  const priceMax = priceMaxRaw ? parseInt(priceMaxRaw.replace(/\D/g, ""), 10) : undefined;
  const yearMin  = yearMinRaw  ? parseInt(yearMinRaw, 10) : undefined;
  const yearMax  = yearMaxRaw  ? parseInt(yearMaxRaw, 10) : undefined;
  const kmMax    = kmMaxRaw    ? parseInt(kmMaxRaw.replace(/\D/g, ""), 10) : undefined;

  const { items, total, totalPages } = await fetchListings({
    vertical, make, model, bodyType: body, state, condition, fuel,
    transmission, priceMin, priceMax, yearMin, yearMax, kmMax, keyword,
    page, limit: 20,
  });

  const label = verticals.find((v) => v.slug === vertical)?.label ?? vertical;

  const activeFilters: { label: string; key: string }[] = [
    ...(make         ? [{ label: make,         key: "make"         }] : []),
    ...(model        ? [{ label: model,        key: "model"        }] : []),
    ...(body         ? [{ label: body,         key: "body"         }] : []),
    ...(state        ? [{ label: state,        key: "state"        }] : []),
    ...(condition    ? [{ label: condition,    key: "condition"    }] : []),
    ...(fuel         ? [{ label: fuel,         key: "fuel"         }] : []),
    ...(transmission ? [{ label: transmission, key: "transmission" }] : []),
  ];

  function buildQuery(overrides: Record<string, string | undefined> = {}) {
    const q = new URLSearchParams();
    const base: Record<string, string | undefined> = {
      make, model, body, state, condition, fuel, transmission,
      priceMin: priceMinRaw, priceMax: priceMaxRaw,
      yearMin: yearMinRaw, yearMax: yearMaxRaw, kmMax: kmMaxRaw, keyword,
    };
    for (const [k, v] of Object.entries({ ...base, ...overrides })) {
      if (v) q.set(k, v);
    }
    return q.toString();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top leaderboard ad ── */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <AdSlot slotId="buy-top" format="leaderboard" name="Buy page top banner" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6 items-start">

          {/* ── Left sidebar ── */}
          <div className="hidden w-[240px] shrink-0 lg:block">
            <FilterSidebar />
          </div>

          {/* ── Main grid ── */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-light text-muted-foreground">
                  {total > 0 ? (
                    <><strong className="font-medium text-foreground">{total.toLocaleString("en-AU")}</strong>{" "}{label.toLowerCase()} for sale or order in Australia</>
                  ) : "No listings found"}
                </p>

                {activeFilters.length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {activeFilters.map((f) => (
                      <Link
                        key={f.key}
                        href={`?${buildQuery({ [f.key]: undefined })}`}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        {f.label} <span aria-hidden>×</span>
                      </Link>
                    ))}
                    <Link href={`/buy/${vertical}`} className="text-xs font-light text-muted-foreground hover:text-primary hover:underline">
                      Clear all
                    </Link>
                  </div>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <label htmlFor="sort" className="text-xs font-light text-muted-foreground">Sort by</label>
                <div className="relative">
                  <select id="sort" className="h-8 appearance-none rounded-lg border bg-background pl-3 pr-8 text-sm font-light">
                    {SORT_LABELS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <ChevronRight className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 rotate-90 text-muted-foreground" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Cards or empty */}
            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed py-20 text-center">
                <p className="text-base font-medium">No listings found</p>
                <p className="mt-1 text-sm font-light text-muted-foreground">
                  {activeFilters.length > 0 ? (
                    <>Try removing some filters or{" "}<Link href={`/buy/${vertical}`} className="text-primary hover:underline">clear all</Link>.</>
                  ) : (
                    <>Backend not running — start it on <code className="font-mono text-xs">localhost:4000</code>.</>
                  )}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((l) => (
                  <ListingCard
                    key={l.id}
                    id={l.id}
                    title={l.title}
                    subtitle={l.subtitle}
                    price={l.price}
                    km={l.km}
                    year={l.year}
                    transmission={l.transmission}
                    fuel={l.fuel}
                    bodyType={l.bodyType}
                    location={l.location && l.state ? `${l.location}, ${l.state}` : (l.location ?? l.state)}
                    imageUrl={l.imageUrl}
                    priceIndicator={l.priceIndicator}
                    condition={l.condition}
                    sellerType={l.sellerType}
                    driveaway
                    showActions
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3 border-t pt-6">
                {page > 1 ? (
                  <Link href={`?${buildQuery({ page: String(page - 1) })}`} className="flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-light hover:bg-muted transition-colors">
                    <ChevronLeft className="size-4" strokeWidth={1.5} /> Back
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-light opacity-40 cursor-not-allowed">
                    <ChevronLeft className="size-4" strokeWidth={1.5} /> Back
                  </span>
                )}

                <span className="text-sm font-light">
                  Page <strong className="font-semibold">{page}</strong> of <strong className="font-semibold">{totalPages.toLocaleString("en-AU")}</strong>
                </span>

                {page < totalPages ? (
                  <Link href={`?${buildQuery({ page: String(page + 1) })}`} className="flex items-center gap-1 rounded-lg border border-primary px-4 py-2 text-sm font-light text-primary hover:bg-primary/5 transition-colors">
                    Next <ChevronRight className="size-4" strokeWidth={1.5} />
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-light opacity-40 cursor-not-allowed">
                    Next <ChevronRight className="size-4" strokeWidth={1.5} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Right ad column ── */}
          <div className="hidden w-[160px] shrink-0 xl:block">
            <div className="sticky top-20 space-y-4">
              <p className="text-center text-[10px] font-light text-muted-foreground">Advertisement</p>
              <AdSlot slotId="buy-right-1" format="rectangle" name="Buy right 1" className="h-[250px]" />
              <AdSlot slotId="buy-right-2" format="rectangle" name="Buy right 2" className="h-[250px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
