import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { fetchListings } from "@/lib/api";
import { fmtPrice } from "@/lib/format";
import { PageHero } from "@/components/content-page";
import { CarImage } from "@/features/listings/car-image";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Expert car reviews" };
export const revalidate = 60;

const verdict = (s: number) =>
  s >= 90 ? "Outstanding — a class benchmark" : s >= 85 ? "Excellent all-rounder" : s >= 80 ? "Highly competitive" : s >= 75 ? "Solid and likeable" : "Worth a look";

const scoreColour = (s: number) =>
  s >= 85 ? "bg-success text-success-foreground" : s >= 78 ? "bg-brand text-brand-foreground" : "bg-amber-500 text-white";

export default async function ReviewsPage() {
  const { items } = await fetchListings({ limit: 30 });
  const reviewed = items.filter((l) => l.reviewScore).sort((a, b) => (b.reviewScore ?? 0) - (a.reviewScore ?? 0));

  return (
    <div className="pb-20">
      <PageHero eyebrow="Research" title="Expert car reviews" subtitle="Every car scored out of 100 by our expert team across performance, value, practicality and safety." />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviewed.map((l, i) => (
            <Link key={l.id} href={`/cars/${l.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/40">
              <div className="relative aspect-video bg-muted">
                <CarImage src={l.images[0]} alt={l.title} priority={i < 3} sizes="(max-width:1024px) 50vw, 380px" className="transition-transform duration-300 group-hover:scale-[1.04]" />
                <span className={cn("absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-xl text-base font-extrabold tnum shadow", scoreColour(l.reviewScore!))}>
                  {l.reviewScore}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-bold tracking-tight group-hover:text-brand">{l.make} {l.model} {l.variant ?? ""}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{verdict(l.reviewScore!)}</p>
                <div className="mt-3 flex items-center justify-between border-t pt-2.5 text-sm">
                  <span className="font-semibold tnum">{fmtPrice(l.price)}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand">Read review <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
