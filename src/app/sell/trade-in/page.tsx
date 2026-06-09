import Link from "next/link";
import type { Metadata } from "next";
import { Repeat, Search, FileCheck, Car, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { Section, SectionHeading } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Trade-In" };

const STEPS = [
  { Icon: Search, title: "Find an eligible car", body: "Browse listings that accept an AussieWheels trade-in." },
  { Icon: Car, title: "Value your current car", body: "Get an instant trade-in estimate to bring to the deal." },
  { Icon: Repeat, title: "Combine sale & purchase", body: "Trade your car in as part of buying your next one." },
  { Icon: FileCheck, title: "Simple paperwork", body: "The dealer handles the changeover and the admin." },
];

export default function TradeInPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Sell · New"
        breadcrumb={[{ label: "Sell", href: "/sell" }, { label: "Trade-In" }]}
        title="Trade in your car as you buy your next one"
        subtitle="Roll your old car into your new purchase. Find dealers who accept an AussieWheels trade-in and keep it all in one easy deal."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/cars?tradeIn=true" className={cn(buttonVariants({ variant: "default" }), "h-11 bg-white px-6 text-primary hover:bg-white/90")}>
            Browse trade-in eligible cars <ArrowRight className="size-4" />
          </Link>
          <Link href="/valuations" className={cn(buttonVariants({ variant: "outline" }), "h-11 border-white/30 bg-white/10 px-6 text-white hover:bg-white/20")}>
            Value my car
          </Link>
        </div>
      </PageHero>

      <Section className="mt-14">
        <SectionHeading title="How trade-in works" subtitle="A simpler way to upgrade" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><s.Icon className="size-5" strokeWidth={1.75} /></span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-12">
        <div className="rounded-2xl bg-brand px-6 py-8 text-brand-foreground sm:px-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Ready to find your next car?</h2>
              <p className="mt-1 text-sm text-brand-foreground/85">Filter to cars where the dealer accepts an AussieWheels trade-in.</p>
            </div>
            <Link href="/cars?tradeIn=true" className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-brand">
              See eligible cars <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
