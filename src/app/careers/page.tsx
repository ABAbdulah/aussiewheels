import type { Metadata } from "next";
import { Heart, Rocket, Users, Coffee, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = { title: "Careers" };

const VALUES = [
  { Icon: Rocket, title: "Move fast", body: "We ship, learn and improve — every single week." },
  { Icon: Users, title: "Customer first", body: "Every decision starts with our buyers and sellers." },
  { Icon: Heart, title: "Own it", body: "Take responsibility and see things through." },
  { Icon: Coffee, title: "Have fun", body: "We take the work seriously, not ourselves." },
];

const ROLES = [
  { title: "Senior Full-Stack Engineer", team: "Engineering", location: "Melbourne / Remote" },
  { title: "Product Designer", team: "Design", location: "Sydney / Remote" },
  { title: "Data Scientist — Pricing", team: "Data", location: "Melbourne" },
  { title: "Account Manager — Dealer", team: "Sales", location: "Brisbane" },
  { title: "Trust & Safety Specialist", team: "Operations", location: "Remote (AU)" },
];

export default function CareersPage() {
  return (
    <div className="pb-20">
      <PageHero eyebrow="Company" title="Build the future of car buying" subtitle="Join a team that's making one of life's biggest purchases simpler, fairer and safer for millions of Australians." />

      <Section className="mt-12">
        <SectionHeading title="How we work" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><v.Icon className="size-5" strokeWidth={1.75} /></span>
              <h3 className="mt-3 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-14">
        <SectionHeading title="Open roles" subtitle="We're always looking for great people" />
        <div className="mt-6 divide-y rounded-xl border bg-card ring-1 ring-foreground/5">
          {ROLES.map((r) => (
            <div key={r.title} className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.team} · {r.location}</div>
              </div>
              <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">Apply <ArrowRight className="size-3.5" /></button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
