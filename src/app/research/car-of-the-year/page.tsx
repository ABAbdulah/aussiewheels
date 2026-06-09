import Link from "next/link";
import type { Metadata } from "next";
import { Trophy, Award, ArrowRight } from "lucide-react";
import { fetchListings } from "@/lib/api";
import { fmtPrice } from "@/lib/format";
import { CarImage } from "@/features/listings/car-image";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Car of the Year 2026" };
export const revalidate = 60;

export default async function CarOfTheYearPage() {
  const { items } = await fetchListings({ limit: 30 });
  const ranked = items.filter((l) => l.reviewScore).sort((a, b) => (b.reviewScore ?? 0) - (a.reviewScore ?? 0));
  const winner = ranked[0];
  const finalists = ranked.slice(1, 5);

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,109,164,0.5),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/30">
            <Trophy className="size-3.5" /> AussieWheels Awards 2026
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Car of the Year</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Our experts test hundreds of cars each year. These are the very best on sale in Australia right now.
          </p>
        </div>
      </section>

      {winner && (
        <div className="mx-auto max-w-7xl px-4">
          {/* Winner */}
          <div className="-mt-8 overflow-hidden rounded-2xl border bg-card shadow-xl ring-1 ring-foreground/10">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto">
                <CarImage src={winner.images[0]} alt={winner.title} priority sizes="(max-width:1024px) 100vw, 640px" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                  <Trophy className="size-3.5" /> 2026 WINNER
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{winner.make} {winner.model}</h2>
                <p className="mt-1 text-muted-foreground">{winner.variant}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-xl bg-success text-xl font-extrabold text-success-foreground tnum">{winner.reviewScore}</span>
                  <div>
                    <div className="text-sm text-muted-foreground">Expert score / 100</div>
                    <div className="text-lg font-bold tnum">{fmtPrice(winner.price)}</div>
                  </div>
                </div>
                <Link href={`/cars/${winner.slug}`} className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground">
                  See the winner <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Finalists */}
          <h2 className="mb-5 mt-12 flex items-center gap-2 text-xl font-bold tracking-tight">
            <Award className="size-5 text-brand" /> Finalists
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {finalists.map((l) => (
              <Link key={l.id} href={`/cars/${l.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/40">
                <div className="relative aspect-video bg-muted">
                  <CarImage src={l.images[0]} alt={l.title} sizes="(max-width:1024px) 50vw, 280px" className="transition-transform duration-300 group-hover:scale-[1.04]" />
                  <span className={cn("absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground tnum")}>{l.reviewScore}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold group-hover:text-brand">{l.make} {l.model}</h3>
                  <p className="text-sm text-muted-foreground tnum">{fmtPrice(l.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
