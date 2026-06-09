import type { Metadata } from "next";
import { Clock, ThumbsUp, FileX, HandCoins, Banknote } from "lucide-react";
import { PageHero } from "@/components/content-page";
import { InstantOfferForm } from "@/features/sell/instant-offer-form";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = { title: "Instant Offer — sell your car in 24 hours" };

const CLAIMS = [
  { Icon: Clock, title: "Sell in 24 hours", body: "Accept your offer and a dealer handles the rest — fast." },
  { Icon: ThumbsUp, title: "Beats trade-in 83% of the time", body: "Our offers regularly beat what dealers offer at trade-in." },
  { Icon: FileX, title: "No roadworthy needed", body: "No ad to write, no photos, no haggling, no prep." },
  { Icon: Banknote, title: "Paid next business day", body: "Funds typically land the next business day after inspection." },
];

const STEPS = [
  { n: 1, title: "Enter your details", body: "Get a free, guaranteed offer online in under a minute." },
  { n: 2, title: "Accept your offer", body: "We connect you with an accredited local dealer." },
  { n: 3, title: "Quick inspection", body: "The dealer confirms the car's condition at a time that suits you." },
  { n: 4, title: "Get paid", body: "Paperwork is handled and you're paid next business day." },
];

export default function InstantOfferPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Sell"
        breadcrumb={[{ label: "Sell", href: "/sell" }, { label: "Instant Offer" }]}
        title="Sell your car in as little as 24 hours"
        subtitle="Skip the ad and the haggling. Get a guaranteed offer from an accredited dealer and get paid fast."
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
          <div className="hidden sm:block" />
        </div>
      </PageHero>

      <Section className="-mt-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <InstantOfferForm />
          <div className="grid gap-3 sm:grid-cols-2">
            {CLAIMS.map((c) => (
              <div key={c.title} className="rounded-xl border bg-card p-4 ring-1 ring-foreground/5">
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><c.Icon className="size-5" strokeWidth={1.75} /></span>
                <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="mt-14">
        <SectionHeading title="How Instant Offer works" subtitle="Four simple steps from quote to cash" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{s.n}</span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <HandCoins className="size-3.5" /> One fixed offer, no haggling. Offer factors in reconditioning, dealer costs and resale value. T&amp;Cs apply.
        </p>
      </Section>
    </div>
  );
}
