"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Brand } from "@/components/brand";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left">
            <Brand href={null} />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-2">
          {NAV.map((item) => (
            <div key={item.label} className="py-1">
              <SheetClose
                render={
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                  />
                }
              >
                {item.label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </SheetClose>
              {item.children && (
                <div className="ml-3 mt-0.5 flex flex-col border-l pl-3">
                  {item.children.map((c) => (
                    <SheetClose
                      key={c.href}
                      render={
                        <Link
                          href={c.href}
                          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                        />
                      }
                    >
                      {c.label}
                      {c.badge && (
                        <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                          {c.badge}
                        </span>
                      )}
                    </SheetClose>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-2 border-t p-4">
          <SheetClose
            render={
              <Link href="/sell/create" className={cn(buttonVariants({ variant: "default" }), "h-10 w-full")} />
            }
          >
            Sell my car
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
