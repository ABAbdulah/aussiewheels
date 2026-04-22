import { notFound } from "next/navigation";
import { verticals, type VerticalSlug } from "@/lib/site";

const slugSet = new Set<VerticalSlug>(verticals.map((v) => v.slug));

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.slug }));
}

type Props = { params: Promise<{ vertical: string }> };

export default async function BuyVerticalPage({ params }: Props) {
  const { vertical } = await params;
  if (!slugSet.has(vertical as VerticalSlug)) notFound();

  const label = verticals.find((v) => v.slug === vertical)?.label ?? vertical;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Buy {label}</h1>
      <p className="mt-2 text-muted-foreground">
        Listings and filters coming soon. This page will render the search results view with
        sidebar filters, sort, and map toggle.
      </p>
    </div>
  );
}
