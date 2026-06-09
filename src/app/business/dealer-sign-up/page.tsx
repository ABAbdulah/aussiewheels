"use client";

import { Building2, TrendingUp, Boxes, FileBarChart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/content-page";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { AU_STATES } from "@/lib/site";

const inputCls = "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";

const BENEFITS = [
  { Icon: TrendingUp, title: "More leads", body: "Reach 1M+ in-market buyers every week." },
  { Icon: Boxes, title: "AutoGate platform", body: "Manage your inventory and listings in one place." },
  { Icon: FileBarChart, title: "Market insights", body: "Price competitively with live market data." },
  { Icon: Building2, title: "CarFacts reports", body: "Buy and publish history reports in bulk." },
];

export default function DealerSignUpPage() {
  return (
    <div className="pb-20">
      <PageHero eyebrow="For dealers" title="Grow your dealership with AussieWheels" subtitle="List your stock in front of Australia's largest car-buying audience and manage it all with AutoGate." />

      <Section className="-mt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Benefits */}
          <div className="grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><b.Icon className="size-5" strokeWidth={1.75} /></span>
                <h3 className="mt-3 text-sm font-semibold">{b.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-2xl border bg-card p-6 ring-1 ring-foreground/5 sm:p-8">
            <h2 className="text-lg font-bold">Request a callback</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tell us about your dealership and we'll be in touch.</p>
            <form
              className="mt-5 grid gap-3 sm:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); toast.success("Request received", { description: "Our dealer team will contact you shortly." }); }}
            >
              <input className={inputCls} placeholder="Dealership name" required />
              <input className={inputCls} placeholder="Contact name" required />
              <input className={inputCls} type="email" placeholder="Email" required />
              <input className={inputCls} placeholder="Phone" />
              <select className={`${inputCls} appearance-none`} defaultValue="" required>
                <option value="" disabled>State</option>
                {AU_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <input className={inputCls} inputMode="numeric" placeholder="Approx. stock size" />
              <Button type="submit" className="h-11 sm:col-span-2">Request a callback</Button>
            </form>
            <ul className="mt-4 space-y-1.5">
              {["No lock-in trial", "Dedicated account manager", "Free onboarding"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="size-3.5 text-success" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
