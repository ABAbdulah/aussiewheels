import Link from "next/link";
import { Brand } from "@/components/brand";

type IconProps = { className?: string };
const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" /></svg>
);
const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
);
const YoutubeIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12c0-2.4-.2-3.6-.5-4.3a2.7 2.7 0 0 0-1.9-1.9C18.3 5.5 12 5.5 12 5.5s-6.3 0-7.6.3a2.7 2.7 0 0 0-1.9 1.9C2.2 8.4 2 9.6 2 12s.2 3.6.5 4.3a2.7 2.7 0 0 0 1.9 1.9c1.3.3 7.6.3 7.6.3s6.3 0 7.6-.3a2.7 2.7 0 0 0 1.9-1.9c.3-.7.5-1.9.5-4.3Zm-12 3V9l5 3-5 3Z" /></svg>
);
const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6.5 8A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm6 0h2.9v1.2h.05c.4-.75 1.4-1.55 2.85-1.55 3 0 3.6 2 3.6 4.5V19H17v-4c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V19h-3v-9Z" /></svg>
);

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Buy",
    links: [
      { label: "All cars for sale", href: "/cars" },
      { label: "New cars", href: "/cars?condition=new" },
      { label: "Used cars", href: "/cars?condition=used" },
      { label: "Electric cars", href: "/cars?fuel=Electric" },
      { label: "Dealer cars", href: "/cars?sellerType=dealer" },
      { label: "Car finance", href: "/car-finance" },
      { label: "Car inspections", href: "/car-inspections" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Create an ad", href: "/sell/create" },
      { label: "Instant Offer", href: "/sell/instant-offer" },
      { label: "Trade-In", href: "/sell/trade-in" },
      { label: "Value my car", href: "/valuations" },
      { label: "Pay through AussieWheels", href: "/payments" },
      { label: "Manage my ads", href: "/sell/listings" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "New car showroom", href: "/research/showroom" },
      { label: "Car reviews", href: "/research/reviews" },
      { label: "Car news", href: "/research/news" },
      { label: "Car advice", href: "/research/advice" },
      { label: "Owner reviews", href: "/research/owner-reviews" },
      { label: "Car of the Year", href: "/research/car-of-the-year" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/info/about-us" },
      { label: "Trust & safety", href: "/info/trust-and-confidence" },
      { label: "Careers", href: "/careers" },
      { label: "Advertise with us", href: "/mediahouse" },
      { label: "Dealer sign-up", href: "/business/dealer-sign-up" },
      { label: "Help centre", href: "/help" },
    ],
  },
];

const SOCIAL = [
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: YoutubeIcon, href: "#", label: "YouTube" },
  { Icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

const SISTERS = [
  "BikeSales", "BoatSales", "CaravanCampingSales", "TruckSales", "ConstructionSales", "FarmMachinerySales",
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand + social */}
          <div>
            <Brand />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Australia&apos;s smarter way to buy and sell cars — transparent pricing, trusted
              sellers and secure payments.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {SOCIAL.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sister network */}
        <div className="mt-10 border-t pt-6">
          <p className="text-xs font-medium text-muted-foreground">Part of the AussieWheels network</p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
            {SISTERS.map((s) => (
              <span key={s} className="text-xs text-muted-foreground/80">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AussieWheels Pty Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/info/terms-conditions" className="hover:text-foreground">Terms &amp; Conditions</Link>
            <Link href="/info/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/info/sitemap" className="hover:text-foreground">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
