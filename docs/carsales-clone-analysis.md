# AussieWheels — carsales.com.au Clone: Analysis, Differentiation, and Tech Stack

> Deep analysis of carsales.com.au, proposed feature set for an AussieWheels clone (web + mobile), differentiation opportunities, and recommended technology stack.
>
> Prepared: 2026-04-22

---

## 1. Executive Summary

carsales.com.au (operated by **Car Group Ltd**, ASX: CAR) is Australia's #1 automotive classifieds marketplace, founded 1997, with ~220,000+ active listings, ~1M+ monthly active app users, and reported revenue of **A$781M (up 53% YoY)**. It is a two-sided marketplace: **buyers** (free) and **sellers** (private, dealer, OEM), monetised via listing fees, per-lead fees, display advertising, and data/SaaS products for dealers.

To build a credible clone ("AussieWheels"), we must match carsales' breadth across **11 vehicle verticals** (cars, bikes, boats, trucks, caravans, etc.), its **search/filter depth**, its **seller funnel** (Snap-n-Sell, Instant Offer, live ad stats), and its **research/editorial content** — while differentiating on **AI-native UX, transparent pricing, trust & safety, and richer buyer tools**.

Recommended stack:

- **Web:** Next.js 15 + React 19 + TypeScript
- **Mobile:** React Native 0.77+ (New Architecture: Fabric + TurboModules) with Expo
- **Backend:** Node.js (NestJS) for BFF/API + Go microservices for high-throughput search/lead routing
- **Data:** PostgreSQL (primary), Elasticsearch/OpenSearch (listing search), Redis (cache/sessions), S3/Cloudfront (media), ClickHouse (analytics)
- **AI layer:** Claude Sonnet 4.6 for conversational search & listing assistant; Claude Haiku 4.5 for low-latency autocomplete & moderation
- **Infra:** AWS (ap-southeast-2 Sydney) or GCP, Terraform, Kubernetes (EKS/GKE)

Rationale and trade-offs detailed in §7–8.

---

## 2. carsales.com.au Site Anatomy

### 2.1 Vehicle verticals (each a separate listings domain/section)

| Vertical              | URL pattern                     | Scope                              |
|-----------------------|----------------------------------|------------------------------------|
| Cars                  | /cars/                           | New, used, demo — passenger        |
| Motorcycles           | /bikes/                          | Road, off-road, cruiser, ATV       |
| Boats / Marine        | boatsales.com.au                 | Power, sail, jet ski, tender       |
| Trucks                | trucksales.com.au                | Light/medium/heavy, prime movers   |
| Caravans & Campers    | caravancampingsales.com.au       | Caravans, camper trailers, motorhomes |
| Industrial / Plant    | constructionsales.com.au         | Earthmoving, forklifts, ag equipment |
| Farm machinery        | farmmachinerysales.com.au        | Tractors, harvesters               |
| Tyres                 | tyresales.com.au                 | Tyre marketplace + fitting         |
| Dealer services       | (B2B)                            | Listings mgmt, data products       |
| Finance               | /finance/                        | Comparison + brokered              |
| Insurance             | /insurance/                      | Comprehensive, CTP                 |

> Note: Car Group also owns / operates international brands (encar.com KR, webmotors.com.br, Trader Interactive US). We target AU-only for v1.

### 2.2 Primary user personas

1. **Private buyer** — researching, comparing, shortlisting, contacting
2. **Private seller** — listing, pricing, responding to enquiries
3. **Dealer (inventory mgr / sales)** — bulk inventory, lead inbox, analytics
4. **OEM / brand marketer** — display ads, showroom content, research insights
5. **Researcher / enthusiast** — reviews, news, specs, comparisons (no immediate intent)

### 2.3 Homepage composition (observed)

- Global utility bar (Sign in, Saved, Inbox, Sell)
- Primary nav: **Buy · Sell · Research · Showroom · News & Reviews · Finance · Insurance**
- Hero search: Make/Model/Price/Location + **"Ask carsales AI"** natural-language search
- Promoted tiles: new launches, special offers, popular body types
- "For you" recommendations (if logged in): based on saved searches & view history
- Editorial rails: latest reviews, best-of lists, "New Car Calendar", video reviews
- Showroom / OEM-branded sections (paid)
- Trust strip: "220,000+ listings", awards, app download QR

---

