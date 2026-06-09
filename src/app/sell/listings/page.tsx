import Link from "next/link";
import type { Metadata } from "next";
import { Eye, MessageSquare, Heart, Plus, Pencil, RefreshCw, TrendingUp } from "lucide-react";
import { fetchListings } from "@/lib/api";
import { fmtPrice, fmtNumber } from "@/lib/format";
import { CarImage } from "@/features/listings/car-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage my ads" };
export const revalidate = 60;

export default async function ManageListingsPage() {
  // Demo: treat the first few listings as "your" ads with simulated stats.
  const { items } = await fetchListings({ sort: "newest", limit: 3 });
  const ads = items.map((l, i) => ({
    listing: l,
    status: i === 2 ? "Draft" : "Live",
    views: [1284, 642, 0][i] ?? 200,
    enquiries: [9, 3, 0][i] ?? 1,
    saves: [21, 7, 0][i] ?? 2,
    rating: [92, 78, 40][i] ?? 70,
  }));

  const totals = ads.reduce((a, x) => ({ views: a.views + x.views, enquiries: a.enquiries + x.enquiries, saves: a.saves + x.saves }), { views: 0, enquiries: 0, saves: 0 });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage my ads</h1>
          <p className="text-sm text-muted-foreground">Track performance and keep your listings fresh.</p>
        </div>
        <Link href="/sell/create" className={cn(buttonVariants({ variant: "default" }), "h-10 gap-1.5")}>
          <Plus className="size-4" /> New ad
        </Link>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Total views", value: fmtNumber(totals.views), Icon: Eye },
          { label: "Enquiries", value: fmtNumber(totals.enquiries), Icon: MessageSquare },
          { label: "Saves", value: fmtNumber(totals.saves), Icon: Heart },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 ring-1 ring-foreground/5">
            <s.Icon className="size-4 text-brand" />
            <div className="mt-2 text-2xl font-bold tnum">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ads */}
      <div className="mt-6 space-y-4">
        {ads.map((ad) => (
          <div key={ad.listing.id} className="overflow-hidden rounded-xl border bg-card ring-1 ring-foreground/5">
            <div className="flex flex-col gap-4 p-4 sm:flex-row">
              <Link href={`/cars/${ad.listing.slug}`} className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-44">
                <CarImage src={ad.listing.images[0]} alt={ad.listing.title} sizes="176px" />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/cars/${ad.listing.slug}`} className="font-semibold hover:text-brand">{ad.listing.title}</Link>
                    <div className="text-lg font-bold tnum">{fmtPrice(ad.listing.price)}</div>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", ad.status === "Live" ? "bg-success/12 text-success" : "bg-muted text-muted-foreground")}>
                    {ad.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Eye className="size-3.5" /> {fmtNumber(ad.views)} views</span>
                  <span className="inline-flex items-center gap-1"><MessageSquare className="size-3.5" /> {ad.enquiries} enquiries</span>
                  <span className="inline-flex items-center gap-1"><Heart className="size-3.5" /> {ad.saves} saves</span>
                  <span className="inline-flex items-center gap-1"><TrendingUp className="size-3.5" /> Ad rating {ad.rating}/100</span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-1.5")}><Pencil className="size-3.5" /> Edit</button>
                  <button className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-1.5")}><RefreshCw className="size-3.5" /> Refresh</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
