import Link from "next/link";
import { CheckCircle2, Clock, DollarSign, Shield, Users, TrendingUp, Car, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, value: "1M+", label: "weekly potential buyers, on average" },
  { icon: Star, value: "4.5x", label: "more visits than nearest competitor" },
  { icon: Car, value: "3,000+", label: "cars sold per week, on average" },
];

const tools = [
  {
    title: "Pricing guidance",
    desc: "Our unique pricing data helps you set the right price to attract serious buyers",
    visual: (
      <div className="mt-4 rounded-xl border bg-background p-4 shadow-sm text-sm">
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Car className="size-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-medium text-sm">2020 Toyota Camry</p>
            <p className="text-xs text-muted-foreground font-light">84,000 km</p>
          </div>
        </div>
        <div className="pt-3 space-y-2">
          <p className="text-xs text-muted-foreground font-light">Estimated selling price</p>
          <p className="text-xl font-bold">$23,600 – $25,600</p>
          <div className="relative h-1.5 rounded-full bg-muted">
            <div className="absolute inset-y-0 left-[30%] right-[20%] rounded-full bg-primary/30" />
            <div className="absolute top-1/2 left-[55%] -translate-y-1/2 size-4 rounded-full border-2 border-primary bg-background shadow" />
          </div>
          <p className="text-right text-xs font-medium text-primary">$24,000</p>
        </div>
      </div>
    ),
  },
  {
    title: "Tailored ad guidance",
    desc: "Our ad rating system, advice and insights help you set up the best ad possible",
    visual: (
      <div className="mt-4 rounded-xl border bg-background p-4 shadow-sm text-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium">Ad live</span>
        </div>
        <p className="font-semibold">2018 Mazda CX-5</p>
        <p className="text-muted-foreground text-xs font-light">$25,500</p>
        <div className="flex items-center gap-3 pt-1">
          <div className="relative size-14">
            <svg viewBox="0 0 36 36" className="rotate-[-90deg]">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="3"
                strokeDasharray="80 100" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-emerald-600">80%</span>
              <span className="text-[9px] text-emerald-600">Good</span>
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Ad rating</p>
            <p className="text-xs text-primary font-medium">💡 Add more photos</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Ad insights",
    desc: "Our dashboard helps you view buyer interest so you can improve your ad performance",
    visual: (
      <div className="mt-4 rounded-xl border bg-background p-4 shadow-sm text-sm">
        <div className="grid grid-cols-4 gap-2 text-center border-b pb-3">
          {[["Searches", "5,153"], ["Views", "595"], ["Saves", "120"], ["Enquiries", "8"]].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs font-bold">{v}</p>
              <p className="text-[10px] text-muted-foreground font-light">{k}</p>
            </div>
          ))}
        </div>
        <div className="pt-3 flex items-end justify-between gap-1 h-12">
          {[3, 5, 4, 7, 6, 8, 5].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-primary/20" style={{ height: `${h * 6}px` }} />
          ))}
        </div>
        <div className="mt-2 text-right">
          <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">+10% from last week</span>
        </div>
      </div>
    ),
  },
];

const packages = [
  {
    name: "Standard",
    highlight: false,
    features: {
      "Search appearances": "1x",
      "Views by potential buyers": "1x",
      "Secure car payment": true,
      "Showcase ad near top": false,
      "Vehicle History Snapshot": false,
      "Virtual phone number": false,
    },
  },
  {
    name: "Premium",
    highlight: false,
    features: {
      "Search appearances": "1.7x more",
      "Views by potential buyers": "1.4x more",
      "Secure car payment": true,
      "Showcase ad near top": false,
      "Vehicle History Snapshot": false,
      "Virtual phone number": false,
    },
  },
  {
    name: "Ultimate",
    highlight: true,
    features: {
      "Search appearances": "2.7x more",
      "Views by potential buyers": "2.0x more",
      "Secure car payment": true,
      "Showcase ad near top": true,
      "Vehicle History Snapshot": true,
      "Virtual phone number": true,
    },
  },
];

