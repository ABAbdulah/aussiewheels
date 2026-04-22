import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type ListingCardProps = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  km?: number;
  year?: number;
  transmission?: string;
  fuel?: string;
  location?: string;
  imageUrl?: string;
  priceIndicator?: "great" | "fair" | "high";
};

const priceIndicatorLabel = {
  great: "Great price",
  fair: "Fair price",
  high: "Above market",
} as const;

const priceIndicatorVariant: Record<
  NonNullable<ListingCardProps["priceIndicator"]>,
  "default" | "secondary" | "destructive"
> = {
  great: "default",
  fair: "secondary",
  high: "destructive",
};

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function ListingCard({
  id,
  title,
  subtitle,
  price,
  km,
  year,
  transmission,
  fuel,
  location,
  imageUrl,
  priceIndicator,
}: ListingCardProps) {
  const specs = [
    year?.toString(),
    km != null ? `${km.toLocaleString("en-AU")} km` : null,
    transmission,
    fuel,
  ].filter(Boolean);

  return (
    <Link href={`/listing/${id}`} className="group">
      <Card className="overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No photo
            </div>
          )}
          {priceIndicator && (
            <Badge variant={priceIndicatorVariant[priceIndicator]} className="absolute left-3 top-3">
              {priceIndicatorLabel[priceIndicator]}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{title}</h3>
              {subtitle && (
                <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <p className="shrink-0 text-sm font-semibold">{aud.format(price)}</p>
          </div>
          {specs.length > 0 && (
            <p className="mt-2 truncate text-xs text-muted-foreground">{specs.join(" · ")}</p>
          )}
          {location && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {location}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