## 3. Core Features Inventory

### 3.1 Buyer-side features

#### Search & Discovery
- **Keyword + make/model/variant/badge** search with autocomplete
- **Multi-select** filters: make, model, body type, transmission, fuel, drivetrain, seats, doors, colour
- **Range filters:** price, year, kilometres, engine size, cylinders, power (kW), fuel economy (L/100km)
- **Feature filters** (≥50+): Apple CarPlay, Android Auto, sunroof, tow bar, heated seats, AEB, adaptive cruise, sat-nav, 360° camera, 3-row seating, etc.
- **Location radius** + state/suburb + postcode
- **Saved searches** with email/push alerts on new matches
- **Recently viewed** / shortlist / compare (up to 4 side-by-side)
- **Sort:** price, km, year, distance, relevance, newest, "best match"
- **Map view** (dealer proximity)
- **Ask carsales AI** — natural-language search ("family SUV under $40k with low km")
- **AI Voice Search** (introduced 2024/25)

#### Listing Detail Page (LDP / VDP)
- Gallery (photos + 360° interior spin + video walk-around where available)
- Price, price history, "great/fair/high" price indicator vs market
- Full spec sheet (trim, engine, transmission, features, options)
- Seller block: dealer name/logo/rating or private seller flag
- **Contact:** phone (click-to-call), SMS, message form, WhatsApp (some dealers)
- **Finance calculator:** monthly repayment estimator (carsales Finance CTA)
- **Virtual Test Drive** & **Interactive Brochure** (OEM-funded)
- Comparable listings rail
- Report ad / report scam
- PPSR check offer, vehicle history report (paid)
- Inspection booking (PPI partner)
- Trade-in valuation (RedBook integrated)

#### Research & Editorial
- **Car Reviews** (expert, owner, video)
- **News** — industry, launches, recalls
- **Advice** — buying, selling, ownership guides
- **Compare up to 4 cars** (specs side-by-side)
- **Showroom** — by make, body type, "best-of" lists
- **New Car Calendar** — upcoming releases
- **Car of the Year** awards
- **Specs database** — every trim back ~15 years

#### Account / Member Centre
- Profile & preferences
- Saved cars, saved searches, saved dealers
- Alerts (email + push)
- Message inbox (buyer ↔ seller threads)
- Enquiry history
- Owner review submissions
- Car Valuations history

### 3.2 Seller-side features

#### Private sellers
- **List in minutes** — guided flow: rego/VIN lookup → auto-fill specs → photos → price → description
- **Snap-n-Sell** (mobile) — take photos in-app, auto-crop/order
- **Price guide** — recommended price range based on comparable sold/live ads
- **Instant Offer** — sell to accredited dealer within 24h at carsales-valued price (carsales takes margin)
- **Packages:** Basic / Plus / Premium / Ultimate (boost, feature, extended duration)
- **Live ad stats:** views, enquiries, saves, CTR; tips to improve
- **Edit anytime**, pause, re-list
- **Secure messaging** (email masking, phone reveal rules)

#### Dealer features
- Bulk inventory upload (XML/CSV feeds, DMS integrations: ADP, Pentana, Autoline, Eagers)
- Lead CRM integration (Titan, DealerSocket, VinSolutions)
- Ignition ad platform (display, video, in-feed, virtual test drive)
- Dealer analytics dashboard (impressions, leads, cost-per-lead)
- Inventory health tools (ageing stock alerts, price position)
- Video walkarounds & 360° photo capture
- Dealer-branded showroom pages
- Review management

### 3.3 Ancillary services / revenue streams

- **Finance:** pre-approval, comparison, brokered loans (commission)
- **Insurance:** comprehensive quotes (referral fee)
- **Warranty:** extended warranty products
- **Inspection:** PPI bookings (partner marketplace)
- **PPSR / history reports** (paid)
- **Tyres:** cross-sell to tyresales.com.au
- **Display advertising:** homepage takeovers, LDP banners, research-page sponsorship
- **Data products:** RedBook valuations API, market insights for dealers/OEMs

### 3.4 Trust & safety

- Account verification (email, SMS OTP)
- Scam detection / reporting
- Email/phone masking for private sellers
- Moderation (automated + manual) on listings & messages
- Dealer accreditation badges
- Review & rating of dealers (owner reviews)
- Price anomaly warnings (too-low-to-be-true flags)

