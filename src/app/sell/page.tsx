import Link from "next/link";
import type { Metadata } from "next";
import {
  Car, Banknote, Repeat, ArrowRight, Clock, CheckCircle2, ShieldCheck,
  EyeOff, Phone, MessageSquareWarning, Camera,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { AdPackageTable } from "@/features/sell/ad-package-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Sell my car" };

const STATS = [
  { value: "1M+", label: "buyers every week" },
  { value: "4.5×", label: "the nearest rival" },
  { value: "3,000", label: "cars sold weekly" },
  { value: "7,388+", label: "5-star reviews" },
];

const PATHWAYS = [
  {
    key: "create", Icon: Car, name: "Create an ad", href: "/sell/create",
    blurb: "List your car yourself and reach over a million buyers. The best way to maximise your sale price.",
    points: ["Reach 1M+ buyers", "Live pricing guidance", "Runs until sold"],
    cta: "Create an ad", featured: true,
  },
  {
    key: "instant", Icon: Banknote, name: "Instant Offer", href: "/sell/instant-offer",
    blurb: "Get a firm offer from an accredited dealer and sell in as little as 24 hours — no ad, no haggling.",
    points: ["Sell in 24 hours", "Beats trade-in 83% of the time", "Paid next business day"],
    cta: "Get an Instant Offer", featured: false,
  },
  {
    key: "trade", Icon: Repeat, name: "Trade-In", href: "/sell/trade-in",
    blurb: "Trade your current car as part of buying your next one. Find dealers who accept AussieWheels trade-ins.",
    points: ["Combine sale & purchase", "Eligible dealer network", "Simple paperwork"],
    cta: "Start a trade-in", featured: false, badge: "New",
  },
];

const GUIDES = [
  { title: "What you need to know when selling", body: "Paperwork, pricing and how to attract serious buyers.", href: "/research/advice" },
  { title: "How to write a compelling car ad", body: "Make your listing stand out and sell faster.", href: "/research/advice" },
  { title: "Tips for taking great photos", body: "8 simple tips to make your car look its best.", href: "/research/advice" },
];

const SAFETY = [
  { Icon: EyeOff, title: "Plate blurring", body: "Number plates are automatically blurred in photos." },
  { Icon: Phone, title: "Virtual phone number", body: "Hide your real mobile behind a private number." },
  { Icon: MessageSquareWarning, title: "Secure messaging", body: "Spam and scam messages are blocked for you." },
  { Icon: ShieldCheck, title: "7-day Trust & Safety", body: "A dedicated team is here every day of the week." },
];

export default function SellHubPage() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(46,109,164,0.5),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Sell your car, your way</h1>
            <p className="mt-3 max-w-lg text-base text-primary-foreground/80 sm:text-lg">
              Three ways to sell — list it yourself, take an instant offer, or trade it in. Whatever
              you choose, you&apos;re backed by Australia&apos;s most trusted marketplace.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sell/create" className={cn(buttonVariants({ variant: "default" }), "h-11 bg-white px-6 text-primary hover:bg-white/90")}>
                Create an ad <ArrowRight className="size-4" />
              </Link>
              <Link href="/valuations" className={cn(buttonVariants({ variant: "outline" }), "h-11 border-white/30 bg-white/10 px-6 text-white hover:bg-white/20")}>
                Value my car first
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-12">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</div>
                <div className="text-xs text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <Section className="mt-12">
        <SectionHeading title="Choose your selling path" subtitle="Pick the option that suits you best" />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {PATHWAYS.map((p) => (
            <div
              key={p.key}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 ring-1 transition-all hover:-translate-y-0.5 hover:shadow-lg",
                p.featured ? "ring-2 ring-brand" : "ring-foreground/5",
              )}
            >
              {p.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">{p.badge}</span>
              )}
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <p.Icon className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.blurb}</p>
              <ul className="mt-4 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-success" /> {pt}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={cn(buttonVariants({ variant: p.featured ? "default" : "outline" }), "mt-5 h-10 w-full")}
              >
                {p.cta} <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Packages */}
      <Section className="mt-14">
        <SectionHeading title="Private ad packages" subtitle="Upgrade for more visibility — every ad runs until sold" />
        <AdPackageTable className="mt-6" />
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> All packages include secure payments and run until your car sells.
        </p>
      </Section>

      {/* Safety */}
      <Section className="mt-14">
        <SectionHeading title="Sell with confidence" subtitle="Built-in protection for every private seller" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-5 ring-1 ring-foreground/5">
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-brand">
                <s.Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Guides */}
      <Section className="mt-14">
        <SectionHeading title="Selling guides" subtitle="Expert tips to help you sell smarter" href="/research/advice" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {GUIDES.map((g) => (
            <Link key={g.title} href={g.href} className="group rounded-xl border bg-card p-5 ring-1 ring-foreground/5 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Camera className="size-5 text-brand" strokeWidth={1.75} />
              <h3 className="mt-3 font-semibold group-hover:text-brand">{g.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Read guide <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
