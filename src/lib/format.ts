// Australian-locale formatting helpers.

export const fmtPrice = (n: number, opts: { decimals?: boolean } = {}) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: opts.decimals ? 2 : 0,
    minimumFractionDigits: opts.decimals ? 2 : 0,
  }).format(n);

/** Compact price for chips, e.g. $38,990 -> "$39k", $1,250,000 -> "$1.3m" */
export const fmtPriceCompact = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const fmtKm = (n: number) => `${new Intl.NumberFormat("en-AU").format(n)} km`;

export const fmtNumber = (n: number) => new Intl.NumberFormat("en-AU").format(n);

export const fmtPriceRange = (min: number, max: number) =>
  min === max ? fmtPrice(min) : `${fmtPrice(min)} – ${fmtPrice(max)}`;

/** "3 days ago" style relative time. */
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const day = 86_400_000;
  const days = Math.floor(diff / day);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days < 14 ? "" : "s"} ago`;
  return `${Math.floor(days / 30)} month${days < 60 ? "" : "s"} ago`;
}
