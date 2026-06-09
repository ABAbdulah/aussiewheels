import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { CreateAdWizard } from "@/features/sell/create-ad-wizard";

export const metadata: Metadata = { title: "Create an ad" };

export default function CreateAdPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-brand">Home</Link><ChevronRight className="size-3" />
          <Link href="/sell" className="hover:text-brand">Sell</Link><ChevronRight className="size-3" />
          <span className="text-foreground/70">Create an ad</span>
        </nav>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Create your ad</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">List your car in a few minutes and reach over a million buyers.</p>
        </div>
        <Suspense>
          <CreateAdWizard />
        </Suspense>
      </div>
    </div>
  );
}
