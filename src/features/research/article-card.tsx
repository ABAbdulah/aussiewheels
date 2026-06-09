import Link from "next/link";
import { Clock } from "lucide-react";
import { CarImage } from "@/features/listings/car-image";
import type { Article } from "./content";

export function ArticleCard({ article, priority }: { article: Article; priority?: boolean }) {
  return (
    <Link
      href={`/research/article/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/40"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <CarImage src={article.image} alt={article.title} priority={priority} sizes="(max-width:1024px) 50vw, 380px" className="transition-transform duration-300 group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-bold leading-snug tracking-tight group-hover:text-brand">{article.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span className="ml-auto inline-flex items-center gap-1"><Clock className="size-3" />{article.readMins} min</span>
        </div>
      </div>
    </Link>
  );
}
