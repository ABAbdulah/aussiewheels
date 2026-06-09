import Link from "next/link";
import {
  Car, Banknote, ShieldCheck, Gauge, ArrowRight, Smartphone, Apple,
  Zap, Users, Wrench, Crown, Baby, Mountain,
} from "lucide-react";
import { fetchListings } from "@/lib/api";
import { fmtNumber } from "@/lib/format";
import { BODY_TYPES } from "@/lib/site";
import { Section, SectionHeading } from "@/components/section";
import { HeroSearch } from "@/features/search/hero-search";
import { LoanCalculator } from "@/features/finance/loan-calculator";
import { ListingCard } from "@/features/listings/listing-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const revalidate = 60;

const STATS = [
  { value: "1M+", label: "buyers / week" },
  { value: "4.5x", label: "the nearest rival" },
  { value: "3,000", label: "cars sold / week" },
  { value: "$0", label: "secure payment fees" },
];

const LIFESTYLES = [
  { label: "Family", Icon: Users, href: "/cars?bodyType=SUV" },
  { label: "Electric", Icon: Zap, href: "/cars?fuel=Electric" },
  { label: "Tradie", Icon: Wrench, href: "/cars?bodyType=Ute" },
  { label: "First car", Icon: Baby, href: "/cars?priceMax=25000" },
  { label: "Prestige", Icon: Crown, href: "/cars?priceMin=70000" },
  { label: "Off-road 4x4", Icon: Mountain, href: "/cars?driveType=4x4" },
];

export default async function HomePage() {
  const [{ items: featured }, { items: offers }] = await Promise.all([
    fetchListings({ sort: "newest", limit: 8 }),
    fetchListings({ specialOffer: true, sort: "featured", limit: 4 }),
  ]);

  return (
    <div className="flex flex-col gap-14 pb-20">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,109,164,0.55),transparent_55%)]" />
        <div className="absolute -right-20 -top-24 size-[28rem] rounded-full bg-brand/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:pt-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
              <ShieldCheck className="size-3.5" /> Australia&apos;s most trusted car marketplace
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Find your next car with confidence
            </h1>
            <p className="mt-3 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
              Search thousands of new, used and demo cars across Australia — with transparent
              price guides, trusted sellers and secure payments.
            </p>
          </div>

          <HeroSearch className="mt-7 max-w-4xl text-foreground" />

          <div className="mt-7 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                <div className="text-xs text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by body type ──────────────────────────────────────── */}
      <Section>
        <SectionHeading title="Browse by body type" href="/cars" hrefLabel="All cars" />
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {BODY_TYPES.slice(0, 12).map((b) => (
            <Link
              key={b}
              href={`/cars?bodyType=${encodeURIComponent(b)}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center ring-1 ring-foreground/5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <Car className="size-6 text-brand transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <span className="text-xs font-medium">{b}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Featured listings ────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          title="Freshly listed"
          subtitle="The latest cars added across Australia"
          href="/cars?sort=newest"
        />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 8).map((l, i) => (
            <ListingCard key={l.id} listing={l} priority={i < 4} />
          ))}
        </div>
        {featured.length === 0 && <BackendHint />}
      </Section>

      {/* ── Value my car banner ──────────────────────────────────────── */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-8 text-brand-foreground sm:px-10 sm:py-10">
          <div className="absolute -right-10 -top-10 size-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">What&apos;s your car worth?</h2>
              <p className="mt-1.5 max-w-md text-sm text-brand-foreground/85">
                Get a free, instant valuation powered by live market data — no obligation, no
                follow-up calls.
              </p>
            </div>
            <Link
              href="/valuations"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-brand shadow-sm transition-transform hover:scale-[1.02]"
            >
              Value my car <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Special offers ───────────────────────────────────────────── */}
      {offers.length > 0 && (
        <Section>
          <SectionHeading
            title="Special offers"
            subtitle="EOFY and dealer promotions ending soon"
            href="/cars?specialOffer=true"
          />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </Section>
      )}

      {/* ── Lifestyle ────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading title="Shop by lifestyle" subtitle="Find the right car for how you live" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {LIFESTYLES.map(({ label, Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-brand">
                <Icon className="size-4.5" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Finance + Sell pathways ──────────────────────────────────── */}
      <Section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeading title="Estimate your repayments" subtitle="See what a car could cost per month" />
          <LoanCalculator className="mt-5" />
        </div>
        <div>
          <SectionHeading title="Selling? Pick your path" subtitle="Three ways to sell with AussieWheels" />
          <div className="mt-5 flex flex-col gap-3">
            {[
              { title: "Create an ad", body: "Reach 1M+ buyers and maximise your sale price.", href: "/sell/create", Icon: Car },
              { title: "Instant Offer", body: "Get a firm offer and sell in as little as 24 hours.", href: "/sell/instant-offer", Icon: Banknote },
              { title: "Trade-In", body: "Trade your car as part of your next purchase.", href: "/sell/trade-in", Icon: Gauge },
            ].map(({ title, body, href, Icon }) => (
              <Link
                key={title}
                href={href}
                className="group flex items-center gap-4 rounded-xl border bg-card p-4 ring-1 ring-foreground/5 transition-all hover:border-brand/40 hover:shadow-md"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{title}</div>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ── App download ─────────────────────────────────────────────── */}
      <Section>
        <div className="overflow-hidden rounded-2xl border bg-card ring-1 ring-foreground/5">
          <div className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:justify-between sm:p-10">
            <div className="max-w-lg text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight">Take AussieWheels with you</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Save searches, get instant price-drop alerts, message sellers and manage your ads —
                all from the app.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                <span className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2 px-5")}>
                  <Apple className="size-5" /> App Store
                </span>
                <span className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2 px-5")}>
                  <Smartphone className="size-5" /> Google Play
                </span>
              </div>
            </div>
            <div className="grid size-28 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Smartphone className="size-12" strokeWidth={1.25} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function BackendHint() {
  return (
    <div className="mt-5 rounded-xl border border-dashed p-8 text-center">
      <p className="text-sm font-medium">No listings loaded</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Start the API on <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">localhost:4000</code> to see seeded cars.
      </p>
    </div>
  );
}
