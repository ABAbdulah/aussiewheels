import Link from "next/link";
import { ArrowRight, Car, Sparkles, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroSearch } from "@/features/search/hero-search";
import { ListingCard } from "@/features/listings/listing-card";
import { verticals } from "@/lib/site";

const featured = [
  {
    id: "1",
    title: "2022 Toyota RAV4 GX Hybrid",
    subtitle: "Automatic · AWD",
    price: 38990,
    km: 42100,
    year: 2022,
    transmission: "Auto",
    fuel: "Hybrid",
    location: "Parramatta, NSW",
    priceIndicator: "great" as const,
  },
  {
    id: "2",
    title: "2021 Mazda CX-5 Maxx Sport",
    subtitle: "SKYACTIV-G 2.5",
    price: 34500,
    km: 58000,
    year: 2021,
    transmission: "Auto",
    fuel: "Petrol",
    location: "Brunswick, VIC",
    priceIndicator: "fair" as const,
  },
  {
    id: "3",
    title: "2023 Tesla Model 3 RWD",
    subtitle: "Long range upgrade",
    price: 54990,
    km: 21000,
    year: 2023,
    transmission: "Auto",
    fuel: "Electric",
    location: "Fortitude Valley, QLD",
    priceIndicator: "great" as const,
  },
];

const pillars = [
  {
    icon: Sparkles,
    title: "AI-assisted search",
    body: "Describe what you need in plain English and we'll find it.",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent pricing",
    body: "One flat fee to list. Real market valuations. No hidden costs.",
  },
  {
    icon: ShieldCheck,
    title: "Verified sellers",
    body: "ID checks, masked contact details and real-time scam filtering.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:py-24">
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Australia&apos;s smarter way to buy and sell vehicles
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            Browse new, used and demo cars, bikes, caravans and more — with transparent pricing,
            AI-assisted search and trusted sellers.
          </p>
          <div className="mt-8 flex w-full justify-center">
            <HeroSearch />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/buy/${v.slug}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <Car className="mr-1.5 size-3.5" />
                {v.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured listings</h2>
          <Link href="/buy/cars" className={buttonVariants({ variant: "link" })}>
            Browse all <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard key={l.id} {...l} />
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border bg-card p-6">
              <Icon className="size-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
