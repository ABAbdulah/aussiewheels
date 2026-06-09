import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/content-page";

export const metadata: Metadata = { title: "Sitemap" };

const GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: "Buy", links: [
    { label: "All cars for sale", href: "/cars" }, { label: "New cars", href: "/cars?condition=new" },
    { label: "Used cars", href: "/cars?condition=used" }, { label: "Electric cars", href: "/cars?fuel=Electric" },
    { label: "Dealer cars", href: "/cars?sellerType=dealer" }, { label: "Private cars", href: "/cars?sellerType=private" },
    { label: "Car finance", href: "/car-finance" }, { label: "Car inspections", href: "/car-inspections" },
  ] },
  { title: "Sell", links: [
    { label: "Sell hub", href: "/sell" }, { label: "Create an ad", href: "/sell/create" },
    { label: "Instant Offer", href: "/sell/instant-offer" }, { label: "Trade-In", href: "/sell/trade-in" },
    { label: "Manage my ads", href: "/sell/listings" }, { label: "Value my car", href: "/valuations" },
    { label: "Pay through AussieWheels", href: "/payments" },
  ] },
  { title: "Research", links: [
    { label: "New car showroom", href: "/research/showroom" }, { label: "Expert reviews", href: "/research/reviews" },
    { label: "Car news", href: "/research/news" }, { label: "Car advice", href: "/research/advice" },
    { label: "Comparisons", href: "/research/comparisons" }, { label: "Owner reviews", href: "/research/owner-reviews" },
    { label: "Car of the Year", href: "/research/car-of-the-year" },
  ] },
  { title: "Account", links: [
    { label: "Sign in / Sign up", href: "/auth" }, { label: "Saved cars", href: "/saved" },
    { label: "Messages", href: "/messages" },
  ] },
  { title: "Company", links: [
    { label: "About us", href: "/info/about-us" }, { label: "Trust & safety", href: "/info/trust-and-confidence" },
    { label: "Careers", href: "/careers" }, { label: "Advertise (MediaHouse)", href: "/mediahouse" },
    { label: "Dealer sign-up", href: "/business/dealer-sign-up" }, { label: "Help centre", href: "/help" },
  ] },
  { title: "Legal", links: [
    { label: "Terms & Conditions", href: "/info/terms-conditions" }, { label: "Privacy Policy", href: "/info/privacy-policy" },
  ] },
];

export default function SitemapPage() {
  return (
    <div className="pb-20">
      <PageHero title="Sitemap" subtitle="Every page on AussieWheels, in one place." />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{g.title}</h2>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-foreground/80 hover:text-brand hover:underline">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
