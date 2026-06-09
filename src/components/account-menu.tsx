"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Heart, MessageSquare, LayoutGrid, LogOut, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useAuth, logout } from "@/lib/auth";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "?";

/** Text link for the top utility bar. */
export function AccountLink() {
  const user = useAuth();
  if (!user) return <Link href="/auth" className="opacity-90 hover:opacity-100">Sign in</Link>;
  return <Link href="/saved" className="font-medium opacity-95 hover:opacity-100">Hi, {user.name.split(" ")[0]}</Link>;
}

/** Avatar + dropdown for the main nav bar. */
export function AccountMenu() {
  const user = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href="/auth"
        aria-label="Sign in"
        className="inline-flex size-8 items-center justify-center rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground"
      >
        <User className="size-5" />
      </Link>
    );
  }

  const items = [
    { label: "Saved cars", href: "/saved", Icon: Heart },
    { label: "Messages", href: "/messages", Icon: MessageSquare },
    { label: "Manage my ads", href: "/sell/listings", Icon: LayoutGrid },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full p-0.5 pr-1.5 transition-colors hover:bg-accent"
      >
        <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials(user.name)}</span>
        <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-full z-50 mt-1.5 w-60 overflow-hidden rounded-xl border bg-popover shadow-xl ring-1 ring-foreground/5">
            <div className="border-b px-4 py-3">
              <div className="truncate text-sm font-semibold">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.email}</div>
            </div>
            <div className="p-1.5">
              {items.map((it) => (
                <Link key={it.href} href={it.href} onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
                  <it.Icon className="size-4 text-muted-foreground" /> {it.label}
                </Link>
              ))}
            </div>
            <div className="border-t p-1.5">
              <button
                onClick={() => { logout(); setOpen(false); toast.success("Signed out"); router.push("/"); }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-destructive hover:bg-destructive/10"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
