import Link from "next/link";
import { User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/notification-bell";
import { BuyMegaMenu } from "@/features/navigation/buy-mega-menu";
import { SellMegaMenu } from "@/features/navigation/sell-mega-menu";

const otherNavLinks = [
  { href: "/research", label: "Research" },
  { href: "/showroom", label: "Showroom" },
  { href: "/value", label: "Value my car" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground tracking-tight">
            AW
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">AussieWheels</span>
        </Link>

        {/* Nav */}
        <nav className="hidden flex-1 items-center gap-0.5 md:flex">
          <BuyMegaMenu />
          <SellMegaMenu />

          {otherNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-light text-foreground/65 transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          <NotificationBell />
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="hidden items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-light text-foreground/65 transition-colors hover:text-foreground sm:flex"
          >
            <User className="size-4" strokeWidth={1.5} />
            Sign up / Log in
          </Link>
          <Link href="/sell" className={`${buttonVariants({ size: "sm" })} ml-1 rounded-full! text-[13px] font-light`}>
            Sell my car
          </Link>
        </div>
      </div>
    </header>
  );
}
