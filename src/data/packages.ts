// Best Seller packages — full catalog mirrored from gogalapagos.com/best-sellers
// Families GO 1 → GO 7, each with its available durations.

import shipLegend from "@/assets/ship-legend.jpg";
import shipCoral1 from "@/assets/ship-coral1.jpg";
import shipCoral2 from "@/assets/ship-coral2.jpg";
import itineraryMap from "@/assets/itinerary-map.jpg";

export type ItineraryDay = {
  day: string;
  items: { when: string; text: string; flight?: boolean }[];
};

export type CruiseItinerary = {
  code: string;          // "North Loop (D)"
  duration: string;      // "4 days / 3 nights"
  map: string;
  days: ItineraryDay[];
};

export type PackageService = {
  day: number;
  order: number;
  type: string;
  service: string;
};

export type BestSellerPackage = {
  slug: string;
  code: string;          // GO 1
  family: string;        // GO 1: Galapagos Cruise & Colonial Quito
  title: string;
  subtitle: string;
  cover: string;
  packageDuration: string;   // 7 days / 6 nights
  cruiseDuration: string;    // 4 days / 3 nights
  fromUSD: number;
  highlights: string[];
  itinerary: CruiseItinerary;
  services: PackageService[];
  includes: string[];
};

export const itineraryMapSrc = itineraryMap;

const northLoop: CruiseItinerary = {
  code: "North Loop (D)",
  duration: "4 days / 3 nights",
  map: itineraryMap,
  days: [
    { day: "Monday", items: [{ when: "", text: "Baltra Airport", flight: true }, { when: "PM", text: "Black Turtle Cove (Santa Cruz Island)" }] },
    { day: "Tuesday", items: [{ when: "AM", text: "El Barranco, Prince Philip's Steps (Genovesa Island)" }, { when: "PM", text: "Darwin Bay (Genovesa Island)" }] },
    { day: "Wednesday", items: [{ when: "AM", text: "South Plaza Island" }, { when: "PM", text: "Santa Fe Island" }] },
    { day: "Thursday", items: [{ when: "AM", text: "Highlands (Santa Cruz Island)" }, { when: "", text: "Baltra Airport", flight: true }] },
  ],
};

const southLoop: CruiseItinerary = {
  code: "South Loop (C)",
  duration: "5 days / 4 nights",
  map: itineraryMap,
  days: [
    { day: "Thursday", items: [{ when: "", text: "Baltra Airport", flight: true }, { when: "PM", text: "Highlands (Santa Cruz Island)" }] },
    { day: "Friday", items: [{ when: "AM", text: "Punta Suárez (Española Island)" }, { when: "PM", text: "Gardner Bay (Española Island)" }] },
    { day: "Saturday", items: [{ when: "AM", text: "Post Office Bay (Floreana Island)" }, { when: "PM", text: "Devil's Crown (Floreana Island)" }] },
    { day: "Sunday", items: [{ when: "AM", text: "Interpretation Center (San Cristóbal)" }, { when: "PM", text: "Cerro Colorado (San Cristóbal)" }] },
    { day: "Monday", items: [{ when: "AM", text: "Isla Lobos" }, { when: "", text: "San Cristóbal Airport", flight: true }] },
  ],
};

const westLoop: CruiseItinerary = {
  code: "West Loop (A)",
  duration: "8 days / 7 nights",
  map: itineraryMap,
  days: [
    { day: "Monday", items: [{ when: "", text: "Baltra Airport", flight: true }, { when: "PM", text: "Black Turtle Cove (Santa Cruz Island)" }] },
    { day: "Tuesday", items: [{ when: "AM", text: "Punta Vicente Roca (Isabela Island)" }, { when: "PM", text: "Punta Espinoza (Fernandina Island)" }] },
    { day: "Wednesday", items: [{ when: "AM", text: "Urbina Bay (Isabela Island)" }, { when: "PM", text: "Tagus Cove (Isabela Island)" }] },
    { day: "Thursday", items: [{ when: "AM", text: "Rábida Island" }, { when: "PM", text: "Bartolomé Island" }] },
    { day: "Friday", items: [{ when: "AM", text: "Sullivan Bay (Santiago Island)" }, { when: "PM", text: "North Seymour Island" }] },
    { day: "Saturday", items: [{ when: "AM", text: "South Plaza Island" }, { when: "PM", text: "Santa Fe Island" }] },
    { day: "Sunday", items: [{ when: "AM", text: "Dragon Hill (Santa Cruz Island)" }, { when: "PM", text: "Highlands (Santa Cruz Island)" }] },
    { day: "Monday", items: [{ when: "AM", text: "Mosquera Islet" }, { when: "", text: "Baltra Airport", flight: true }] },
  ],
};

