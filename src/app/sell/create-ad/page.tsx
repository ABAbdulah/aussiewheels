import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CreateAdForm } from "@/features/sell/create-ad-form";

export default function CreateAdPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/sell"
          className="mb-6 inline-flex items-center gap-1 text-sm font-light text-primary hover:underline"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} />
          Back to Sell my car
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight">Enter your car&apos;s details</h1>
        <p className="mt-1 text-sm font-light text-muted-foreground">
          Fill in the details below to create your listing.
        </p>

        <CreateAdForm />
      </div>
    </div>
  );
}
