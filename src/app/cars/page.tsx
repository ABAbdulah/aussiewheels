import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, X, SearchX } from "lucide-react";
import { fetchListings, fetchFacets, type ListingFilters } from "@/lib/api";
import { fmtNumber } from "@/lib/format";
import { ListingCard } from "@/features/listings/listing-card";
import { SearchFilters } from "@/features/filters/search-filters";
import { SortSelect, MobileFilters } from "@/features/filters/cars-controls";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Cars for sale" };
export const revalidate = 30;

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | string[] | undefined) => {
  const s = one(v);
  if (!s) return undefined;
  const n = parseInt(s.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : undefined;
};

const FILTER_LABELS: Record<string, string> = {
  make: "Make", model: "Model", condition: "Condition", sellerType: "Seller",
  transmission: "Transmission", driveType: "Drive", state: "State", keyword: "Search",
};

export default async function CarsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const raw = await searchParams;
  const page = Math.max(1, num(raw.page) ?? 1);

  const filters: ListingFilters = {
    make: one(raw.make),
    model: one(raw.model),
    bodyType: one(raw.bodyType),
    fuel: one(raw.fuel),
    transmission: one(raw.transmission),
    driveType: one(raw.driveType),
    state: one(raw.state),
    sellerType: one(raw.sellerType),
    condition: one(raw.condition),
    priceMin: num(raw.priceMin),
    priceMax: num(raw.priceMax),
    yearMin: num(raw.yearMin),
    yearMax: num(raw.yearMax),
    kmMax: num(raw.kmMax),
    specialOffer: one(raw.specialOffer) === "true",
    tradeIn: one(raw.tradeIn) === "true",
    keyword: one(raw.keyword),
    sort: one(raw.sort),
    page,
    limit: 12,
  };

  const [{ items, total, totalPages }, facets] = await Promise.all([
    fetchListings(filters),
    fetchFacets(),
  ]);

  // Active filter chips
  const chips: { label: string; removeHref: string }[] = [];
  const mkUrl = (mutate: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(raw)) {
      const val = one(v);
      if (val && k !== "page") p.set(k, val);
    }
    mutate(p);
    const qs = p.toString();
    return `/cars${qs ? `?${qs}` : ""}`;
  };
  for (const [key, label] of Object.entries(FILTER_LABELS)) {
    const val = one(raw[key]);
    if (val) chips.push({ label: `${label}: ${val}`, removeHref: mkUrl((p) => p.delete(key)) });
  }
  for (const key of ["bodyType", "fuel"] as const) {
    (one(raw[key]) ?? "").split(",").filter(Boolean).forEach((v) => {
      chips.push({
        label: v,
        removeHref: mkUrl((p) => {
          const rest = (one(raw[key]) ?? "").split(",").filter((x) => x && x !== v);
          if (rest.length) p.set(key, rest.join(","));
          else p.delete(key);
        }),
      });
    });
  }
  if (filters.specialOffer) chips.push({ label: "Special offers", removeHref: mkUrl((p) => p.delete("specialOffer")) });
  if (filters.tradeIn) chips.push({ label: "Trade-in", removeHref: mkUrl((p) => p.delete("tradeIn")) });
  if (filters.priceMin || filters.priceMax)
    chips.push({
      label: `$${(filters.priceMin ?? 0).toLocaleString("en-AU")} – ${filters.priceMax ? "$" + filters.priceMax.toLocaleString("en-AU") : "any"}`,
      removeHref: mkUrl((p) => { p.delete("priceMin"); p.delete("priceMax"); }),
    });

  const pageUrl = (n: number) => mkUrl((p) => p.set("page", String(n)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Heading */}
      <div className="mb-4">
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-brand">Home</Link> <span className="px-1">/</span> Cars for sale
        </nav>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          {total > 0 ? <>{fmtNumber(total)} cars for sale</> : "Cars for sale"}
          {filters.keyword && <span className="text-muted-foreground"> for “{filters.keyword}”</span>}
        </h1>
      </div>

      <div className="flex items-start gap-6">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-20 hidden w-[266px] shrink-0 self-start rounded-xl border bg-card p-4 ring-1 ring-foreground/5 lg:block">
          <SearchFilters facets={facets} />
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MobileFilters facets={facets} />
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Showing <strong className="font-semibold text-foreground">{items.length}</strong> of {fmtNumber(total)}
              </span>
            </div>
            <SortSelect />
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              {chips.map((c) => (
                <Link
                  key={c.label}
                  href={c.removeHref}
                  className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand transition-colors hover:bg-brand/20"
                >
                  {c.label} <X className="size-3" />
                </Link>
              ))}
              <Link href="/cars" className="ml-1 text-xs font-medium text-muted-foreground hover:text-brand hover:underline">
                Clear all
              </Link>
            </div>
          )}

          {/* Grid / empty */}
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed py-24 text-center">
              <SearchX className="mx-auto size-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="mt-3 text-base font-semibold">No cars match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening your filters or clearing them.</p>
              <Link href="/cars" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((l, i) => (
                <ListingCard key={l.id} listing={l} priority={i < 3} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3 border-t pt-6">
              <PageLink href={pageUrl(page - 1)} disabled={page <= 1}>
                <ChevronLeft className="size-4" /> Prev
              </PageLink>
              <span className="text-sm">
                Page <strong className="font-semibold">{page}</strong> of {totalPages}
              </span>
              <PageLink href={pageUrl(page + 1)} disabled={page >= totalPages} primary>
                Next <ChevronRight className="size-4" />
              </PageLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PageLink({
  href, disabled, primary, children,
}: {
  href: string; disabled?: boolean; primary?: boolean; children: React.ReactNode;
}) {
  if (disabled)
    return (
      <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border px-4 py-2 text-sm opacity-40">
        {children}
      </span>
    );
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        primary ? "border-brand text-brand hover:bg-brand/5" : "hover:bg-muted",
      )}
    >
      {children}
    </Link>
  );
}
