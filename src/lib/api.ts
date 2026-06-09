import { siteConfig } from "./site";

// ── Wire types (mirror the backend DTO) ────────────────────────────────────
export type PriceIndicator = "great" | "good" | "fair" | "high";
export type Condition = "new" | "used" | "demo";
export type SellerType = "dealer" | "private";

export type Listing = {
  id: string;
  slug: string;
  vertical: string;
  make: string;
  model: string;
  variant: string | null;
  year: number;
  title: string;
  price: number;
  driveawayPrice: number | null;
  priceIndicator: PriceIndicator | null;
  odometer: number;
  transmission: string;
  fuel: string;
  bodyType: string;
  driveType: string | null;
  doors: number | null;
  seats: number | null;
  colour: string | null;
  engine: string | null;
  cylinders: number | null;
  powerKw: number | null;
  condition: Condition;
  sellerType: SellerType;
  sellerName: string | null;
  suburb: string;
  state: string;
  location: string;
  description: string;
  features: string[];
  images: string[];
  photoCount: number;
  vin: string | null;
  rego: string | null;
  warrantyMonths: number | null;
  warrantyKm: number | null;
  evRangeKm: number | null;
  specialOffer: boolean;
  tradeInEligible: boolean;
  reviewScore: number | null;
  createdAt: string;
};

export type ListingsResponse = {
  items: Listing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type Facets = {
  makes: { value: string; count: number }[];
  bodyTypes: { value: string; count: number }[];
  fuels: { value: string; count: number }[];
  states: { value: string; count: number }[];
  priceRange: { min: number; max: number };
  yearRange: { min: number; max: number };
  total: number;
};

export type ListingFilters = {
  vertical?: string;
  make?: string;
  model?: string;
  bodyType?: string; // comma-separated allowed
  fuel?: string; // comma-separated allowed
  transmission?: string;
  driveType?: string;
  state?: string;
  sellerType?: string;
  condition?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  kmMax?: number;
  specialOffer?: boolean;
  tradeIn?: boolean;
  keyword?: string;
  excludeId?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

const EMPTY: ListingsResponse = { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };

function buildUrl(path: string, params: Record<string, unknown>) {
  const url = new URL(path, siteConfig.apiUrl);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "" && v !== false) url.searchParams.set(k, String(v));
  }
  return url;
}

export async function fetchListings(
  filters: ListingFilters = {},
  revalidate = 30,
): Promise<ListingsResponse> {
  const { vertical = "cars", page = 1, limit = 20, ...rest } = filters;
  try {
    const url = buildUrl("/api/v1/listings", { vertical, page, limit, ...rest });
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) throw new Error(`listings ${res.status}`);
    return (await res.json()) as ListingsResponse;
  } catch {
    return { ...EMPTY, page };
  }
}

export async function fetchListing(idOrSlug: string, revalidate = 30): Promise<Listing | null> {
  try {
    const url = new URL(`/api/v1/listings/${encodeURIComponent(idOrSlug)}`, siteConfig.apiUrl);
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as Listing;
  } catch {
    return null;
  }
}

export async function fetchFacets(vertical = "cars", revalidate = 120): Promise<Facets | null> {
  try {
    const url = buildUrl("/api/v1/listings/facets", { vertical });
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as Facets;
  } catch {
    return null;
  }
}
