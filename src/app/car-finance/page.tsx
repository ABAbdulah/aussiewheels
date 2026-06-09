import type { Metadata } from "next";
import { Percent, Clock, ShieldCheck, FileText } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { LoanCalculator } from "@/features/finance/loan-calculator";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = { title: "Car finance" };

const FEATURES = [
  { Icon: Percent, title: "Competitive rates", body: "Compare rates from a panel of trusted lenders." },
  { Icon: Clock, title: "Fast pre-approval", body: "Know your budget before you start shopping." },
  { Icon: ShieldCheck, title: "No impact to browse", body: "Estimate repayments without affecting your credit score." },
  { Icon: FileText, title: "Clear, upfront terms", body: "No hidden fees — see the full cost before you commit." },
];

export default function CarFinancePage() {
  return (
    <div className="pb-20">
      <PageHero eyebrow="Buy" title="Car finance made simple" subtitle="Estimate your repayments and get pre-approved, so you can shop with a clear budget and real buying power." />

      <Section className="-mt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><f.Icon className="size-5" strokeWidth={1.75} /></span>
                <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
          <LoanCalculator />
        </div>
      </Section>

      <Section className="mt-14">
        <SectionHeading title="Good to know" />
        <div className="mt-4 rounded-xl border bg-card p-6 ring-1 ring-foreground/5 text-sm leading-relaxed text-muted-foreground">
          <p>The repayment calculator is for illustrative purposes only and does not constitute an offer of credit or pre-qualification. Estimates are based on standard assumptions and the inputs you provide. Information is general in nature and should not be relied upon as financial advice. Finance is provided in partnership with third-party lenders; lending criteria, fees and charges apply.</p>
        </div>
      </Section>
    </div>
  );
}
