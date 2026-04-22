"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AdFormat = "leaderboard" | "rectangle" | "inline" | "auto";

export type AdSlotProps = {
  slotId: string;
  format?: AdFormat;
  className?: string;
  /** Optional human-readable label for the slot, shown only in the dev placeholder */
  name?: string;
};

const client =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT : undefined;

const formatHeight: Record<AdFormat, string> = {
  leaderboard: "h-24 sm:h-28",
  rectangle: "h-[280px]",
  inline: "h-40",
  auto: "min-h-24",
};

const formatAdSize: Record<AdFormat, { width?: string; height?: string; responsive?: string }> = {
  leaderboard: { responsive: "true" },
  rectangle: { width: "300", height: "250" },
  inline: { responsive: "true" },
  auto: { responsive: "true" },
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({ slotId, format = "auto", className, name }: AdSlotProps) {
  const pushed = useRef(false);
  const enabled = Boolean(client && slotId);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    try {
      (window.adsbygoogle ||= []).push({});
      pushed.current = true;
    } catch {
      // AdSense script hasn't loaded yet or is blocked — ignore.
    }
  }, [enabled]);

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border bg-muted/30",
        formatHeight[format],
        className,
      )}
    >
      <span className="pointer-events-none absolute left-2 top-2 rounded-md border bg-background/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
        Ad
      </span>

      {enabled ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format={format === "rectangle" ? undefined : "auto"}
          data-full-width-responsive={formatAdSize[format].responsive}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
          <div>
            <div className="font-medium text-foreground/70">Ad slot</div>
            <div className="mt-0.5">
              {name ?? slotId} · {format}
            </div>
            <div className="mt-1 opacity-70">
              Set <code className="rounded bg-background/60 px-1">NEXT_PUBLIC_ADSENSE_CLIENT</code> to enable.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
