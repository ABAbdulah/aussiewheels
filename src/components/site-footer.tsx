import Link from "next/link";
import { siteConfig } from "@/lib/site";

const columns = [
  {
    title: "Buy",
    links: [
      { href: "/buy/cars", label: "Cars" },
      { href: "/buy/bikes", label: "Bikes" },
      { href: "/buy/caravans", label: "Caravans" },
      { href: "/buy/boats", label: "Boats" },
      { href: "/buy/trucks", label: "Trucks" },
    ],
  },
  {
    title: "Sell",
    links: [
      { href: "/sell", label: "Sell my vehicle" },
      { href: "/sell/instant-offer", label: "Instant Offer" },
      { href: "/sell/valuation", label: "Free valuation" },
      { href: "/dealer", label: "Dealer services" },
    ],
  },
  {
    title: "Research",
    links: [
      { href: "/research/reviews", label: "Reviews" },
      { href: "/research/news", label: "News" },
      { href: "/research/compare", label: "Compare" },
      { href: "/research/showroom", label: "Showroom" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-semibold">{col.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built in Australia.</p>
        </div>
      </div>
    </footer>
  );
}
