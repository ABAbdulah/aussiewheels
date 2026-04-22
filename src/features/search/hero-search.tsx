"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const modes = [
  { value: "keyword", label: "Keyword" },
  { value: "ai", label: "Ask AI" },
] as const;

type Mode = (typeof modes)[number]["value"];

export function HeroSearch() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("keyword");
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set(mode === "ai" ? "ai" : "q", query.trim());
    router.push(`/buy/cars?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-3xl rounded-2xl border bg-card p-3 shadow-sm sm:p-4"
    >
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-3">
        <TabsList>
          {modes.map((m) => (
            <TabsTrigger key={m.value} value={m.value}>
              {m.value === "ai" && <Sparkles className="mr-1.5 size-3.5" />}
              {m.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "ai"
                ? "e.g. family SUV under $35k with low km"
                : "Search make, model or keyword"
            }
            className="h-12 pl-10 text-base"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 sm:w-auto">
          Search
        </Button>
      </div>
    </form>
  );
}
