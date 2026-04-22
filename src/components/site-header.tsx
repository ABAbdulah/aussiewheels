import Link from "next/link";
import { Heart, MessageSquare, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { verticals } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="inline-block size-6 rounded-md bg-primary" aria-hidden />
          AussieWheels
        </Link>

        <nav className="hidden flex-1 items-center gap-1 text-sm font-medium md:flex">
          {verticals.map((v) => (
            <Link
              key={v.slug}
              href={`/buy/${v.slug}`}
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {v.label}
            </Link>
          ))}
          <Link
            href="/research"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Research
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/account/saved"
            aria-label="Saved"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <Heart className="size-5" />
          </Link>
          <Link
            href="/account/inbox"
            aria-label="Inbox"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <MessageSquare className="size-5" />
          </Link>
          <ThemeToggle />
          <Link
            href="/sign-in"
            className={`${buttonVariants({ variant: "outline", size: "sm" })} hidden sm:inline-flex`}
          >
            <User className="mr-2 size-4" />
            Sign in
          </Link>
          <Link href="/sell" className={buttonVariants({ size: "sm" })}>
            Sell my car
          </Link>
        </div>
      </div>
    </header>
  );
}
