import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, ShieldCheck, BadgeDollarSign, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AdSlot } from "@/components/ad-slot";
import { CarSearchBar } from "@/features/search/car-search-bar";
import { ListingsCarousel } from "@/features/listings/listings-carousel";
import { BodyTypePicker } from "@/features/body-types/body-type-picker";
import { ReviewCard } from "@/features/reviews/review-card";
import { featuredReviews } from "@/features/reviews/featured-reviews";
import { fetchListings } from "@/lib/api";

export default async function HomePage() {
  const { items: featured } = await fetchListings({ vertical: "cars", limit: 9 });
  const newCars = featured.slice(0, 6);
  const specialOffers = featured.slice(3, 9);

  return (
    <>
      {/* ── Hero ── */}
      <section>
        {/* Full-bleed lifestyle image */}
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
          <Image
            src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1920&q=80"
            alt="Find your next car"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Bottom fade so search card blends */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-background/80" />
        </div>

        {/* Search card — overlaps image */}
        <div className="relative -mt-10 px-4 pb-2 sm:-mt-14">
          <div className="mx-auto max-w-5xl">
            <CarSearchBar />
          </div>
        </div>
      </section>

      {/* ── Body-type quick picks ── */}
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-4">
        <BodyTypePicker />
      </section>

      <div className="border-b mx-4" />

      {/* ── New cars carousel ── */}
      <section className="mx-auto max-w-5xl px-8 py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">New cars</h2>
          <Link
            href="/buy/cars?condition=new"
            className="flex items-center gap-1 text-sm font-light text-primary hover:underline"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {newCars.length > 0 ? (
          <ListingsCarousel
            listings={newCars.map((l) => ({
              ...l,
              location: l.location && l.state ? `${l.location}, ${l.state}` : l.location,
              driveaway: true,
            }))}
          />
        ) : (
          <EmptyListings />
        )}
      </section>

      {/* ── Special offers carousel ── */}
      <section className="mx-auto max-w-5xl px-8 py-4 pb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Special offers</h2>
          <Link
            href="/buy/cars?special=true"
            className="flex items-center gap-1 text-sm font-light text-primary hover:underline"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {specialOffers.length > 0 ? (
          <ListingsCarousel
            listings={specialOffers.map((l) => ({
              ...l,
              location: l.location && l.state ? `${l.location}, ${l.state}` : l.location,
            }))}
          />
        ) : (
          <EmptyListings />
        )}
      </section>

      {/* ── Save searches CTA ── */}
      <section className="bg-muted/40 py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-10 items-center justify-center rounded-full border">
            <Heart className="size-4.5 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-base font-light">Sign up to save searches</p>
          <p className="text-sm font-light text-muted-foreground">
            Find your saved searches right here. Get alerts for new listings.
          </p>
          <Link href="/sign-up" className={`${buttonVariants({ size: "sm" })} mt-1 rounded-full! font-light`}>
            Sign up or log in
          </Link>
        </div>
      </section>

      {/* ── Ad slot ── */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <AdSlot slotId="home-leaderboard" format="leaderboard" name="Home leaderboard" />
      </section>

      {/* ── Value your car ── */}
      <section className="relative overflow-hidden py-16">
        <Image
          src="https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=1920&q=75"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-md rounded-2xl bg-background p-7 shadow-xl">
            <div className="inline-flex size-9 items-center justify-center rounded-lg border">
              <BadgeDollarSign className="size-4.5" strokeWidth={1.5} />
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              See how much your car is worth
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm font-light text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 shrink-0" strokeWidth={2} /> Based on live market data
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 shrink-0" strokeWidth={2} /> No follow-up calls or strings attached
              </li>
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <ValueSelect label="Make" placeholder="Select" options={["Toyota", "Mazda", "Ford", "Hyundai", "Kia"]} />
              <ValueSelect label="Model" placeholder="Select" options={[]} />
            </div>
            <Link
              href="/value"
              className={`${buttonVariants({ size: "lg" })} mt-4 w-full rounded-lg! font-light`}
            >
              Value your car
            </Link>
          </div>
        </div>
      </section>

      {/* ── Expert reviews ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Expert car reviews</h2>
          <Link
            href="/research"
            className="flex items-center gap-1 text-sm font-light text-primary hover:underline"
          >
            Show all car reviews <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredReviews.map((r) => (
            <ReviewCard key={r.slug} {...r} />
          ))}
        </div>
      </section>

      {/* ── Inline ad ── */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <AdSlot slotId="home-inline" format="inline" name="Home inline" />
      </section>

      {/* ── Why AussieWheels ── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            { icon: Sparkles, title: "AI-assisted search", body: "Describe what you need in plain English." },
            { icon: BadgeDollarSign, title: "Transparent pricing", body: "Real market valuations. No hidden costs." },
            { icon: ShieldCheck, title: "Verified sellers", body: "ID checks, masked contacts, scam filtering." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-2">
              <Icon className="size-5 text-primary" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
              <p className="text-sm font-light text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Helpers ── */

function EmptyListings() {
  return (
    <p className="rounded-xl border border-dashed bg-muted/20 py-8 text-center text-sm font-light text-muted-foreground">
      No listings yet — make sure the backend is running on <code className="font-mono">localhost:4000</code>.
    </p>
  );
}

function ValueSelect({ label, placeholder, options }: { label: string; placeholder: string; options: string[] }) {
  return (
    <div>
      <label className="block text-[11px] font-light text-muted-foreground mb-1">{label}</label>
      <div className="relative">
        <select className="w-full h-10 appearance-none rounded-lg border border-input bg-background pl-3 pr-7 text-sm font-light focus:outline-none focus:ring-2 focus:ring-ring/50">
          <option>{placeholder}</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" fill="none" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}
