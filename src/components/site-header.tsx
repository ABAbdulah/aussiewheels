import Link from "next/link";
import { Search, Heart, ChevronDown } from "lucide-react";
import { Brand } from "@/components/brand";
import { MobileNav } from "@/components/mobile-nav";
import { NotificationBell } from "@/components/notification-bell";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccountMenu, AccountLink } from "@/components/account-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      {/* Utility bar */}
      <div className="hidden border-b border-border/60 bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-4 px-4 text-[11px]">
          <p className="font-medium opacity-90">
            Australia&apos;s smarter car marketplace — 1M+ buyers every week
          </p>
          <div className="flex items-center gap-4">
            <Link href="/research/showroom" className="opacity-90 hover:opacity-100">New car showroom</Link>
            <Link href="/payments" className="opacity-90 hover:opacity-100">Pay securely</Link>
            <AccountLink />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <MobileNav />
        <Brand />

        {/* Desktop nav */}
        <nav className="ml-2 hidden items-center lg:flex">
          {NAV.map((item) => (
            <div key={item.label} className="group/nav relative">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-foreground group-hover/nav:bg-accent group-hover/nav:text-foreground"
              >
                {item.label}
                {item.children && <ChevronDown className="size-3.5 opacity-60" />}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-1 opacity-0 transition-all duration-150 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                  <div className="overflow-hidden rounded-xl border bg-popover p-1.5 shadow-xl ring-1 ring-foreground/5">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-accent"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                            {c.label}
                            {c.badge && (
                              <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                                {c.badge}
                              </span>
                            )}
                          </div>
                          {c.description && (
                            <p className="truncate text-xs text-muted-foreground">{c.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          {/* Quick search (GET → /cars) */}
          <form action="/cars" className="hidden md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="keyword"
                placeholder="Search make, model…"
                aria-label="Search cars"
                className="h-9 w-44 rounded-full border border-input bg-card pl-8 pr-3 text-sm outline-none transition-all focus:w-60 focus:border-ring focus:ring-3 focus:ring-ring/40"
              />
            </div>
          </form>

          <Link
            href="/saved"
            aria-label="Saved cars"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden sm:inline-flex")}
          >
            <Heart className="size-5" />
          </Link>
          <NotificationBell />
          <ThemeToggle />
          <AccountMenu />

          <Link
            href="/sell/create"
            className={cn(buttonVariants({ variant: "default" }), "ml-1 hidden h-9 px-4 sm:inline-flex")}
          >
            Sell my car
          </Link>
        </div>
      </div>
    </header>
  );
}
