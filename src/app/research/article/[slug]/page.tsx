import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ChevronRight } from "lucide-react";
import { NEWS, ADVICE, type Article } from "@/features/research/content";
import { CarImage } from "@/features/listings/car-image";
import { ArticleCard } from "@/features/research/article-card";

const ALL: Article[] = [...NEWS, ...ADVICE];
const find = (slug: string) => ALL.find((a) => a.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = find(slug);
  return { title: a?.title ?? "Article" };
}

const BODY = [
  "Australia's car market continues to evolve at pace, and this story is a snapshot of where things stand right now. Below we unpack what it means for buyers and sellers, and the practical takeaways you can act on today.",
  "Our editorial team analyses live market data alongside manufacturer announcements to give you the full picture — not just the headline. As always, the details matter, so we've broken them down clearly.",
  "If you're in the market, use our free valuation tool to benchmark prices before you commit, and save searches to get alerted the moment a matching car is listed.",
];

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = find(slug);
  if (!a) notFound();

  const related = ALL.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3);
  const fallback = ALL.filter((x) => x.slug !== a.slug).slice(0, 3);
  const show = (related.length ? related : fallback).slice(0, 3);

  return (
    <div className="pb-20">
      <article className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/research/showroom" className="hover:text-brand">Research</Link><ChevronRight className="size-3" />
          <Link href="/research/news" className="hover:text-brand">{a.category}</Link>
        </nav>

        <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">{a.category}</span>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{a.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">{a.author}</span><span>·</span><span>{a.date}</span>
          <span className="ml-auto inline-flex items-center gap-1"><Clock className="size-3.5" />{a.readMins} min read</span>
        </div>

        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
          <CarImage src={a.image} alt={a.title} priority sizes="(max-width:768px) 100vw, 768px" />
        </div>

        <div className="mt-7 space-y-4 text-lg leading-relaxed text-foreground/85">
          <p className="font-medium text-foreground">{a.excerpt}</p>
          {BODY.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </article>

      {show.length > 0 && (
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-5 text-xl font-bold tracking-tight">More from Research</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {show.map((x) => <ArticleCard key={x.slug} article={x} />)}
          </div>
        </div>
      )}
    </div>
  );
}
