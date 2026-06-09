import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumb,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-primary text-primary-foreground", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,109,164,0.45),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
        {breadcrumb && (
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-primary-foreground/70">
            {breadcrumb.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {b.href ? <Link href={b.href} className="hover:text-primary-foreground">{b.label}</Link> : <span>{b.label}</span>}
                {i < breadcrumb.length - 1 && <ChevronRight className="size-3" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-primary-foreground/80">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export type ContentBlock = { heading?: string; paragraphs?: string[]; bullets?: string[] };

export function ContentPage({
  title,
  subtitle,
  updated,
  blocks,
}: {
  title: string;
  subtitle?: string;
  updated?: string;
  blocks: ContentBlock[];
}) {
  return (
    <div className="pb-20">
      <PageHero title={title} subtitle={subtitle} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        {updated && <p className="mb-8 text-xs text-muted-foreground">Last updated {updated}</p>}
        <div className="space-y-8">
          {blocks.map((b, i) => (
            <section key={i}>
              {b.heading && <h2 className="text-lg font-bold tracking-tight text-foreground">{b.heading}</h2>}
              {b.paragraphs?.map((p, j) => (
                <p key={j} className="mt-2 leading-relaxed text-foreground/80">{p}</p>
              ))}
              {b.bullets && (
                <ul className="mt-3 space-y-1.5">
                  {b.bullets.map((li, j) => (
                    <li key={j} className="flex gap-2 text-foreground/80">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" /> {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