const amazonLoop: CruiseItinerary = {
  code: "Amazon Expedition",
  duration: "4 days / 3 nights",
  map: itineraryMap,
  days: [
    { day: "Day 1", items: [{ when: "", text: "Quito – Coca flight", flight: true }, { when: "PM", text: "Napo River transfer to the lodge" }] },
    { day: "Day 2", items: [{ when: "AM", text: "Parrot clay lick & primary forest walk" }, { when: "PM", text: "Canopy tower & night canoe" }] },
    { day: "Day 3", items: [{ when: "AM", text: "Kichwa community visit" }, { when: "PM", text: "Creek kayaking & wildlife spotting" }] },
    { day: "Day 4", items: [{ when: "AM", text: "Return along the Napo River" }, { when: "", text: "Coca – Quito flight", flight: true }] },
  ],
};

type CruiseKey = 4 | 5 | 8 | 0;
const loopFor = (k: CruiseKey) => (k === 4 ? northLoop : k === 5 ? southLoop : k === 8 ? westLoop : amazonLoop);

const baseServices = (cruiseLabel: string, lastDay: number, preDays: number): PackageService[] => {
  const rows: PackageService[] = [
    { day: 1, order: 1, type: "Transfer", service: "Transfer IN Quito (Airport – Hotel)" },
    { day: 1, order: 2, type: "Hotel", service: "GO Quito Hotel" },
  ];
  for (let d = 2; d <= preDays; d++) {
    rows.push({ day: d, order: 1, type: "Land Tour", service: d === 2 ? "Colonial Quito Plus Middle of the World" : "Mainland Ecuador excursion" });
    rows.push({ day: d, order: 2, type: "Hotel", service: "GO Quito Hotel" });
  }
  rows.push({ day: preDays + 1, order: 1, type: "Transfer", service: "Shuttle Service OUT from Quito / Baltra" });
  rows.push({ day: preDays + 1, order: 2, type: "Galapagos Cruise", service: cruiseLabel });
  rows.push({ day: lastDay - 1, order: 1, type: "Transfer", service: "Shuttle Service IN / Baltra" });
  rows.push({ day: lastDay - 1, order: 2, type: "Hotel", service: "GO Quito Hotel" });
  rows.push({ day: lastDay, order: 1, type: "Transfer", service: "Transfer OUT Quito (Hotel – Airport)" });
  return rows;
};

const includes = [
  "Pre-cruise nights at GO Quito Hotel",
  "1 night post-cruise at GO Quito Hotel",
  "All transfers in Quito and Galápagos",
  "All meals onboard + excursions",
  "Bilingual naturalist guides",
];

const HS = "https://2952060.fs1.hubspotusercontent-na1.net/hub/2952060/hubfs/_Website%20-%20GoGalapagos/Packages";

type Seed = {
  slug: string; code: string; family: string; title: string; subtitle: string;
  cover: string; days: number; nights: number; cruise: CruiseKey; from: number;
  highlights: string[]; preDays: number;
};

