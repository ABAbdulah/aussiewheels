"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = [
  { label: "All cars for sale", href: "/buy/cars" },
  { label: "New cars", href: "/buy/cars?condition=new" },
  { label: "Used cars", href: "/buy/cars?condition=used" },
  { label: "Dealer cars", href: "/buy/cars?seller=dealer" },
  { label: "Private seller cars", href: "/buy/cars?seller=private" },
  { label: "Special offers", href: "/buy/cars?special=true" },
  { label: "Electric cars", href: "/buy/cars?fuel=electric" },
  { label: "Finance", href: "/finance" },
  { label: "Trade-in cars", href: "/sell/trade-in" },
  { label: "Inspections", href: "/inspections" },
];

const popularMakes = [
  "Audi", "BMW", "Ford", "Holden", "Hyundai", "Kia",
  "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Tesla", "Toyota",
];

const popularBodyTypes = [
  "Cab Chassis", "Convertible", "Coupe", "Hatch", "Sedan",
  "SUV", "Ute", "Van", "Wagon",
];

const locations = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

export function BuyMegaMenu() {
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
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger */}
      <Link
        href="/buy/cars"
        className={`flex items-center gap-0.5 rounded-md px-3 py-1.5 text-sm font-light transition-colors hover:bg-accent hover:text-foreground ${open ? "bg-accent text-foreground" : "text-foreground/65"}`}
        onClick={() => setOpen(false)}
      >
        Buy
        <ChevronDown
          className={`size-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </Link>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-[700px] overflow-hidden rounded-xl border bg-background shadow-xl shadow-black/10"
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {/* Blue top accent line */}
          <div className="h-0.5 bg-primary" />

          <div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-0 py-5">
            {/* Col 1: Categories */}
            <div className="border-r px-4">
              <ul className="space-y-0.5">
                {categories.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-1.5 text-sm font-light text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Popular makes */}
            <div className="border-r px-4">
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Popular makes
              </p>
              <ul className="space-y-0.5">
                {popularMakes.map((make) => (
                  <li key={make}>
                    <Link
                      href={`/buy/cars?make=${encodeURIComponent(make)}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-1.5 text-sm font-light text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                    >
                      {make}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Popular body types */}
            <div className="border-r px-4">
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Popular body types
              </p>
              <ul className="space-y-0.5">
                {popularBodyTypes.map((bt) => (
                  <li key={bt}>
                    <Link
                      href={`/buy/cars?body=${encodeURIComponent(bt.toLowerCase())}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-1.5 text-sm font-light text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                    >
                      {bt}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Location */}
            <div className="px-4">
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Location
              </p>
              <ul className="space-y-0.5">
                {locations.map((loc) => (
                  <li key={loc}>
                    <Link
                      href={`/buy/cars?state=${loc}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-1.5 text-sm font-light text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                    >
                      {loc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
