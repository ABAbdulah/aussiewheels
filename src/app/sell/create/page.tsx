import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { CreateAdWizard } from "@/features/sell/create-ad-wizard";
import { fetchListing } from "@/lib/api";

export const metadata: Metadata = { title: "Create an ad" };

type SP = Record<string, string | string[] | undefined>;

export default async function CreateAdPage({ searchParams }: { searchParams: Promise<SP> }) {
  const raw = await searchParams;
  const editSlug = typeof raw.edit === "string" ? raw.edit : undefined;
  const editListing = editSlug ? await fetchListing(editSlug) : null;
  const editing = !!editListing;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-brand">Home</Link><ChevronRight className="size-3" />
          <Link href="/sell" className="hover:text-brand">Sell</Link><ChevronRight className="size-3" />
          <span className="text-foreground/70">{editing ? "Edit ad" : "Create an ad"}</span>
        </nav>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">{editing ? "Edit your ad" : "Create your ad"}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {editing
              ? "Update your details and save — your changes go live instantly."
              : "List your car in a few minutes and reach over a million buyers."}
          </p>
        </div>
        <Suspense>
          <CreateAdWizard editListing={editListing} />
        </Suspense>
      </div>
    </div>
  );
}