---

## 4. UX & Design Observations

### Strengths
- **Cross-device consistency** — identical IA across web, mobile web, iOS, Android
- **Progressive disclosure** — homepage search is minimal; power-user filters accessible via "more filters"
- **Multi-select** everywhere (makes, models, body types) — users can cast wide nets
- **Speed** — highly optimised listing pages (CWV-tuned: LCP < 2.5s)
- **Strong information scent** — listing cards show price, km, year, transmission, fuel, location, "great price" badge at a glance
- **Editorial trust** — independent-feeling review content lends credibility to classifieds
- **Mobile-first selling flow** — Snap-n-Sell is conversion-optimised

### Weaknesses & user-reported pain points
(Sources: ProductReview.com.au, Trustpilot, Whirlpool forums)

1. **High private-seller fees** — Basic ads ~A$60–100, premium up to ~A$300; users feel ROI is poor vs Facebook Marketplace/Gumtree
2. **Scam/spam enquiries** — private sellers report 20–30 scam enquiries/day; filtering is insufficient
3. **Dealer bias** — dealers appear to get placement priority over private sellers
4. **Interior colour not filterable** (keyword-search workaround only)
5. **No filter for imported vs compliance-plate cars** (grey-import complexity)
6. **Price-guide opacity** — users don't understand why "fair/great" labels are applied
7. **Customer service** — slow support response, refund friction
8. **Listing duration clarity** — confusion when ads expire silently
9. **Privacy incidents** — private names occasionally exposed
10. **12-char PIN for basic accounts** seen as friction

These are our differentiation opportunities.

---

## 5. AussieWheels Clone — Proposed Feature Set

### 5.1 Parity features (must-have for v1)

- 11 vehicle verticals (launch with Cars + Bikes + Caravans; add Boats/Trucks in v1.1)
- All buyer search/filter/sort features in §3.1
- LDP with gallery, specs, price indicator, contact, comparables
- Private seller listing flow (rego lookup → auto-fill → photos → price → description)
- Dealer portal with bulk upload, inventory, analytics
- Member Centre: saved searches, alerts, inbox, history
- Editorial: reviews, news, advice
- Mobile apps (iOS + Android) with Snap-n-Sell equivalent
- Finance + Insurance leads (brokered, revenue share)
- Price valuation (integrate RedBook or build via data scraping + ML)

### 5.2 Differentiators — how we stand out

1. **AI-native throughout**
   - **Conversational buyer assistant** ("Show me reliable family SUVs under $35k with AEB") — Claude Sonnet 4.6 with tool-use over our listings index
   - **Auto-generated listing descriptions** from photos + rego lookup (Snap-n-Sell → Claude → polished ad copy in 15s)
   - **AI scam-detection** on enquiries (Claude Haiku 4.5 moderating inbound messages in real time)
   - **Price-guide transparency** — explainable AI ("Your 2019 RAV4 GX is priced ~A$2,300 above comparable sold ads because: [reasons]")

2. **Transparent pricing & flat fees**
   - Single flat fee for private sellers (A$39 until sold, or tiered with clear boosts) — attacks carsales' #1 complaint
   - No per-enquiry dealer fees hidden from buyers; transparent lead attribution

3. **Trust layer (major differentiator)**
   - Optional **ID-verified seller** badge (Stripe Identity / OCR + liveness)
   - **In-app secure messaging** with carrier-verified phone badges (never expose raw numbers)
   - **Enquiry reputation score** for buyers — reduces scam/spam load on sellers
   - **Escrow option** for private sales (partner: PayID/PEXA for titles)

4. **Richer buyer tools**
   - **Compare up to 6** (vs 4) with overlaying spec deltas
   - **Total cost of ownership** calculator (fuel + rego + insurance + service + depreciation over 3/5 years)
   - **Reliability score** from aggregated owner reviews + recall data
   - **Service history uploads** (PDF → AI extraction → structured timeline)

5. **Community & accountability**
   - Verified-owner reviews tied to listing history (can't review a car you've never owned via us)
   - Dealer review with response-rate & avg-reply-time SLAs surfaced

6. **Modern media**
   - 360° photo capture with phone (gyro-guided), generated walkaround video from 12 photos
   - Live video call tours between buyer and private seller (WebRTC)

