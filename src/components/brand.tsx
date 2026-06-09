import Link from "next/link";
import { cn } from "@/lib/utils";

/** AussieWheels wordmark with a stylised speed/wheel glyph. */
export function Brand({
  className,
  href = "/",
  textClassName,
}: {
  className?: string;
  href?: string | null;
  textClassName?: string;
}) {
  const inner = (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="relative grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
          <path d="M12 4.8v3M12 16.2v3M4.8 12h3M16.2 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className={cn("text-[1.05rem] font-extrabold tracking-tight text-foreground", textClassName)}>
        Aussie<span className="text-brand">Wheels</span>
      </span>
    </span>
  );
  if (href === null) return inner;
  return (
    <Link href={href} className="shrink-0" aria-label="AussieWheels home">
      {inner}
    </Link>
  );
}
