// Normalise the API base so it's always a valid absolute URL. Tolerates a
// value pasted without a scheme (e.g. "my-api.up.railway.app") by assuming
// https, and strips any trailing slash.
const normalizeApiUrl = (raw?: string) => {
  const v = (raw ?? "http://localhost:4000").trim().replace(/\/+$/, "");
  if (!v) return "http://localhost:4000";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
};

export const siteConfig = {
  name: "AussieWheels",
  tagline: "Australia's smarter way to buy and sell cars",
  description:
    "Browse new, used and demo cars across Australia. Transparent pricing, powerful search, trusted sellers, free valuations and secure payments.",
  url: process.env.NEXT_PUBLIC_APP_NAME ?? "http://localhost:3000",
  apiUrl: normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL),
} as const;

// ── Australian reference data ──────────────────────────────────────────────
export const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;

export const STATE_NAMES: Record<string, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  WA: "Western Australia",
  SA: "South Australia",
  TAS: "Tasmania",
  ACT: "Australian Capital Territory",
  NT: "Northern Territory",
};

export const BODY_TYPES = [
  "SUV", "Hatch", "Sedan", "Wagon", "Ute", "Coupe",
  "Convertible", "Cab Chassis", "Van", "People Mover", "Bus", "Light Truck",
] as const;

export const FUEL_TYPES = [
  "Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid", "LPG",
] as const;

export const TRANSMISSIONS = ["Automatic", "Manual"] as const;
export const DRIVE_TYPES = ["4x4", "AWD", "4x2", "FWD", "RWD"] as const;
export const CONDITIONS = ["New", "Used", "Demo"] as const;
export const SELLER_TYPES = ["Dealer", "Private"] as const;

export const POPULAR_MAKES = [
  "Audi", "BMW", "BYD", "Ford", "Holden", "Honda", "Hyundai", "Isuzu", "Kia",
  "Land Rover", "Lexus", "Mazda", "Mercedes-Benz", "MG", "Mitsubishi", "Nissan",
  "Polestar", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo",
] as const;

export const SORT_OPTIONS = [
  { value: "featured", label: "Best match" },
  { value: "price_asc", label: "Price (low to high)" },
  { value: "price_desc", label: "Price (high to low)" },
  { value: "year_desc", label: "Year (newest)" },
  { value: "km_asc", label: "Odometer (lowest)" },
  { value: "newest", label: "Date listed (newest)" },
] as const;

export const LIFESTYLES = [
  { slug: "family", label: "Family", body: "SUV" },
  { slug: "first-car", label: "First car" },
  { slug: "electric", label: "Electric", fuel: "Electric" },
  { slug: "tradie", label: "Tradie", body: "Ute" },
  { slug: "prestige", label: "Prestige" },
  { slug: "performance", label: "Performance" },
  { slug: "offroad-4x4", label: "Off-road 4x4" },
  { slug: "hybrid", label: "Hybrid", fuel: "Hybrid" },
] as const;

// ── Primary navigation (carsales-style top nav) ────────────────────────────
export type NavChild = { label: string; href: string; description?: string; badge?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "Buy",
    href: "/cars",
    children: [
      { label: "All cars for sale", href: "/cars", description: "Search every listing" },
      { label: "New cars", href: "/cars?condition=new", description: "In stock & to order" },
      { label: "Used cars", href: "/cars?condition=used", description: "Quality used vehicles" },
      { label: "Dealer cars", href: "/cars?sellerType=dealer", description: "Dealer inventory" },
      { label: "Private seller cars", href: "/cars?sellerType=private", description: "Buy direct" },
      { label: "Electric cars", href: "/cars?fuel=Electric", description: "Browse EVs" },
      { label: "Car finance", href: "/car-finance", description: "Estimate repayments" },
      { label: "Car inspections", href: "/car-inspections", description: "Pre-purchase checks" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    children: [
      { label: "Create an ad", href: "/sell/create", description: "List your car yourself" },
      { label: "Instant Offer", href: "/sell/instant-offer", description: "Sell in 24 hours" },
      { label: "Trade-In", href: "/sell/trade-in", description: "Trade as you buy", badge: "New" },
      { label: "Manage my ads", href: "/sell/listings", description: "Edit & track ads" },
      { label: "Pay through AussieWheels", href: "/payments", description: "Secure payments" },
      { label: "Value my car", href: "/valuations", description: "Free valuation" },
    ],
  },
  {
    label: "Research",
    href: "/research/showroom",
    children: [
      { label: "New car showroom", href: "/research/showroom", description: "398+ models" },
      { label: "Car reviews", href: "/research/reviews", description: "Expert reviews /100" },
      { label: "Car news", href: "/research/news", description: "Latest automotive news" },
      { label: "Car advice", href: "/research/advice", description: "Buying & owning guides" },
      { label: "Comparisons", href: "/research/comparisons", description: "Head-to-head" },
      { label: "Owner reviews", href: "/research/owner-reviews", description: "Real owners" },
      { label: "Car of the Year", href: "/research/car-of-the-year", description: "Award winners" },
    ],
  },
  { label: "Showroom", href: "/research/showroom" },
  { label: "Value my car", href: "/valuations" },
];
