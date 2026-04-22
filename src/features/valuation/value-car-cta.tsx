"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeDollarSign, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const makes: Record<string, string[]> = {
  Toyota: ["Corolla", "RAV4", "HiLux", "LandCruiser", "Camry"],
  Mazda: ["CX-5", "CX-3", "Mazda3", "BT-50"],
  Ford: ["Ranger", "Everest", "Mustang"],
  Hyundai: ["i30", "Tucson", "Kona", "Santa Fe"],
  Kia: ["Cerato", "Sportage", "Seltos", "Sorento", "K4"],
  Tesla: ["Model 3", "Model Y"],
  BYD: ["Atto 3", "Seal", "Dolphin"],
};

export function ValueCarCTA() {
  const router = useRouter();
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const models = useMemo(() => (make ? makes[make] : []), [make]);
  const canSubmit = Boolean(make && model);

  function submit() {
    if (!canSubmit) return;
    const params = new URLSearchParams({ make, model });
    router.push(`/value?${params.toString()}`);
  }

  return (
    <section className="rounded-2xl border bg-card">
      <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-10">
        <div>
          <div className="inline-flex size-10 items-center justify-center rounded-lg border">
            <BadgeDollarSign className="size-5" strokeWidth={1.5} />
          </div>
          <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            See how much your car is worth
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            A free market valuation based on live AussieWheels data and thousands of comparable listings.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-foreground" strokeWidth={1.75} />
              Based on live market data
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-foreground" strokeWidth={1.75} />
              No follow-up calls or strings attached
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-foreground" strokeWidth={1.75} />
              Instant price range estimate
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col gap-3 rounded-xl border bg-background p-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Make</span>
            <Select
              value={make}
              onValueChange={(v) => {
                setMake(v ?? "");
                setModel("");
              }}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select a make" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(makes).map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Model</span>
            <Select
              value={model}
              onValueChange={(v) => setModel(v ?? "")}
              disabled={!make}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder={make ? "Select a model" : "Pick a make first"} />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <Button type="submit" size="lg" className="mt-1 h-11" disabled={!canSubmit}>
            Value your car
          </Button>
          <p className="text-[11px] text-muted-foreground">
            Estimates are indicative only. Final price may vary by condition, kms and location.
          </p>
        </form>
      </div>
    </section>
  );
}