const seeds: Seed[] = [
  // ── GO 1 ─────────────────────────────────────────────
  {
    slug: "go1-7d", code: "GO 1", family: "GO 1: Galapagos Cruise & Colonial Quito",
    title: "GO 1: Galapagos Cruise & Colonial Quito",
    subtitle: "A journey through time and nature's wonders · 7D",
    cover: `${HS}/Packages%20general/galapagos-experience-1.webp?width=1080&name=galapagos-experience-1.webp`,
    days: 7, nights: 6, cruise: 4, from: 3053, preDays: 2,
    highlights: ["3 days in Quito", "4 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go1-8d", code: "GO 1", family: "GO 1: Galapagos Cruise & Colonial Quito",
    title: "GO 1: Galapagos Cruise & Colonial Quito",
    subtitle: "Colonial Quito plus a longer expedition · 8D",
    cover: `${HS}/Packages%20general/dragon-hill-2.webp?width=1225&name=dragon-hill-2.webp`,
    days: 8, nights: 7, cruise: 5, from: 3920, preDays: 2,
    highlights: ["3 days in Quito", "5 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go1-11d", code: "GO 1", family: "GO 1: Galapagos Cruise & Colonial Quito",
    title: "GO 1: Galapagos Cruise & Colonial Quito",
    subtitle: "The full archipelago from colonial Quito · 11D",
    cover: `${HS}/Packages%20general/galapagos-snorkeling-bestsellers.webp?width=650&name=galapagos-snorkeling-bestsellers.webp`,
    days: 11, nights: 10, cruise: 8, from: 5984, preDays: 2,
    highlights: ["3 days in Quito", "8 days onboard (Galápagos)", "All meals included onboard"],
  },
  // ── GO 2 ─────────────────────────────────────────────
  {
    slug: "go2-9d", code: "GO 2", family: "GO 2: Galapagos Cruise & Andean Cross-Culture Experience",
    title: "GO 2: Galapagos Cruise & Andean Cross-Culture",
    subtitle: "A fusion of nature and living culture · 9D",
    cover: `${HS}/Packages%20general/karanki-geraniums-house.webp?width=1139&name=karanki-geraniums-house.webp`,
    days: 9, nights: 8, cruise: 4, from: 3551, preDays: 4,
    highlights: ["3 days in Quito + 2 days in Karanki", "4 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go2-10d", code: "GO 2", family: "GO 2: Galapagos Cruise & Andean Cross-Culture Experience",
    title: "GO 2: Galapagos Cruise & Andean Cross-Culture",
    subtitle: "Highlands, markets and a 5-day cruise · 10D",
    cover: `${HS}/Packages%20general/landscape-karanki-magdalena.webp?width=1600&name=landscape-karanki-magdalena.webp`,
    days: 10, nights: 9, cruise: 5, from: 4418, preDays: 4,
    highlights: ["3 days in Quito + 2 days in Karanki", "5 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go2-13d", code: "GO 2", family: "GO 2: Galapagos Cruise & Andean Cross-Culture Experience",
    title: "GO 2: Galapagos Cruise & Andean Cross-Culture",
    subtitle: "Andean culture and the full archipelago · 13D",
    cover: `${HS}/Packages%20general/bestsellers-quito-karanki.webp?width=1600&name=bestsellers-quito-karanki.webp`,
    days: 13, nights: 12, cruise: 8, from: 6482, preDays: 4,
    highlights: ["3 days in Quito + 2 days in Karanki", "8 days onboard (Galápagos)", "All meals included onboard"],
  },
  // ── GO 3 ─────────────────────────────────────────────
  {
    slug: "go3-12d", code: "GO 3", family: "GO 3: Galapagos Cruise & Ecuador's Volcano Avenue",
    title: "GO 3: Galapagos Cruise & Volcano Avenue",
    subtitle: "Andes peaks meet Pacific isles · 12D",
    cover: `${HS}/Packages%20general/Go-package-general-banner-3.webp?width=1200&name=Go-package-general-banner-3.webp`,
    days: 12, nights: 11, cruise: 4, from: 5410, preDays: 7,
    highlights: ["8 days in mainland Ecuador", "4 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go3-13d", code: "GO 3", family: "GO 3: Galapagos Cruise & Ecuador's Volcano Avenue",
    title: "GO 3: Galapagos Cruise & Volcano Avenue",
    subtitle: "Volcano Avenue plus a 5-day cruise · 13D",
    cover: `${HS}/Packages%20general/Go-package-general-2%20(1).webp?width=1200&name=Go-package-general-2%20(1).webp`,
    days: 13, nights: 12, cruise: 5, from: 6277, preDays: 7,
    highlights: ["8 days in mainland Ecuador", "5 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go3-16d", code: "GO 3", family: "GO 3: Galapagos Cruise & Ecuador's Volcano Avenue",
    title: "GO 3: Galapagos Cruise & Volcano Avenue",
    subtitle: "The grand Ecuador circuit · 16D",
    cover: `${HS}/Packages%20general/Go-package-general-3.webp?width=1200&name=Go-package-general-3.webp`,
    days: 16, nights: 15, cruise: 8, from: 8341, preDays: 7,
    highlights: ["8 days in mainland Ecuador", "8 days onboard (Galápagos)", "All meals included onboard"],
  },
  // ── GO 4 & 5 ─────────────────────────────────────────
  {
    slug: "go4-amazon-7d", code: "GO 4", family: "GO 4 & 5: Ecuador's Amazon Expeditions",
    title: "GO 4: Quito & Amazon Lodge Expedition",
    subtitle: "Rainforest immersion from colonial Quito · 7D",
    cover: `${HS}/Packages%20general/Go-package-general-6.webp?width=1200&name=Go-package-general-6.webp`,
    days: 7, nights: 6, cruise: 0, from: 1936, preDays: 2,
    highlights: ["3 days in Quito", "4 days in the Amazon", "All meals included"],
  },
  {
    slug: "go5-amazon-cruise-7d", code: "GO 5", family: "GO 4 & 5: Ecuador's Amazon Expeditions",
    title: "GO 5: Quito & Amazon River Cruise",
    subtitle: "Napo River cruising and Quito · 7D",
    cover: `${HS}/Packages%20general/Go-package-general-5.webp?width=1200&name=Go-package-general-5.webp`,
    days: 7, nights: 6, cruise: 0, from: 4852, preDays: 2,
    highlights: ["3 days in Quito", "4 days onboard (Amazon)", "All meals included onboard"],
  },
  // ── GO 6 ─────────────────────────────────────────────
  {
    slug: "go6-10d", code: "GO 6", family: "GO 6: Ecuador, Galapagos Cruise & Peru",
    title: "GO 6: Ecuador, Galapagos Cruise & Peru",
    subtitle: "South America's timeless treasures · 10D",
    cover: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    days: 10, nights: 9, cruise: 4, from: 4348, preDays: 5,
    highlights: ["3 days in Ecuador + 3 days in Peru", "4 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go6-11d", code: "GO 6", family: "GO 6: Ecuador, Galapagos Cruise & Peru",
    title: "GO 6: Ecuador, Galapagos Cruise & Peru",
    subtitle: "Machu Picchu and a 5-day cruise · 11D",
    cover: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=80",
    days: 11, nights: 10, cruise: 5, from: 5215, preDays: 5,
    highlights: ["3 days in Ecuador + 3 days in Peru", "5 days onboard (Galápagos)", "All meals included onboard"],
  },
  {
    slug: "go6-14d", code: "GO 6", family: "GO 6: Ecuador, Galapagos Cruise & Peru",
    title: "GO 6: Ecuador, Galapagos Cruise & Peru",
    subtitle: "The grand Andes-to-Pacific journey · 14D",
    cover: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?auto=format&fit=crop&w=1200&q=80",
    days: 14, nights: 13, cruise: 8, from: 7279, preDays: 5,
    highlights: ["3 days in Ecuador + 3 days in Peru", "8 days onboard (Galápagos)", "All meals included onboard"],
  },
  // ── GO 7 ─────────────────────────────────────────────
  {
    slug: "go7-5d", code: "GO 7", family: "GO 7: Galapagos by Sea and Land",
    title: "GO 7: Galapagos by Sea and Land",
    subtitle: "Cruise plus Santa Cruz island hopping · 5D",
    cover: `${HS}/Package%20single/GO%207/go7-galapagos-cruise-hopping-mini.webp?width=801&name=go7-galapagos-cruise-hopping-mini.webp`,
    days: 5, nights: 4, cruise: 4, from: 3308, preDays: 1,
    highlights: ["4 days onboard (Galápagos)", "1 day island hopping", "All meals included onboard"],
  },
  {
    slug: "go7-6d", code: "GO 7", family: "GO 7: Galapagos by Sea and Land",
    title: "GO 7: Galapagos by Sea and Land",
    subtitle: "5-day cruise plus island hopping · 6D",
    cover: `${HS}/Package%20single/GO%207/Go%207%20mini%20-%202.webp?width=501&name=Go%207%20mini%20-%202.webp`,
    days: 6, nights: 5, cruise: 5, from: 4140, preDays: 1,
    highlights: ["5 days onboard (Galápagos)", "1 day island hopping", "All meals included onboard"],
  },
  {
    slug: "go7-9d", code: "GO 7", family: "GO 7: Galapagos by Sea and Land",
    title: "GO 7: Galapagos by Sea and Land",
    subtitle: "8-day cruise plus island hopping · 9D",
    cover: `${HS}/Package%20single/GO%207/Go%207%20mini%20-%203.webp?width=501&name=Go%207%20mini%20-%203.webp`,
    days: 9, nights: 8, cruise: 8, from: 6122, preDays: 1,
    highlights: ["8 days onboard (Galápagos)", "1 day island hopping", "All meals included onboard"],
  },
];

export const bestSellerPackages: BestSellerPackage[] = seeds.map(s => {
  const loop = loopFor(s.cruise);
  return {
    slug: s.slug,
    code: s.code,
    family: s.family,
    title: s.title,
    subtitle: s.subtitle,
    cover: s.cover,
    packageDuration: `${s.days} days / ${s.nights} nights`,
    cruiseDuration: loop.duration,
    fromUSD: s.from,
    highlights: s.highlights,
    itinerary: loop,
    services: baseServices(`${loop.code} – ${loop.duration}`, s.days, s.preDays),
    includes,
  };
});

export const packageFamilies = Array.from(new Set(bestSellerPackages.map(p => p.family)));

export const findPackage = (slug: string) => bestSellerPackages.find(p => p.slug === slug);

// ── Departures ────────────────────────────────────────────────
export type CabinOption = {
  name: string;
  gross: number;
  discount?: number;      // percentage
  available: boolean;
};

export type PackageDeparture = {
  id: string;
  ship: string;
  shipImage: string;
  maxPassengers: number;
  maxCabins: number;
  packageStart: string;
  packageEnd: string;
  cruiseStart: string;
  cruiseEnd: string;
  langs: string[];
  promo?: string;
  cabins: CabinOption[];
};

const legendCabins: CabinOption[] = [
  { name: "Standard Cabin", gross: 2804, available: false },
  { name: "Standard Plus", gross: 3472, discount: 5, available: true },
  { name: "Junior Suite", gross: 3959, discount: 5, available: true },
  { name: "Legend Suite", gross: 4376, discount: 5, available: true },
  { name: "Balcony Suite", gross: 4679, available: false },
  { name: "Balcony Suite Plus", gross: 5096, discount: 5, available: true },
];

const coralCabins: CabinOption[] = [
  { name: "Standard Cabin", gross: 2804, available: false },
  { name: "Standard Plus", gross: 3472, discount: 10, available: true },
  { name: "Junior Cabin", gross: 3959, discount: 10, available: true },
];

export const departuresFor = (pkg: BestSellerPackage): PackageDeparture[] => [
  {
    id: `${pkg.slug}-d1`,
    ship: "Galapagos Legend",
    shipImage: shipLegend,
    maxPassengers: 9,
    maxCabins: 6,
    packageStart: "Aug 4, 2026",
    packageEnd: "Aug 10, 2026",
    cruiseStart: "Aug 6, 2026",
    cruiseEnd: "Aug 10, 2026",
    langs: ["ES", "EN"],
    promo: "Complementary: 2 nights at GO Quito Hotel +5% off",
    cabins: legendCabins,
  },
  {
    id: `${pkg.slug}-d2`,
    ship: "Coral I & Coral II",
    shipImage: shipCoral1,
    maxPassengers: 9,
    maxCabins: 6,
    packageStart: "Aug 3, 2026",
    packageEnd: "Aug 9, 2026",
    cruiseStart: "Aug 5, 2026",
    cruiseEnd: "Aug 9, 2026",
    langs: ["ES", "EN"],
    promo: "10% discount Coral Yachts",
    cabins: coralCabins,
  },
  {
    id: `${pkg.slug}-d3`,
    ship: "Coral II",
    shipImage: shipCoral2,
    maxPassengers: 8,
    maxCabins: 3,
    packageStart: "Aug 10, 2026",
    packageEnd: "Aug 16, 2026",
    cruiseStart: "Aug 12, 2026",
    cruiseEnd: "Aug 16, 2026",
    langs: ["ES", "EN"],
    cabins: coralCabins,
  },
];
