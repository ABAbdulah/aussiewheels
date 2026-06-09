import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Gauge, Calendar, Fuel as FuelIcon, Settings2, Cog, Zap, DoorOpen, Armchair,
  Palette, MapPin, ShieldCheck, FileText, BadgeCheck, Check, ChevronRight,
} from "lucide-react";
import { fetchListing, fetchListings } from "@/lib/api";
import { fmtPrice, fmtKm, fmtNumber } from "@/lib/format";
import { PhotoGallery } from "@/features/listings/photo-gallery";
import { ContactSeller } from "@/features/listings/contact-seller";
import { ListingCard } from "@/features/listings/listing-card";
import { LoanCalculator } from "@/features/finance/loan-calculator";
import {
  PriceComparisonBadge, FuelTypeBadge, SellerTypeBadge, ConditionBadge, SpecialOfferBadge,
} from "@/components/badges";
import { SectionHeading } from "@/components/section";

export const revalidate = 30;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const l = await fetchListing(id);
  return { title: l ? l.title : "Listing" };
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = await fetchListing(id);
  if (!l) notFound();

  const { items: similar } = await fetchListings({ bodyType: l.bodyType, excludeId: l.id, limit: 4, sort: "featured" });

  const specs = [
    { Icon: Gauge, label: "Odometer", value: fmtKm(l.odometer) },
    { Icon: Calendar, label: "Year", value: String(l.year) },
    { Icon: Settings2, label: "Body type", value: l.bodyType },
    { Icon: Cog, label: "Transmission", value: l.transmission },
    { Icon: FuelIcon, label: "Fuel type", value: l.fuel },
    { Icon: Settings2, label: "Drive", value: l.driveType ?? "—" },
    { Icon: Cog, label: "Engine", value: l.engine ?? "—" },
    { Icon: Zap, label: "Power", value: l.powerKw ? `${l.powerKw} kW` : "—" },
    { Icon: DoorOpen, label: "Doors", value: l.doors ? String(l.doors) : "—" },
    { Icon: Armchair, label: "Seats", value: l.seats ? String(l.seats) : "—" },
    { Icon: Palette, label: "Colour", value: l.colour ?? "—" },
    { Icon: MapPin, label: "Location", value: l.location },
  ].filter((s) => s.value !== "—");

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      {/* Breadcrumb */}
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand">Home</Link><ChevronRight className="size-3" />
        <Link href="/cars" className="hover:text-brand">Cars</Link><ChevronRight className="size-3" />
        <Link href={`/cars?make=${encodeURIComponent(l.make)}`} className="hover:text-brand">{l.make}</Link><ChevronRight className="size-3" />
        <span className="text-foreground/70">{l.model}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* ── Left column ── */}
        <div className="min-w-0">
          <PhotoGallery listing={l} />

          {/* Title + badges (mobile shows price here too) */}
          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-1.5">
              {l.specialOffer && <SpecialOfferBadge />}
              <ConditionBadge condition={l.condition} />
              <FuelTypeBadge fuel={l.fuel} />
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{l.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {[l.transmission, l.driveType, l.engine].filter(Boolean).join(" · ")}
            </p>
          </div>

          {/* Specs grid */}
          <div className="mt-6 rounded-xl border bg-card p-1 ring-1 ring-foreground/5">
            <div className="grid grid-cols-2 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 p-3">
                  <s.Icon className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                    <div className="truncate text-sm font-semibold">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <section className="mt-7">
            <h2 className="text-lg font-bold">Seller&apos;s description</h2>
            <p className="mt-2 leading-relaxed text-foreground/80">{l.description}</p>
          </section>

          {/* Features */}
          {l.features.length > 0 && (
            <section className="mt-7">
              <h2 className="text-lg font-bold">Features &amp; options</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {l.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Trust / history */}
          <section className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { Icon: FileText, title: "Vehicle history", body: "PPSR & write-off check available" },
              { Icon: BadgeCheck, title: "Verified seller", body: "ID-checked AussieWheels member" },
              { Icon: ShieldCheck, title: "Secure payment", body: "Pay through AussieWheels escrow" },
            ].map((t) => (
              <div key={t.title} className="rounded-xl border bg-card p-4 ring-1 ring-foreground/5">
                <t.Icon className="size-5 text-brand" strokeWidth={1.75} />
                <div className="mt-2 text-sm font-semibold">{t.title}</div>
                <p className="text-xs text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </section>
        </div>

        {/* ── Right column (sticky) ── */}
        <div className="lg:sticky lg:top-20 lg:h-fit lg:self-start">
          <div className="space-y-4">
            {/* Price card */}
            <div className="rounded-2xl border bg-card p-5 ring-1 ring-foreground/5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight tnum">{fmtPrice(l.price)}</div>
                  <div className="text-xs text-muted-foreground">
                    {l.driveawayPrice ? `${fmtPrice(l.driveawayPrice)} drive away` : "Excl. government charges"}
                  </div>
                </div>
                {l.priceIndicator && <PriceComparisonBadge indicator={l.priceIndicator} />}
              </div>

              <div className="my-4 h-px bg-border" />

              {/* Seller */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{l.sellerName ?? "Private seller"}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {l.location}
                  </div>
                </div>
                <SellerTypeBadge seller={l.sellerType} />
              </div>

              <ContactSeller listing={l} />
            </div>

            {/* Finance */}
            <LoanCalculator defaultAmount={l.price} compact />
          </div>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mt-12">
          <SectionHeading title="Similar cars" subtitle={`More ${l.bodyType.toLowerCase()}s you may like`} href={`/cars?bodyType=${encodeURIComponent(l.bodyType)}`} />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((s) => (
              <ListingCard key={s.id} listing={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
