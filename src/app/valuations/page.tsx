import type { Metadata } from "next";
import { Database, ShieldCheck, PhoneOff, Gauge, BadgeCheck } from "lucide-react";
import { ValuationWidget } from "@/features/valuation/valuation-widget";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Value my car — free car valuation",
  description: "Get a free, instant valuation of your car powered by live market data and RedBook. No obligation, no follow-up calls.",
};

const STEPS = [
  { n: 1, title: "Tell us about your car", body: "Enter your make, model, year and odometer." },
  { n: 2, title: "We crunch the data", body: "We compare live listings and trusted pricing data." },
  { n: 3, title: "Get your value range", body: "See a fair price range and what to do next." },
];

const TRUST = [
  { Icon: PhoneOff, title: "No follow-up calls", body: "Your details stay private — no strings attached." },
  { Icon: Database, title: "Live market data", body: "Powered by thousands of real AussieWheels listings." },
  { Icon: BadgeCheck, title: "Free, always", body: "No hidden fees and no obligation to sell." },
];

export default function ValuationsPage() {
  return (
    <div className="pb-20">
      {/* Hero + widget */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(46,109,164,0.5),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
              <Gauge className="size-3.5" /> Free instant valuation
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              What&apos;s your car really worth?
            </h1>
            <p className="mt-3 max-w-md text-base text-primary-foreground/80 sm:text-lg">
              Get an instant, data-backed valuation in seconds — whether you&apos;re selling, buying
              or trading in. No obligation, no follow-up calls.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              {["Selling value", "Buying check", "Trade-in estimate"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-primary-foreground/85">
                  <ShieldCheck className="size-4" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="text-foreground">
            <ValuationWidget />
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section className="mt-14">
        <SectionHeading title="How it works" subtitle="Three simple steps to your car's value" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border bg-card p-6 ring-1 ring-foreground/5">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{s.n}</span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section className="mt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3 rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-brand">
                <t.Icon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Valuations are estimates only, based on market data and RedBook pricing. Actual value may
          vary with condition, options and demand.
        </p>
      </Section>
    </div>
  );
}
