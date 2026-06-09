"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, RefreshCw, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdActions({ slug, title }: { slug: string; title: string }) {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    // Simulated bump — in production this would PATCH the listing's "listed" date.
    setTimeout(() => {
      setRefreshing(false);
      setRefreshedAt(new Date().toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }));
      toast.success("Ad refreshed", {
        description: `“${title}” has been bumped to the top of search results.`,
      });
    }, 700);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/sell/create?edit=${encodeURIComponent(slug)}`}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-1.5")}
      >
        <Pencil className="size-3.5" /> Edit
      </Link>
      <button
        onClick={refresh}
        disabled={refreshing}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-1.5")}
      >
        {refreshing ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />} Refresh
      </button>
      {refreshedAt && (
        <span className="inline-flex items-center gap-1 text-xs text-success">
          <Check className="size-3.5" /> Refreshed at {refreshedAt}
        </span>
      )}
    </div>
  );
}
