// Best Seller packages — Quito + Galápagos cruise combos.
// Each package = 2 nights Quito (pre) + cruise (4/5/8 days) + 1 night Quito (post).

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
  title: string;         // GO 1: Quito & Galapagos Cruise
  subtitle: string;
  cover: string;
  packageDuration: string;   // 7 days / 6 nights
  cruiseDuration: string;    // 4 days / 3 nights
  fromUSD: number;
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

const baseServices = (cruiseLabel: string, lastDay: number): PackageService[] => [
  { day: 1, order: 1, type: "Transfer", service: "Transfer IN Quito (Airport – Hotel)" },
  { day: 1, order: 2, type: "Hotel", service: "GO Quito Hotel" },
  { day: 2, order: 1, type: "Land Tour", service: "Colonial Quito Plus Middle of the World" },
  { day: 2, order: 2, type: "Hotel", service: "GO Quito Hotel" },
  { day: 3, order: 1, type: "Transfer", service: "Shuttle Service OUT from Quito / Baltra" },
  { day: 3, order: 2, type: "Galapagos Cruise", service: cruiseLabel },
  { day: lastDay - 1, order: 1, type: "Transfer", service: "Shuttle Service IN / Baltra" },
  { day: lastDay - 1, order: 2, type: "Hotel", service: "GO Quito Hotel" },
  { day: lastDay, order: 1, type: "Transfer", service: "Transfer OUT Quito (Hotel – Airport)" },
];

const includes = [
  "2 nights pre-cruise at GO Quito Hotel",
  "1 night post-cruise at GO Quito Hotel",
  "All transfers in Quito and Galápagos",
  "All meals onboard + excursions",
  "Bilingual naturalist guides",
];

export const bestSellerPackages: BestSellerPackage[] = [
  {
    slug: "go1-7d",
    code: "GO 1",
    title: "GO 1: Quito & Galapagos Cruise",
    subtitle: "A journey through time and nature's wonders · 7D",
    cover: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    packageDuration: "7 days / 6 nights",
    cruiseDuration: "4 days / 3 nights",
    fromUSD: 3053,
    itinerary: northLoop,
    services: baseServices("North Loop (D) – 4 days / 3 nights", 7),
    includes,
  },
  {
    slug: "go1-8d",
    code: "GO 1",
    title: "GO 1: Quito & Galapagos Cruise Extended",
    subtitle: "Colonial Quito plus a longer expedition · 8D",
    cover: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80",
    packageDuration: "8 days / 7 nights",
    cruiseDuration: "5 days / 4 nights",
    fromUSD: 3920,
    itinerary: southLoop,
    services: baseServices("South Loop (C) – 5 days / 4 nights", 8),
    includes,
  },
  {
    slug: "go2-9d",
    code: "GO 2",
    title: "GO 2: Andean Cross-Culture & Galapagos",
    subtitle: "A fusion of nature and living culture · 9D",
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    packageDuration: "9 days / 8 nights",
    cruiseDuration: "4 days / 3 nights",
    fromUSD: 3551,
    itinerary: northLoop,
    services: baseServices("North Loop (D) – 4 days / 3 nights", 9),
    includes,
  },
  {
    slug: "go2-13d",
    code: "GO 2",
    title: "GO 2: Andean Cross-Culture Grand",
    subtitle: "Highlands, markets and the full archipelago · 13D",
    cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    packageDuration: "13 days / 12 nights",
    cruiseDuration: "8 days / 7 nights",
    fromUSD: 6482,
    itinerary: westLoop,
    services: baseServices("West Loop (A) – 8 days / 7 nights", 13),
    includes,
  },
  {
    slug: "go3-12d",
    code: "GO 3",
    title: "GO 3: Volcano Avenue & Galapagos",
    subtitle: "Andes peaks meet Pacific isles · 12D",
    cover: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80",
    packageDuration: "12 days / 11 nights",
    cruiseDuration: "5 days / 4 nights",
    fromUSD: 5410,
    itinerary: southLoop,
    services: baseServices("South Loop (C) – 5 days / 4 nights", 12),
    includes,
  },
  {
    slug: "go6-grand",
    code: "GO 6",
    title: "GO 6: Ecuador, Galapagos Cruise & Peru",
    subtitle: "South America's timeless treasures · 15D",
    cover: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    packageDuration: "15 days / 14 nights",
    cruiseDuration: "5 days / 4 nights",
    fromUSD: 8240,
    itinerary: southLoop,
    services: baseServices("South Loop (C) – 5 days / 4 nights", 15),
    includes,
  },
];

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
