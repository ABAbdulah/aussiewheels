import type { Metadata } from "next";
import { PageHero } from "@/components/content-page";
import { ArticleCard } from "@/features/research/article-card";
import { NEWS } from "@/features/research/content";

export const metadata: Metadata = { title: "Car news" };

export default function NewsPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Research"
        title="Car news"
        subtitle="The latest from Australia's automotive world — new models, pricing, recalls and industry moves."
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((a, i) => <ArticleCard key={a.slug} article={a} priority={i < 3} />)}
        </div>
      </div>
    </div>
  );
}
