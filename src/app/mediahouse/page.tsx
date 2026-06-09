import type { Metadata } from "next";
import { Target, BarChart3, Users, Megaphone, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = { title: "AussieWheels MediaHouse" };

const STATS = [
  { value: "1M+", label: "in-market buyers weekly" },
  { value: "100%", label: "automotive audience" },
  { value: "1st-party", label: "intent data" },
];

const PRODUCTS = [
  { Icon: Megaphone, title: "Display advertising", body: "Premium placements across the AussieWheels network." },
  { Icon: Target, title: "Audience targeting", body: "Reach buyers by make, model, body type and budget intent." },
  { Icon: Users, title: "Brand campaigns", body: "Tell your brand story to a captive automotive audience." },
  { Icon: BarChart3, title: "Performance insights", body: "Measure reach, engagement and outcomes in real time." },
];

export default function MediaHousePage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="For brands"
        title="Reach Australia's car buyers"
        subtitle="AussieWheels MediaHouse connects automotive brands with over a million in-market buyers every week, powered by first-party intent data."
      >
        <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-primary">
          Talk to our team <ArrowRight className="size-4" />
        </button>
      </PageHero>

      <Section className="mt-12">
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-5 text-center ring-1 ring-foreground/5">
              <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-12">
        <SectionHeading title="What we offer" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <div key={p.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><p.Icon className="size-5" strokeWidth={1.75} /></span>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
