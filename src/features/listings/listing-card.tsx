import Link from "next/link";
import { Camera, MapPin, Gauge, Settings2 } from "lucide-react";
import type { Listing } from "@/lib/api";
import { cn } from "@/lib/utils";
import { fmtPrice, fmtKm } from "@/lib/format";
import { CarImage } from "./car-image";
import { SaveButton } from "./save-button";
import {
  PriceComparisonBadge,
  FuelTypeBadge,
  SellerTypeBadge,
  ConditionBadge,
  SpecialOfferBadge,
} from "@/components/badges";

export function ListingCard({
  listing,
  priority,
  className,
}: {
  listing: Listing;
  priority?: boolean;
  className?: string;
}) {
  const l = listing;
  const subtitle = [l.transmission, l.driveType, l.engine].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/cars/${l.slug}`}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_rgba(27,58,92,0.35)] hover:ring-brand/40",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <CarImage
          src={l.images[0]}
          alt={l.title}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="transition-transform duration-300 group-hover/card:scale-[1.04]"
        />

        {/* top-left status badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
          {l.specialOffer && <SpecialOfferBadge />}
          {l.condition !== "used" && <ConditionBadge condition={l.condition} />}
        </div>

        {/* top-right save */}
        <div className="absolute right-2.5 top-2.5">
          <SaveButton listing={l} />
        </div>

        {/* photo count */}
        <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          <Camera className="size-3" />
          {l.photoCount}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="min-h-[2.6rem]">
          <h3 className="line-clamp-1 text-[15px] font-semibold tracking-tight text-foreground">
            {l.title}
          </h3>
          {subtitle && <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Price — visually dominant */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-xl font-bold tracking-tight text-foreground tnum">{fmtPrice(l.price)}</div>
            <div className="text-[11px] text-muted-foreground">
              {l.driveawayPrice ? `${fmtPrice(l.driveawayPrice)} drive away` : "Excl. gov. charges"}
            </div>
          </div>
          {l.priceIndicator && <PriceComparisonBadge indicator={l.priceIndicator} />}
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Gauge className="size-3.5" /> {fmtKm(l.odometer)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Settings2 className="size-3.5" /> {l.year}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {l.location}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-2.5">
          <FuelTypeBadge fuel={l.fuel} />
          <SellerTypeBadge seller={l.sellerType} />
        </div>
      </div>
    </Link>
  );
}