7. **Sustainability lens**
   - EV / hybrid dedicated hub with charging-cost calculator, range-at-your-location, rebate info
   - CO₂ emissions & fuel-cost transparency on every LDP

8. **Developer/data openness**
   - Public API for researchers (rate-limited, read-only) — goodwill + SEO

### 5.3 Out-of-scope for v1

- International expansion
- Auctions (Pickles/Manheim territory)
- Full DMS replacement
- Dealer financing-as-a-service

---

## 6. Information Architecture & Core Flows

### 6.1 Sitemap (web)

```
/
├── /buy
│   ├── /cars, /bikes, /caravans, /boats, /trucks, /industrial, /farm, /tyres
│   ├── /:vertical/:make/:model/:variant/
│   ├── /:vertical/used, /new, /demo
│   └── /listing/:id
├── /sell
│   ├── /create  (multi-step wizard)
│   ├── /my-listings
│   ├── /instant-offer
│   └── /valuation
├── /research
│   ├── /reviews (expert, owner, video)
│   ├── /news
│   ├── /advice
│   ├── /compare
│   ├── /showroom/:make
│   └── /new-car-calendar
├── /finance
├── /insurance
├── /inspections
├── /dealer  (B2B portal)
├── /account  (Member Centre)
│   ├── /saved, /alerts, /inbox, /history, /settings
└── /api (public, v1 read-only)
```

### 6.2 Critical user journeys

1. **Buyer research → contact** (< 3 min): Home search → results → LDP → save → contact seller
2. **Private listing creation** (< 5 min, mobile): Open app → Snap-n-Sell → rego lookup → photos → AI-drafted description → price suggestion → publish
3. **Dealer bulk upload**: Nightly XML feed from DMS → parse/enrich/dedupe → publish with diff report
4. **Instant Offer**: Seller submits VIN + condition → real-time valuation → accept → transport pickup booking

---

## 7. Recommended Technology Stack

### 7.1 Stack overview

| Layer              | Choice                                                   | Why |
|--------------------|----------------------------------------------------------|-----|
| **Web frontend**   | Next.js 15 (App Router) + React 19 + TypeScript          | SSR/ISR for SEO-critical listing pages; RSC reduces JS payload; largest ecosystem |
| **Mobile**         | **React Native 0.77+** + Expo + TypeScript               | Code-share with web (70%+ hooks, logic, API clients); New Architecture (Fabric + TurboModules) closes perf gap; hiring pool huge |
| **Styling**        | Tailwind CSS + shadcn/ui on web; NativeWind on mobile    | Consistent design tokens; fast iteration |
| **State/data**     | TanStack Query + Zustand; URL state via nuqs             | Server-state and client-state cleanly separated |
| **BFF / API**      | NestJS (Node 22, TypeScript) — GraphQL (Apollo) + REST   | Team velocity; schema-typed end-to-end with codegen |
| **High-throughput services** | Go 1.23 for search API, lead router, image pipeline | Low latency, low memory; Go is the right tool for hot paths |
| **Primary DB**     | PostgreSQL 17 (RDS / CloudSQL)                            | Transactions, JSONB for flexible specs, pgvector for embeddings |
| **Search**         | OpenSearch / Elasticsearch 8                              | Faceted multi-select, geo, synonyms, ranking — table-stakes for this domain |
| **Cache**          | Redis 7 (ElastiCache)                                     | Sessions, rate limiting, hot listings |
| **Events / queue** | Kafka (MSK) or Pulsar; BullMQ for in-process jobs        | Listing ingestion, lead fanout, analytics |
| **Analytics DW**   | ClickHouse                                                | Dealer dashboards, funnel analytics |
| **Object storage** | S3 + CloudFront + imgproxy/Thumbor                        | Photo/video with on-the-fly resize/WebP/AVIF |
| **AI**             | Anthropic Claude — Sonnet 4.6 for conversation/gen; Haiku 4.5 for moderation/autocomplete; embeddings via Voyage AI | Best-in-class reasoning; prompt caching for cost |
| **Auth**           | Clerk or Auth0 (buyer) + custom SSO (dealer portal)       | OTP, social, passkeys out of the box |
| **Payments**       | Stripe (AUD, Apple/Google Pay, PayID)                     | Listing fees + subscriptions |
| **Maps**           | Mapbox GL                                                 | Cheaper + more customisable than Google Maps at scale |
| **Observability**  | Datadog or Grafana Cloud + Sentry                         | APM, RUM, logs, errors |
| **Infra / IaC**    | AWS (Sydney ap-southeast-2) + Terraform + Kubernetes (EKS) + ArgoCD | Data residency (Privacy Act), mature AU region |
| **CI/CD**          | GitHub Actions; Expo EAS for mobile builds                | Standard, fast |
| **Testing**        | Vitest, Playwright (web), Maestro (mobile), k6 (load)    | Modern, parallelisable |

