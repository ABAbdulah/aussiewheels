export const siteConfig = {
  name: "AussieWheels",
  tagline: "Australia's smarter way to buy and sell vehicles",
  description:
    "Browse new, used and demo cars, bikes, caravans and more across Australia. Transparent pricing, AI-assisted search, trusted sellers.",
  url: process.env.NEXT_PUBLIC_APP_NAME ?? "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
} as const;

export const verticals = [
  { slug: "cars", label: "Cars" },
  { slug: "bikes", label: "Bikes" },
  { slug: "caravans", label: "Caravans" },
  { slug: "boats", label: "Boats" },
  { slug: "trucks", label: "Trucks" },
  { slug: "industrial", label: "Industrial" },
] as const;

export type VerticalSlug = (typeof verticals)[number]["slug"];
