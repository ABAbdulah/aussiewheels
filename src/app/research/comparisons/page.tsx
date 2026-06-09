import Link from "next/link";
import type { Metadata } from "next";
import { Swords, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { CarImage } from "@/features/listings/car-image";
import { COMPARISONS } from "@/features/research/content";

export const metadata: Metadata = { title: "Car comparisons" };

export default function ComparisonsPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Research"
        title="Car comparisons"
        subtitle="Head-to-head reviews of the cars Australians are cross-shopping — with a clear verdict every time."
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {COMPARISONS.map((c) => (
            <article key={c.slug} className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
              <div className="relative aspect-[21/9] bg-muted">
                <CarImage src={c.image} alt={c.title} sizes="(max-width:1024px) 100vw, 560px" />
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="flex items-end bg-gradient-to-t from-black/60 to-transparent p-3"><span className="text-sm font-bold text-white">{c.a}</span></div>
                  <div className="flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-3"><span className="text-right text-sm font-bold text-white">{c.b}</span></div>
                </div>
                <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                  <Swords className="size-4" />
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold tracking-tight">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground"><span className="font-semibold text-foreground/80">Verdict: </span>{c.verdict}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{c.author} · {c.date}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand">Read comparison <ArrowRight className="size-3.5" /></span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Looking to buy? <Link href="/cars" className="font-semibold text-brand hover:underline">Browse all cars for sale</Link>
        </p>
      </div>
    </div>
  );
}
