"use client";

import { useState } from "react";
import { Phone, MessageSquare, HandCoins, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { openChat } from "@/features/chat/chat-dock";
import type { Listing } from "@/lib/api";
import { fmtPrice } from "@/lib/format";

export function ContactSeller({ listing }: { listing: Listing }) {
  const [revealed, setRevealed] = useState(false);
  const sellerName = listing.sellerName ?? "Private seller";

  const meta = {
    listingId: listing.id,
    slug: listing.slug,
    title: listing.title,
    image: listing.images[0],
    sellerName,
    price: listing.price,
  };

  return (
    <div className="space-y-2.5">
      <Button
        size="lg"
        className="h-11 w-full text-sm"
        onClick={() => {
          setRevealed(true);
          toast.success("Phone number revealed", { description: "Calls are connected via a private AussieWheels number." });
        }}
      >
        <Phone className="size-4" />
        {revealed ? "0428 ••• 731" : "Show phone number"}
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="h-11 w-full text-sm"
        onClick={() => openChat({ ...meta })}
      >
        <MessageSquare className="size-4" />
        Message seller
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="h-11 w-full text-sm"
        onClick={() =>
          openChat({
            ...meta,
            initialMessage: `Hi, I'm interested in your ${listing.title}. Would you accept an offer around ${fmtPrice(Math.round(listing.price * 0.95))}?`,
          })
        }
      >
        <HandCoins className="size-4" />
        Make an offer
      </Button>

      <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5 text-success" />
        Protected by AussieWheels secure messaging
      </p>
    </div>
  );
}