const featureDescriptions: Record<string, string> = {
  "Search appearances": "Tells you how often ads appear in potential buyers' search results",
  "Views by potential buyers": "Tells you how often potential buyers click into and view ads",
  "Secure car payment": "The safer and simpler way to get paid",
  "Showcase ad near top": "Positions your ad towards the top of your buyers search results",
  "Vehicle History Snapshot": "Gives buyers that extra confidence with a history snapshot of your car",
  "Virtual phone number": "Replaces your personal phone number with a virtual phone number",
};

const faqs = [
  {
    q: "What's the difference between advertising and an Instant Offer?",
    a: "Advertising lets you set your own price and negotiate with buyers, potentially getting more for your car. An Instant Offer™ gives you a fast, no-haggle price from an accredited dealer — typically within 24 hours.",
  },
  {
    q: "Can I sell my car if it still has finance owing?",
    a: "Yes. You can still list your car. The outstanding finance will need to be settled at the time of sale, either by the buyer paying it directly or from the sale proceeds.",
  },
  {
    q: "Do I need a roadworthy certificate?",
    a: "Requirements vary by state. In some states (e.g. VIC, QLD) a roadworthy certificate is required. We'll guide you through what's needed for your specific state.",
  },
  {
    q: "Will buyers want to inspect my car?",
    a: "Most serious buyers will want to see the car in person or request a pre-purchase inspection from a mechanic. Having service records and being transparent about the car's condition helps build trust.",
  },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Sell your car with AussieWheels</h1>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {/* Instant Offer card */}
            <div className="rounded-2xl border bg-card p-6 text-left shadow-sm">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">Instant Offer™</h2>
                <Link href="#packages" className="text-xs font-light text-primary hover:underline">See T&Cs</Link>
              </div>
              <p className="mt-1 text-sm font-light text-muted-foreground">A fast and fair alternative to selling privately</p>
              <ul className="mt-5 space-y-3">
                {[
                  [DollarSign, "No haggling. Fair and competitive price"],
                  [Clock, "Sell in as fast as 24 hours"],
                  [CheckCircle2, "AussieWheels connects you with an accredited dealer"],
                ].map(([Icon, text]) => (
                  <li key={text as string} className="flex items-start gap-2.5 text-sm font-light">
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} />
                    {text as string}
                  </li>
                ))}
              </ul>
              <Link href="/sell/instant-offer" className={cn(buttonVariants(), "mt-6 w-full rounded-lg! font-light")}>
                Get a free Instant Offer
              </Link>
            </div>

            {/* Advertise card */}
            <div className="rounded-2xl border bg-card p-6 text-left shadow-sm">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">Advertise with AussieWheels</h2>
              </div>
              <p className="mt-1 text-sm font-light text-muted-foreground">Maximise your sale price</p>
              <ul className="mt-5 space-y-3">
                {[
                  [DollarSign, "Get paid more securely through AussieWheels"],
                  [Clock, "List until sold"],
                  [Shield, "Secure messaging — we help block spam and scams"],
                ].map(([Icon, text]) => (
                  <li key={text as string} className="flex items-start gap-2.5 text-sm font-light">
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} />
                    {text as string}
                  </li>
                ))}
              </ul>
              <Link href="/sell/create-ad" className={cn(buttonVariants(), "mt-6 w-full rounded-lg! font-light")}>
                Create an ad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Get paid section (full-bleed image + floating card) ── */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format')" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20">
          <div className="max-w-sm rounded-2xl bg-background/95 p-7 shadow-2xl backdrop-blur">
            <span className="inline-block rounded-full border border-primary/40 px-3 py-1 text-[11px] font-medium text-primary">
              Included in all ad packages
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Get paid through AussieWheels</h2>
            <p className="mt-2 text-sm font-light text-muted-foreground">
              The safer, smarter way to get paid from ID document verified buyers
            </p>
            <p className="mt-1 text-xs font-light text-muted-foreground">Only available on cars less than $100,000 for now. T&Cs apply.</p>
            <div className="mt-5 flex items-center gap-3">
              <Link href="/sell/create-ad" className={cn(buttonVariants(), "rounded-lg! font-light text-sm")}>
                Create an ad
              </Link>
              <Link href="/sell/payment" className="text-sm font-light text-primary hover:underline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        {/* Trust badges */}
        <div className="absolute right-[10%] top-[30%] flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 shadow-lg text-xs font-medium">
          <Shield className="size-3.5 text-primary" strokeWidth={1.5} /> ID verified
        </div>
        <div className="absolute right-[8%] bottom-[30%] flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 shadow-lg text-xs font-medium">
          <DollarSign className="size-3.5 text-primary" strokeWidth={1.5} /> Funds ready
        </div>
      </section>

      {/* ── Why sell stats ── */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl bg-background px-8 py-10 text-center shadow-lg">
            <h2 className="text-2xl font-semibold tracking-tight">Why sell on AussieWheels?</h2>
            <div className="mt-8 grid grid-cols-3 gap-6 divide-x">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={value} className="px-4 text-center">
                  <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-3xl font-bold tracking-tight">{value}</p>
                  <p className="mt-1 text-xs font-light text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/sell/create-ad" className={cn(buttonVariants({ variant: "outline" }), "mt-8 rounded-full! font-light")}>
              Create an ad
            </Link>
          </div>
        </div>
      </section>

      {/* ── Exclusive tools ── */}
      <section className="border-b bg-background py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Our exclusive tools to help you sell</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.title} className="rounded-2xl border bg-muted/20 p-5">
                <h3 className="font-semibold">{tool.title}</h3>
                <p className="mt-1 text-sm font-light text-muted-foreground">{tool.desc}</p>
                {tool.visual}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/sell/create-ad" className={cn(buttonVariants({ variant: "outline" }), "rounded-full! font-light")}>
              Create an ad
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust & confidence ── */}
      <section className="relative overflow-hidden bg-neutral-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&auto=format')" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20">
          <div className="max-w-sm rounded-2xl bg-background/95 p-7 shadow-2xl backdrop-blur">
            <h2 className="text-xl font-semibold tracking-tight">Trust and confidence built in</h2>
            <ul className="mt-5 space-y-4">
              {[
                [CheckCircle2, "We have processes designed to block suspicious data and protect against data theft."],
                [Shield, "We blur registration plates and offer virtual mobile numbers."],
                [TrendingUp, "Our dedicated trust and safety team is available 7 days a week."],
              ].map(([Icon, text]) => (
                <li key={text as string} className="flex items-start gap-3 text-sm font-light">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.5} />
                  {text as string}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Packages comparison table ── */}
      <section id="packages" className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Find the right ad package for you</h2>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="py-3 pr-6 text-left font-medium text-muted-foreground w-1/2">Feature</th>
                  {packages.map((pkg) => (
                    <th key={pkg.name} className="py-3 px-4 text-center font-medium">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-base font-semibold">{pkg.name}</span>
                        {pkg.highlight && (
                          <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                            Best performing
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(featureDescriptions).map((feat) => (
                  <tr key={feat} className="border-t">
                    <td className="py-4 pr-6">
                      <p className="font-medium">{feat}</p>
                      <p className="mt-0.5 text-xs font-light text-muted-foreground">{featureDescriptions[feat]}</p>
                    </td>
                    {packages.map((pkg) => {
                      const val = pkg.features[feat as keyof typeof pkg.features];
                      return (
                        <td key={pkg.name} className="py-4 px-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <CheckCircle2 className="mx-auto size-4 text-primary" strokeWidth={1.5} />
                            ) : (
                              <span className="text-xs font-light text-muted-foreground">Upgrade</span>
                            )
                          ) : (
                            <span className="text-sm font-light">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link href="/sell/create-ad" className={cn(buttonVariants({ variant: "outline" }), "rounded-full! font-light")}>
              Select your car for ad pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border bg-background p-5 open:shadow-sm">
                <summary className="cursor-pointer font-medium text-sm leading-snug list-none flex items-center justify-between gap-3">
                  {faq.q}
                  <span className="text-primary text-lg shrink-0 select-none">+</span>
                </summary>
                <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t bg-primary py-14 text-center text-primary-foreground">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight">Ready to sell your car?</h2>
          <p className="mt-2 text-sm font-light opacity-80">Australia&apos;s largest automotive marketplace — reach 1M+ buyers weekly.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/sell/create-ad"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full! border-white/40 bg-white text-primary font-light hover:bg-white/90")}
            >
              Create an ad
            </Link>
            <Link
              href="/sell/instant-offer"
              className="text-sm font-light text-white/80 hover:text-white hover:underline"
            >
              Get an Instant Offer™
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