### 7.2 React Native vs Flutter — decision

**Recommendation: React Native** (unless we can hire a Flutter-first team).

| Criterion               | React Native 0.77+                                  | Flutter 3.27+                                    |
|-------------------------|------------------------------------------------------|--------------------------------------------------|
| Performance             | Very good since JSI/New Arch (2024). Frame rates comparable for data-heavy list/card UIs. | Best-in-class rendering (Impeller). ~50% faster rasterisation in complex scenes. |
| Code share with web     | **High — up to 70%** (React, hooks, TS, TanStack Query, API clients, form libs) | Low — Dart/Flutter Web is niche; business logic can be shared via Dart but not with a React web app |
| Hiring (AU market)      | **Huge** — any React dev ramps up in weeks          | Smaller pool; growing but Dart is single-purpose |
| Ecosystem               | NPM; mature libs for everything we need             | pub.dev; growing but some marketplace/classifieds libs missing |
| Native module access    | Good (TurboModules). Some native work for 360°/ARKit still needed. | Excellent platform-channel story; Impeller for custom graphics |
| Design consistency      | Platform-idiomatic look by default (iOS vs Android differ slightly) | Pixel-identical across platforms |
| OTA updates             | Expo Updates — excellent                            | Shorebird (paid) or custom |
| Precedent               | Shopify Shop, Discord, Facebook Marketplace, Coinbase | eBay Motors, BMW, Alibaba Xianyu |

**Why React Native wins for us:**
1. **70% code reuse with the Next.js web app** — massive efficiency. Shared TS types from GraphQL codegen, shared validation schemas (Zod), shared API clients, shared business logic. One team, two apps.
2. **Hiring velocity** — we already plan React/TS web. The same engineer contributes to mobile after a ~2-week ramp.
3. **New Architecture closes the perf gap** — for a listings/cards/forms app (not a game or heavy animation), differences are imperceptible to users.
4. **Expo EAS** — OTA JS updates push in minutes, not days of store review. Huge for copy, pricing, and fraud-rule fixes.

**When we'd pick Flutter instead:** if >40% of the app is custom graphics/animation, if we already have Flutter engineers, or if pixel-perfect cross-platform visual identity is a hard product requirement.

### 7.3 Web stack — why Next.js + React + TypeScript

- **SEO is existential** — 60%+ of carsales' buyer traffic lands on a make/model or variant page from Google. Next.js's **ISR** (Incremental Static Regeneration) gives us CDN-fast listings with fresh inventory.
- **Server Components** cut JS payload on content-heavy LDPs (gallery, spec sheets, reviews) where interactivity is partial.
- **TypeScript end-to-end** — GraphQL codegen → types flow from Postgres → API → web → mobile with no drift.
- **Vercel or self-hosted on EKS** — both supported; we'll self-host on EKS in AU region for data residency.

### 7.4 Why PostgreSQL + OpenSearch (not Mongo, not a single DB)

- **PostgreSQL is source of truth** — ACID transactions on money (listing payments, dealer invoices), strong relational modelling (listings, users, orgs, leads, messages), JSONB for flexible spec bags, pgvector for ML features.
- **OpenSearch is the search layer** — faceted search, multi-select filters, geo, synonym/typo tolerance, relevance ranking are table-stakes for this domain and specifically where Postgres FTS falls down at scale.
- **CDC from Postgres → OpenSearch** via Debezium + Kafka. Listing changes propagate in < 1s.
- **Redis** fronts hot queries (popular searches, homepage).
- **ClickHouse** for analytics — dealer dashboards querying billions of impression/click events.

### 7.5 Why Claude for AI

