import type { Metadata } from "next";
import { Wallet, ShieldCheck, BadgeCheck, RefreshCcw, DollarSign, Zap } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = { title: "Pay through AussieWheels" };

const BUYER = [
  "Make an offer (with an optional deposit)",
  "Add funds securely to your AussieWheels wallet",
  "Release the funds to the seller at pick-up",
];
const SELLER = [
  "Request payment from your buyer",
  "See the funds secured in the wallet before you hand over the keys",
  "Money lands in your bank account, usually within seconds",
];

const TRUST = [
  { Icon: BadgeCheck, title: "ID verified", body: "Both parties verify a government-issued ID before paying." },
  { Icon: Wallet, title: "Funds held securely", body: "Money is held in the wallet until the car is handed over." },
  { Icon: RefreshCcw, title: "Cancel anytime", body: "Cancel before release for an immediate, full refund." },
  { Icon: DollarSign, title: "$0 fees", body: "Free for both buyer and seller — no transaction fees." },
];

export default function PaymentsPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Trust & safety"
        title="Pay through AussieWheels"
        subtitle="A secure, in-platform way to pay for a private car sale. Funds are protected until the car changes hands — with $0 fees for everyone."
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
          <Zap className="size-4" /> Over $250M in secure transactions processed
        </div>
      </PageHero>

      <Section className="mt-12">
        <SectionHeading title="How it works" subtitle="Simple and secure for both sides" />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {[{ title: "For buyers", steps: BUYER }, { title: "For sellers", steps: SELLER }].map((col) => (
            <div key={col.title} className="rounded-2xl border bg-card p-6 ring-1 ring-foreground/5">
              <h3 className="font-bold">{col.title}</h3>
              <ol className="mt-4 space-y-3">
                {col.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                    <span className="text-sm text-foreground/80">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><t.Icon className="size-5" strokeWidth={1.75} /></span>
              <h3 className="mt-3 text-sm font-semibold">{t.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" /> Cars over $100,000 are currently excluded from Pay through AussieWheels. T&amp;Cs apply.
        </p>
      </Section>
    </div>
  );
}
