import { siteConfig } from "./site";

export type ApiListing = {
  id: string;
  vertical: string;
  title: string;
  subtitle?: string;
  price: number;
  km?: number;
  year?: number;
  transmission?: string;
  fuel?: string;
  bodyType?: string;
  cylinders?: string;
  location?: string;
  state?: string;
  imageUrl?: string;
  priceIndicator?: "great" | "fair" | "high";
  condition?: "new" | "used" | "demo";
  sellerType?: "dealer" | "private";
  photoCount?: number;
  driveawayPrice?: number;
  createdAt: string;
};

export type ApiListingsResponse = {
  items: ApiListing[];
  total: number;
  page: number;
  totalPages: number;
};

export type ListingFilters = {
  vertical?: string;
  make?: string;
  model?: string;
  bodyType?: string;
  state?: string;
  condition?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  transmission?: string;
  fuel?: string;
  kmMax?: number;
  keyword?: string;
  page?: number;
  limit?: number;
  revalidate?: number;
};

export async function fetchListings(
  filters: ListingFilters = {}
): Promise<ApiListingsResponse> {
  const {
    vertical,
    make,
    model,
    bodyType,
    state,
    condition,
    priceMin,
    priceMax,
    yearMin,
    yearMax,
    transmission,
    fuel,
    kmMax,
    keyword,
    page = 1,
    limit = 20,
    revalidate = 60,
  } = filters;

  const url = new URL("/api/v1/listings", siteConfig.apiUrl);
  if (vertical) url.searchParams.set("vertical", vertical);
  if (make) url.searchParams.set("make", make);
  if (model) url.searchParams.set("model", model);
  if (bodyType) url.searchParams.set("bodyType", bodyType);
  if (state) url.searchParams.set("state", state);
  if (condition) url.searchParams.set("condition", condition);
  if (priceMin != null) url.searchParams.set("priceMin", String(priceMin));
  if (priceMax != null) url.searchParams.set("priceMax", String(priceMax));
  if (yearMin != null) url.searchParams.set("yearMin", String(yearMin));
  if (yearMax != null) url.searchParams.set("yearMax", String(yearMax));
  if (transmission) url.searchParams.set("transmission", transmission);
  if (fuel) url.searchParams.set("fuel", fuel);
  if (kmMax != null) url.searchParams.set("kmMax", String(kmMax));
  if (keyword) url.searchParams.set("keyword", keyword);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) throw new Error(`Listings fetch failed: ${res.status}`);
    const data = await res.json() as { items: ApiListing[]; total: number };
    const total = data.total ?? 0;
    return {
      items: data.items ?? [],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch {
    return { items: [], total: 0, page: 1, totalPages: 0 };
  }
}
