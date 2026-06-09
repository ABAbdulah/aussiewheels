import type { Metadata } from "next";
import { Star, Gift } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { OWNER_REVIEWS } from "@/features/research/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Owner reviews" };

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-4", i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} />
      ))}
    </div>
  );
}

export default function OwnerReviewsPage() {
  const avg = (OWNER_REVIEWS.reduce((s, r) => s + r.rating, 0) / OWNER_REVIEWS.length).toFixed(1);
  return (
    <div className="pb-20">
      <PageHero eyebrow="Research" title="Owner reviews" subtitle="Real reviews from verified owners — the honest word on living with the cars you're considering.">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold">{avg} average from {OWNER_REVIEWS.length} reviews</span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><Gift className="size-5" /></span>
            <div>
              <p className="text-sm font-semibold">Review your car and go in the draw</p>
              <p className="text-xs text-muted-foreground">Submit an owner review for your chance to win a $100 gift card. T&amp;Cs apply.</p>
            </div>
          </div>
          <button className="h-9 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Write a review</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {OWNER_REVIEWS.map((r) => (
            <article key={r.id} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <h3 className="mt-2 font-bold">{r.title}</h3>
              <p className="mt-1.5 text-sm text-foreground/80">{r.body}</p>
              <div className="mt-3 border-t pt-2.5 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">{r.name}</span> · owner of a {r.car}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
