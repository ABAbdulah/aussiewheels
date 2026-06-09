export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readMins: number;
  image?: string;
};

const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

export const NEWS: Article[] = [
  { slug: "byd-dolphin-phev", title: "BYD Dolphin gains a plug-in hybrid variant for Australia", excerpt: "BYD expands its best-selling small car range with a PHEV powertrain, targeting buyers not yet ready to go fully electric.", category: "Car News", author: "Ken Gratton", date: "6 June 2026", readMins: 4, image: IMG("1617469767053-d3b523a0b982") },
  { slug: "ford-local-development", title: "Ford reaffirms its commitment to local Australian development", excerpt: "The Ranger and Everest will continue to be engineered and tuned for local conditions out of Ford's You Yangs facility.", category: "Industry", author: "Tom Baker", date: "4 June 2026", readMins: 5, image: IMG("1568844293986-8d0400bd4745") },
  { slug: "ev-incentives-2026", title: "Which states still offer EV incentives in 2026?", excerpt: "We break down the rebates, stamp-duty waivers and registration discounts available across Australia this year.", category: "EV News", author: "Alexandra Lawrence", date: "2 June 2026", readMins: 6, image: IMG("1593941707882-a5bba14938c7") },
  { slug: "used-prices-softening", title: "Used car prices continue to soften as supply normalises", excerpt: "Moody's data shows wholesale used values easing for the sixth straight month — good news for buyers.", category: "Market", author: "Scott Newman", date: "30 May 2026", readMins: 4, image: IMG("1549924231-f129b911e442") },
  { slug: "tasman-arrives", title: "Kia Tasman lands: can it really challenge the HiLux?", excerpt: "Kia's first ute touches down in Australia with bold styling and a sharp launch price.", category: "Car News", author: "Ken Gratton", date: "28 May 2026", readMins: 5, image: IMG("1605559424843-9e4c228bf1c2") },
  { slug: "safety-ratings-update", title: "ANCAP tightens 5-star criteria for 2026", excerpt: "Stricter requirements for active safety tech mean some popular models will need updates to keep their rating.", category: "Safety", author: "Alexandra Lawrence", date: "25 May 2026", readMins: 3, image: IMG("1502877338535-766e1452684a") },
];

export const ADVICE: Article[] = [
  { slug: "selling-checklist", title: "What you need to know when selling your car", excerpt: "From paperwork to pricing, here's everything to get sorted before you list.", category: "Selling", author: "Tom Baker", date: "1 June 2026", readMins: 7, image: IMG("1552519507-da3b142c6e3d") },
  { slug: "compelling-ad", title: "How to write a compelling car ad that sells", excerpt: "The words and details that turn browsers into buyers — and the mistakes to avoid.", category: "Selling", author: "Alexandra Lawrence", date: "29 May 2026", readMins: 5, image: IMG("1494976388531-d1058494cdd8") },
  { slug: "great-photos", title: "Tips for taking great photos of your car", excerpt: "Eight simple tips to make your listing stand out and attract more enquiries.", category: "Selling", author: "Scott Newman", date: "27 May 2026", readMins: 4, image: IMG("1503376780353-7e6692767b70") },
  { slug: "ev-before-buying", title: "What do I need to know before buying an EV?", excerpt: "Range, charging, running costs and resale — the essentials for first-time EV buyers.", category: "Buying", author: "Alexandra Lawrence", date: "24 May 2026", readMins: 8, image: IMG("1593941707882-a5bba14938c7") },
  { slug: "skip-first-service", title: "Will I void my warranty if I skip the first service?", excerpt: "What the law actually says about logbook servicing and your statutory rights.", category: "Ownership", author: "Tom Baker", date: "22 May 2026", readMins: 4, image: IMG("1542362567-b07e54358753") },
  { slug: "brokers-worth-it", title: "Are car brokers worth it?", excerpt: "We weigh up the pros, cons and costs of using a buyer's agent for your next car.", category: "Buying", author: "Ken Gratton", date: "20 May 2026", readMins: 5, image: IMG("1583121274602-3e2820c69888") },
];

export type Comparison = { slug: string; title: string; a: string; b: string; verdict: string; author: string; date: string; image?: string };

export const COMPARISONS: Comparison[] = [
  { slug: "hilux-vs-tasman", title: "Toyota HiLux SR5 vs Kia Tasman X-Line", a: "Toyota HiLux SR5", b: "Kia Tasman X-Line", verdict: "The Tasman undercuts on price and features, but the HiLux's resale and dealer network keep it ahead — just.", author: "Tom Baker", date: "5 June 2026", image: IMG("1605559424843-9e4c228bf1c2") },
  { slug: "modely-vs-zeekr", title: "Tesla Model Y vs Zeekr 7X", a: "Tesla Model Y", b: "Zeekr 7X", verdict: "Zeekr brings genuine luxury and tech, but Tesla's charging network and efficiency win the day.", author: "Alexandra Lawrence", date: "3 June 2026", image: IMG("1617469767053-d3b523a0b982") },
  { slug: "duster-vs-jimny", title: "Renault Duster 4x4 vs Suzuki Jimny", a: "Renault Duster 4x4", b: "Suzuki Jimny", verdict: "The Jimny is the character pick, but the Duster is the more usable everyday off-roader for families.", author: "Scott Newman", date: "31 May 2026", image: IMG("1568844293986-8d0400bd4745") },
  { slug: "rav4-vs-cx5", title: "Toyota RAV4 Hybrid vs Mazda CX-5", a: "Toyota RAV4 Hybrid", b: "Mazda CX-5", verdict: "The RAV4's hybrid efficiency is hard to beat, but the CX-5 still has the more premium cabin.", author: "Ken Gratton", date: "27 May 2026", image: IMG("1503376780353-7e6692767b70") },
];

export type OwnerReview = { id: string; car: string; rating: number; title: string; body: string; name: string; date: string };

export const OWNER_REVIEWS: OwnerReview[] = [
  { id: "o1", car: "2023 Toyota RAV4 GX Hybrid", rating: 5, title: "Sips fuel, does everything", body: "We've done 30,000km of family duty and it averages 4.9L/100km. Roomy, reliable and quiet. Couldn't be happier.", name: "Sarah", date: "2 June 2026" },
  { id: "o2", car: "2022 Tesla Model 3 RWD", rating: 4, title: "Brilliant to drive, watch the ride", body: "Performance and tech are incredible and charging at home is a game changer. Ride is a touch firm on rough roads.", name: "James", date: "29 May 2026" },
  { id: "o3", car: "2021 Ford Ranger Wildtrak", rating: 5, title: "Tough and comfortable", body: "Tows the van without breaking a sweat and the cabin is car-like. Best ute I've owned by a mile.", name: "Daniel", date: "26 May 2026" },
  { id: "o4", car: "2023 Kia EV6 Air", rating: 5, title: "Fast charging is the future", body: "10–80% in under 20 minutes on a road trip. Spacious, comfy and the 7-year warranty gives real peace of mind.", name: "Priya", date: "23 May 2026" },
  { id: "o5", car: "2021 Mazda CX-5 Maxx Sport", rating: 4, title: "Premium feel for the money", body: "Looks and feels more expensive than it is. Only wish it had a little more boot space for the pram.", name: "Mei", date: "20 May 2026" },
  { id: "o6", car: "2022 Volkswagen Golf R", rating: 5, title: "An everyday weapon", body: "Comfortable enough to commute, ballistic when you want it. The all-wheel drive grip is unreal.", name: "Tom", date: "18 May 2026" },
];
