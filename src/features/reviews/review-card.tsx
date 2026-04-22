import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ReviewCardProps = {
  slug: string;
  title: string;
  score: number;
  author: string;
  date: string;
  imageUrl?: string;
};

export function ReviewCard({ slug, title, score, author, date, imageUrl }: ReviewCardProps) {
  return (
    <Link href={`/research/${slug}`} className="group block">
      <Card className="overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-[16/10] bg-muted">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
          )}
          <Badge className="absolute left-3 top-3 bg-background/80 text-foreground shadow-sm backdrop-blur hover:bg-background/80">
            Review
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 text-base font-semibold tracking-tight">{title}</h3>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              <span className="text-base font-bold text-sky-600 dark:text-sky-400">{score}</span>
              <span className="text-foreground/70">/100</span>
            </span>
            <span className="truncate">{date} · {author}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