- Conversational search requires strong reasoning + tool-use. Claude Sonnet 4.6 is top-tier at structured tool calls over a search index.
- **Prompt caching** cuts cost ~80% on repeated system prompts (our listing schema, filter vocabulary, brand guardrails) — essential for a consumer app doing millions of calls.
- **Haiku 4.5** handles high-volume, latency-sensitive jobs (message moderation, autocomplete, spam classification) at a fraction of the cost.
- Embeddings via **Voyage AI** (Anthropic-recommended) for semantic search / similar-car suggestions.

### 7.6 Infrastructure & compliance

- **Region:** AWS ap-southeast-2 (Sydney) — Australian Privacy Act / APP compliance, keeps PII onshore.
- **Kubernetes (EKS)** for services; serverless (Lambda) for glue jobs and webhooks.
- **Terraform + Atlantis** for IaC + review gates.
- **PCI-DSS SAQ-A** via Stripe-hosted payments (no card data touches us).
- **Consumer Data Right (CDR)** readiness for future finance open-banking flows.
- **Spam/fraud:** Cloudflare Turnstile + device fingerprinting + Claude Haiku moderation layer.

---

## 8. Build Phases (indicative)

| Phase        | Duration | Scope                                                                 |
|--------------|----------|-----------------------------------------------------------------------|
| **0 — Foundation** | 4 wks    | Monorepo (Turborepo), CI/CD, infra, design system, auth             |
| **1 — Core buy/sell (Cars)** | 12 wks   | Listings ingest, search (OpenSearch), LDP, private seller flow, Member Centre, basic dealer portal |
| **2 — Mobile apps**           | 8 wks (parallel from wk 6) | RN app with Snap-n-Sell, saved/alerts, push |
| **3 — Research & editorial**  | 6 wks    | Reviews CMS, news, compare, showroom                                |
| **4 — AI layer**              | 6 wks    | Conversational search, listing assistant, price-guide explain, moderation |
| **5 — Finance/Insurance/Inspection** | 4 wks    | Partner integrations, lead routing                                 |
| **6 — Verticals (bikes, caravans)** | 6 wks    | Schema extension, vertical-specific filters, content               |
| **7 — Dealer scale**          | 8 wks    | DMS feeds, CRM integrations, Ignition-style ad products, analytics |

**Total to MVP (Phases 0–2):** ~24 weeks with a team of 8 (2 backend, 2 web, 2 mobile, 1 platform, 1 design) plus PM.

---

## 9. KPIs to track from day one

- **Marketplace health:** listings created/day, time-to-first-enquiry, % listings with ≥1 enquiry in 7d
- **Buyer funnel:** search → LDP → contact rate; save rate; alert CTR
- **Seller satisfaction:** time-to-sell distribution, NPS, re-list rate, spam-enquiry rate
- **Dealer value:** cost-per-lead, lead-to-test-drive %, inventory days-on-market
- **AI:** conversational-search CTR vs filter CTR; AI-drafted-ad acceptance rate; moderation false-positive rate
- **Reliability:** search p95 < 300ms, LDP LCP < 2.0s, mobile app cold start < 1.5s

---

## 10. Risks & open questions

- **Cold-start inventory.** A marketplace is worthless empty. Seed strategies: buy dealer XML feeds, scrape public data where legal, free tier for first 12 months to private sellers, paid seeding of dealer groups in AU.
- **SEO moat.** carsales has 20+ years of domain authority on every make/model/variant long-tail. We need a content strategy (AI-assisted editorial + structured data + unique owner-review depth) from day one.
- **Data licensing.** RedBook is the dominant valuations provider and carsales owns it. We'll need to either license RedBook, partner with a competitor (Glass's Guide), or build our own valuations engine from scraped/aggregated public data + ML.
- **App store risk.** Any dependence on Apple/Google review cycles is mitigated by Expo OTA for non-binary changes.
- **Fraud scaling.** Trust is our wedge; if scam rates approach carsales' levels, we've lost the wedge. Heavy investment in moderation from v1.

---

## 11. References

- carsales.com.au — main site and app page
- Apple App Store / Google Play listings (4.5★, 1M+ MAU)
- ProductReview.com.au and Trustpilot reviews
- Car Group investor reports, AFR / SmartCompany / BusinessNewsAustralia
- "Constructing a carsales-like marketplace" — Medium (Kevin Finnerty)
- Framework comparisons: DiscreteLogix, AnalyticsInsight, RubyroidLabs, TechAhead (2026)
- Anthropic Claude documentation (Sonnet 4.6 / Haiku 4.5)

*End of document.*
