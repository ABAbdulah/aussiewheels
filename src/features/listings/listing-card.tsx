"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Gauge, Heart, Camera } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ListingCardProps = {
  id: string;
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
  imageUrl?: string;
  priceIndicator?: "great" | "fair" | "high";
  driveaway?: boolean;
  driveawayPrice?: number;
  condition?: "new" | "used" | "demo";
  sellerType?: "dealer" | "private";
  photoCount?: number;
  showActions?: boolean;
};

const conditionLabel: Record<string, string> = {
  new: "Dealer new",
  used: "Dealer used",
  demo: "Dealer demo",
};

const priceIndicatorStyle: Record<string, string> = {
  great: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  fair: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400",
  high: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
};

const priceIndicatorLabel: Record<string, string> = {
  great: "Great price",
  fair: "Around market price",
  high: "Above market",
};

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function ListingCard({
  id, title, subtitle, price, km, transmission, bodyType, cylinders,
  location, imageUrl, priceIndicator, driveaway, driveawayPrice, condition,
  sellerType = "dealer", photoCount, showActions = false,
}: ListingCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      {/* Photo area */}
      <Link href={`/listing/${id}`} className="block">
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Gauge className="size-8 text-muted-foreground/30" strokeWidth={1} />
            </div>
          )}

          {/* Photo count */}
          {photoCount && photoCount > 0 && (
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[11px] text-white backdrop-blur-sm">
              <Camera className="size-3" />
              {photoCount}
            </span>
          )}

          {/* Save */}
          <button
            aria-label="Save listing"
            onClick={(e) => e.preventDefault()}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background"
          >
            <Heart className="size-3.5 text-foreground/50" strokeWidth={1.5} />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5">
        {/* Badges row */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {condition && (
            <span className="rounded border px-2 py-0.5 text-[11px] font-light text-foreground/70">
              {sellerType === "private" ? "Private seller" : conditionLabel[condition] ?? condition}
            </span>
          )}
          {priceIndicator && (
            <span className={cn("flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-light", priceIndicatorStyle[priceIndicator])}>
              {priceIndicatorLabel[priceIndicator]}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/listing/${id}`}>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        {subtitle && (
          <p className="mt-0.5 truncate text-xs font-light text-muted-foreground">{subtitle}</p>
        )}

        {/* Price */}
        <div className="mt-2.5">
          <span className="text-xl font-bold tracking-tight">{aud.format(price)}</span>
          {(driveaway || driveawayPrice) && (
            <div className="mt-0.5 text-xs font-light">
              Drive away{" "}
              {driveawayPrice && (
                <span className="text-primary">{aud.format(driveawayPrice)}</span>
              )}{" "}
              <span className="text-muted-foreground">Excl. Est. Govt. Charges</span>
            </div>
          )}
        </div>

        {/* Specs grid */}
        {(bodyType || cylinders || transmission || km != null) && (
          <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-light text-muted-foreground">
            {bodyType && (
              <span className="flex items-center gap-1.5 truncate">
                <span className="size-3 shrink-0">🚗</span>{bodyType}
              </span>
            )}
            {cylinders && (
              <span className="flex items-center gap-1.5 truncate">
                <span className="size-3 shrink-0">⚙️</span>{cylinders}
              </span>
            )}
            {transmission && (
              <span className="flex items-center gap-1.5 truncate">
                <span className="size-3 shrink-0">🔧</span>{transmission}
              </span>
            )}
            {km != null && (
              <span className="flex items-center gap-1.5 truncate">
                <Gauge className="size-3 shrink-0" strokeWidth={1.5} />
                {km.toLocaleString("en-AU")} km
              </span>
            )}
          </div>
        )}

        {/* Location */}
        {location && (
          <p className="mt-2 flex items-center gap-1 text-[11px] font-light text-muted-foreground">
            <MapPin className="size-3 shrink-0" strokeWidth={1.5} />
            {location}
          </p>
        )}

        {/* Action buttons */}
        {showActions && (
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <Link
              href={`/listing/${id}#contact`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full rounded-lg! font-light text-xs")}
            >
              Contact dealer
            </Link>
            <Link
              href={`/listing/${id}`}
              className={cn(buttonVariants({ size: "sm" }), "w-full rounded-lg! font-light text-xs")}
            >
              View details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
