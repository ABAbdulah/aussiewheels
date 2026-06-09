import type { Metadata } from "next";
import { PageHero } from "@/components/content-page";
import { ArticleCard } from "@/features/research/article-card";
import { ADVICE } from "@/features/research/content";

export const metadata: Metadata = { title: "Car advice" };

export default function AdvicePage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Research"
        title="Car advice & guides"
        subtitle="Practical guides for buying, selling and owning a car in Australia — written by our expert team."
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVICE.map((a, i) => <ArticleCard key={a.slug} article={a} priority={i < 3} />)}
        </div>
      </div>
    </div>
  );
}
