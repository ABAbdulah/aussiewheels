import Link from "next/link";
import type { Metadata } from "next";
import { Search, CarFront, Tag, Wallet, FileText, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/content-page";

export const metadata: Metadata = { title: "Help centre" };

const TOPICS = [
  { Icon: Search, title: "Buying a car", body: "Searching, saving and enquiring on listings." },
  { Icon: Tag, title: "Selling a car", body: "Creating ads, packages and ad performance." },
  { Icon: Wallet, title: "Payments", body: "Using Pay through AussieWheels safely." },
  { Icon: FileText, title: "Vehicle history", body: "Reports, PPSR and what's included." },
  { Icon: MessageSquare, title: "Messaging", body: "Contacting sellers and staying safe." },
  { Icon: CarFront, title: "Inspections", body: "Booking a pre-purchase inspection." },
];

const FAQS = [
  { q: "How do I create an ad?", a: "Head to Sell → Create an ad, then follow the steps: select your vehicle, add details and photos, set a price, choose a package and publish." },
  { q: "Is Pay through AussieWheels free?", a: "Yes — there are no transaction fees for buyers or sellers. Funds are held securely until the car is handed over." },
  { q: "How accurate is the valuation tool?", a: "Valuations are estimates based on live market data and trusted pricing sources. Actual value varies with condition, options and demand." },
  { q: "What's included in a vehicle history report?", a: "A PPSR check, finance and write-off status, stolen-vehicle check, odometer check and a plain-English summary." },
  { q: "How long does my ad run?", a: "All private ad packages run until your car sells — there's no time limit." },
];

export default function HelpPage() {
  return (
    <div className="pb-20">
      <PageHero title="How can we help?" subtitle="Browse common topics or find answers to frequently asked questions.">
        <div className="relative max-w-lg">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search the help centre…" className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm text-foreground outline-none" />
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand"><t.Icon className="size-5" strokeWidth={1.75} /></span>
              <h3 className="mt-3 font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="divide-y rounded-xl border bg-card ring-1 ring-foreground/5">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="flex cursor-pointer items-center justify-between font-medium marker:content-['']">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Still need help? <Link href="/messages" className="font-semibold text-brand hover:underline">Contact our support team</Link>.
        </p>
      </div>
    </div>
  );
}
