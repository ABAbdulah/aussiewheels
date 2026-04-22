import Link from "next/link";

type BodyType = {
  label: string;
  href: string;
  svg: React.ReactNode;
};

/* Minimal car-silhouette paths — side profile view */
const SUVSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M14 24c0-3 1-10 4-13l8-4h24l8 4c3 3 4 10 4 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="20" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="60" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const HatchSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M20 24c0-3 2-9 5-11l8-5h14l10 8c2 2 3 5 3 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="22" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="58" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const UteSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M16 24c0-3 1-9 4-12l6-4h16v16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M42 8h20v16H42z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="20" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="60" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const EVSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M16 24c0-3 1-9 4-12l10-5h20l10 5c3 3 4 9 4 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="22" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="58" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M36 16l-3 5h6l-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HybridSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M16 24c0-3 1-9 4-12l10-5h20l10 5c3 3 4 9 4 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="22" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="58" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M34 16q4-3 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M37 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FourWDSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M12 24c0-3 1-11 5-14l8-3h30l8 3c4 3 5 11 5 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="18" cy="28" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="62" cy="28" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const PerfSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M10 24c0-2 2-7 5-9l12-6h26l12 6c3 2 5 7 5 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="20" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="60" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M32 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const NewCarsSVG = () => (
  <svg viewBox="0 0 80 36" fill="none" className="w-full" aria-hidden>
    <path d="M16 24c0-3 1-9 4-12l10-5h20l10 5c3 3 4 9 4 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M4 24h72v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" fill="currentColor" opacity={0.15}/>
    <circle cx="22" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="58" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M36 6l1.5 3h3.5l-2.5 2 1 3.5L37 13l-2.5 1.5 1-3.5L33 9h3.5z" fill="currentColor" opacity={0.7}/>
  </svg>
);

const bodyTypes: BodyType[] = [
  { label: "New cars", href: "/buy/cars?condition=new", svg: <NewCarsSVG /> },
  { label: "EV", href: "/buy/cars?fuel=electric", svg: <EVSVG /> },
  { label: "Hybrid", href: "/buy/cars?fuel=hybrid", svg: <HybridSVG /> },
  { label: "SUV", href: "/buy/cars?body=suv", svg: <SUVSVG /> },
  { label: "Ute", href: "/buy/cars?body=ute", svg: <UteSVG /> },
  { label: "Hatch", href: "/buy/cars?body=hatch", svg: <HatchSVG /> },
  { label: "Offroad 4x4", href: "/buy/cars?body=4x4", svg: <FourWDSVG /> },
  { label: "Performance", href: "/buy/cars?body=performance", svg: <PerfSVG /> },
];

export function BodyTypePicker() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-4 md:grid-cols-8">
      {bodyTypes.map(({ label, href, svg }) => (
        <Link
          key={label}
          href={href}
          className="group flex shrink-0 w-[88px] sm:w-auto flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:bg-accent"
        >
          <div className="w-16 text-foreground/50 transition-colors group-hover:text-primary group-hover:scale-105 transform duration-150">
            {svg}
          </div>
          <span className="text-xs font-light leading-tight">{label}</span>
        </Link>
      ))}
    </div>
  );
}
