# AussieWheels — Web

The AussieWheels web frontend — a carsales.com.au-style marketplace with transparent pricing,
AI-assisted search, and verified sellers. The backend lives in a separate repo.

## Stack

- **Next.js 16** (App Router) with Turbopack
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with **shadcn/ui** components (copied into `src/components/ui/`)
- **next-themes** for light/dark mode
- **lucide-react** for icons
- **sonner** for toasts
- **Prettier** with `prettier-plugin-tailwindcss`

Deliberately kept lean — no TanStack Query, no Zustand, no heavy UI kits until they're needed.

## Folder layout

```
src/
├── app/                    # Next.js App Router routes
│   ├── layout.tsx          # Root layout (theme, header, footer)
│   ├── page.tsx            # Landing page
│   └── buy/[vertical]/     # /buy/cars, /buy/bikes, etc.
├── components/
│   ├── site-header.tsx     # Top nav
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/                 # shadcn/ui components (editable)
├── features/               # Feature-scoped modules
│   ├── search/hero-search.tsx
│   └── listings/listing-card.tsx
└── lib/
    ├── site.ts             # App-wide constants (verticals, site name)
    └── utils.ts            # `cn` helper
```

## Scripts

```bash
npm run dev          # http://localhost:3000 with Turbopack
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

Components land in `src/components/ui/` — edit them freely.

## Environment variables

Copy `.env.example` to `.env.local` and adjust. The `NEXT_PUBLIC_API_URL` points to the backend
(separate repo).

## Docs

- [`docs/carsales-clone-analysis.md`](docs/carsales-clone-analysis.md) — product analysis and
  stack rationale.
- [`docs/carsales-clone-analysis.docx`](docs/carsales-clone-analysis.docx) — same content, Word
  format.
