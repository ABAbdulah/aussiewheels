import type { Metadata } from "next";
import { Wrench, ClipboardCheck, CarFront, FileText, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/content-page";
import { Section, SectionHeading } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Car inspections" };

const CHECKS = [
  "Engine (OBD scan) & fluids", "Transmission & gearbox", "Brakes, pads & suspension",
  "Tyres & wheels", "Windscreen, lights & electrics", "Underbody & exhaust",
  "Accident / hail / flood damage", "Paint depth & cosmetic condition", "Full road test",
];

const STEPS = [
  { Icon: ClipboardCheck, title: "Book online", body: "Choose your car and a time that suits the seller." },
  { Icon: CarFront, title: "Expert inspection", body: "A qualified RedBook-style inspector assesses the car in person." },
  { Icon: FileText, title: "Digital report in 24h", body: "Get a detailed report with photos and a CarFacts history check." },
];

export default function InspectionsPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Buy"
        title="Buy with confidence — get it inspected"
        subtitle="A qualified third-party inspection gives you an independent, expert assessment before you buy. Ideal for interstate purchases."
      >
        <Link href="/cars" className={cn(buttonVariants({ variant: "default" }), "h-11 bg-white px-6 text-primary hover:bg-white/90")}>
          Book an inspection <ArrowRight className="size-4" />
        </Link>
      </PageHero>

      <Section className="mt-12">
        <SectionHeading title="What gets checked" subtitle="A comprehensive 100+ point inspection" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((c) => (
            <div key={c} className="flex items-center gap-2.5 rounded-xl border bg-card p-3.5 ring-1 ring-foreground/5">
              <Wrench className="size-4 shrink-0 text-brand" />
              <span className="text-sm">{c}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-14">
        <SectionHeading title="How it works" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><s.Icon className="size-5" strokeWidth={1.75} /></span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> Reports are typically delivered within 24 hours of inspection.
        </p>
      </Section>
    </div>
  );
}
