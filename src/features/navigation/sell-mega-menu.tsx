"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const sellLinks = [
  { label: "Create an ad", href: "/sell/create-ad" },
  { label: "Get an Instant Offer™", href: "/sell/instant-offer", badge: null },
  { label: "Trade-in", href: "/sell/trade-in", badge: "NEW" },
  { label: "Manage your ad or draft", href: "/sell/manage" },
  { label: "Get paid through AussieWheels", href: "/sell/payment" },
  { label: "Value my car", href: "/value" },
];

export function SellMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hide() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href="/sell"
        className={`flex items-center gap-0.5 rounded-md px-3 py-1.5 text-sm font-light transition-colors hover:bg-accent hover:text-foreground ${open ? "bg-accent text-foreground" : "text-foreground/65"}`}
        onClick={() => setOpen(false)}
      >
        Sell
        <ChevronDown
          className={`size-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </Link>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border bg-background shadow-xl shadow-black/10"
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="h-0.5 bg-primary" />
          <ul className="py-2">
            {sellLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-light text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded border border-primary/40 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
