// Centralised mock data for Holds, Quotes and Confirmed bookings.
// Codes follow GO Galapagos convention:
//   • Confirmed → "T-XXXX-2026"
//   • Quote / Hold → "Q XXXXXX"

import shipLegend from "@/assets/ship-legend.jpg";
import shipCoral1 from "@/assets/ship-coral1.jpg";
import shipCoral2 from "@/assets/ship-coral2.jpg";

export const shipImageMap: Record<string, string> = {
  "Galapagos Legend": shipLegend,
  "Legend": shipLegend,
  "Coral I": shipCoral1,
  "Coral II": shipCoral2,
};

export type Pax = {
  name: string;
  type: "ADT" | "CHD" | "INF";
  nationality: string;
  passport?: string;
};

export type Hold = {
  ref: string;          // Q 129090
  client: string;
  partnerCode: string;
  ktCode: string;
  ship: string;
  cabin: string;
  departure: string;
  modifiedOn: string;
  expiresIn: number;    // days
  total: number;
  pax: number;
  passengers: Pax[];
  contact: string;
  agent: string;
  reservationType: "PROMO" | "FTS" | "GROUP";
  rateType: string;
  modifications: number;
  numberOfMods: number;
};

export type Quote = {
  ref: string;          // Q 129xxx
  partnerCode: string;
  ktCode: string;
  guestRef: string;
  promotion: string;
  creationDate: string;
  lastModification: string;
  operationDate: string;
};

export type Confirmed = {
  goCode: string;       // T-1385-2026
  reservationType: "FTS" | "PROMO" | "GROUP";
  partnerCode: string;
  guestRef: string;
  paxType: string;      // 4ADT
  departure: string;
  ship: string;
  total: number;
  deposit: number;
  balance: number;
  pax: number;
  passengers: Pax[];
  earnedMiles: number;
};

// ────────────────────────────────────────────────────────────
// Sample data
// ────────────────────────────────────────────────────────────

const samplePax = (n: number): Pax[] =>
  Array.from({ length: n }, (_, i) => ({
    name: ["Maria Pérez","John Smith","Sophie Laurent","Hiroshi Tanaka","Anna Lindqvist","James Whitaker"][i % 6],
    type: i < n - (n > 2 ? 1 : 0) ? "ADT" : "CHD",
    nationality: ["ES","US","FR","JP","SE","UK"][i % 6],
    passport: `${["P","X","K","T","S","B"][i%6]}${(1000000 + i * 73).toString()}`,
  }));

export const holds: Hold[] = [
  {
    ref: "Q 129090",
    client: "Maria Pérez",
    partnerCode: "AT-2841",
    ktCode: "KT-9001",
    ship: "Galapagos Legend",
    cabin: "Balcony Suite",
    departure: "2026-05-10",
    modifiedOn: "2026-04-29 11:50",
    expiresIn: 1,
    total: 9780,
    pax: 2,
    passengers: samplePax(2),
    contact: "Armando . C",
    agent: "Madeleine . U",
    reservationType: "PROMO",
    rateType: "FTS",
    modifications: 1,
    numberOfMods: 1,
  },
  {
    ref: "Q 129087",
    client: "Robert Klein",
    partnerCode: "AT-2839",
    ktCode: "KT-8997",
    ship: "Coral II",
    cabin: "Junior Suite",
    departure: "2026-05-22",
    modifiedOn: "2026-04-27 09:14",
    expiresIn: 3,
    total: 7120,
    pax: 2,
    passengers: samplePax(2),
    contact: "Armando . C",
    agent: "Carolina . V",
    reservationType: "FTS",
    rateType: "Standard",
    modifications: 0,
    numberOfMods: 0,
  },
  {
    ref: "Q 129082",
    client: "Sophie Laurent",
    partnerCode: "AT-2836",
    ktCode: "KT-8990",
    ship: "Coral I",
    cabin: "Standard Plus",
    departure: "2026-06-04",
    modifiedOn: "2026-04-25 15:32",
    expiresIn: 6,
    total: 11350,
    pax: 4,
    passengers: samplePax(4),
    contact: "Armando . C",
    agent: "Madeleine . U",
    reservationType: "GROUP",
    rateType: "Group 4+",
    modifications: 2,
    numberOfMods: 2,
  },
  {
    ref: "Q 129075",
    client: "Hiroshi Tanaka",
    partnerCode: "AT-2830",
    ktCode: "KT-8982",
    ship: "Galapagos Legend",
    cabin: "Standard",
    departure: "2026-06-18",
    modifiedOn: "2026-04-22 18:01",
    expiresIn: 8,
    total: 8490,
    pax: 2,
    passengers: samplePax(2),
    contact: "Armando . C",
    agent: "Pedro . R",
    reservationType: "PROMO",
    rateType: "FTS",
    modifications: 0,
    numberOfMods: 0,
  },
];

export const quotes: Quote[] = [
  // intentionally empty in mock to mirror "NO DATA" on the dashboard image
];

// ~80 miles per $1,000 of total (mock)
const milesFromTotal = (total: number) => Math.round(total * 0.08);

export const confirmed: Confirmed[] = [
  {
    goCode: "T-1385-2026",
    reservationType: "FTS",
    partnerCode: "test deadline",
    guestRef: "test deadline",
    paxType: "4ADT",
    departure: "2026-09-29",
    ship: "Galapagos Legend",
    total: 15612.0,
    deposit: 632.0,
    balance: 14980.4,
    pax: 4,
    passengers: samplePax(4),
    earnedMiles: milesFromTotal(15612),
  },
  {
    goCode: "T-1378-2026",
    reservationType: "PROMO",
    partnerCode: "AT-2820",
    guestRef: "Pérez · 2 ADT",
    paxType: "2ADT",
    departure: "2026-08-12",
    ship: "Galapagos Legend",
    total: 9780.0,
    deposit: 4890.0,
    balance: 4890.0,
    pax: 2,
    passengers: samplePax(2),
    earnedMiles: milesFromTotal(9780),
  },
  {
    goCode: "T-1372-2026",
    reservationType: "FTS",
    partnerCode: "AT-2818",
    guestRef: "Klein · 2 ADT",
    paxType: "2ADT",
    departure: "2026-07-28",
    ship: "Coral I",
    total: 11350.0,
    deposit: 11350.0,
    balance: 0,
    pax: 2,
    passengers: samplePax(2),
    earnedMiles: milesFromTotal(11350),
  },
  {
    goCode: "T-1366-2026",
    reservationType: "GROUP",
    partnerCode: "AT-2815",
    guestRef: "Laurent · 4 PAX",
    paxType: "3ADT 1CHD",
    departure: "2026-07-14",
    ship: "Coral II",
    total: 7120.0,
    deposit: 2136.0,
    balance: 4984.0,
    pax: 4,
    passengers: samplePax(4),
    earnedMiles: milesFromTotal(7120),
  },
  {
    goCode: "T-1359-2026",
    reservationType: "FTS",
    partnerCode: "AT-2812",
    guestRef: "Tanaka · 2 ADT",
    paxType: "2ADT",
    departure: "2026-07-02",
    ship: "Galapagos Legend",
    total: 8490.0,
    deposit: 8490.0,
    balance: 0,
    pax: 2,
    passengers: samplePax(2),
    earnedMiles: milesFromTotal(8490),
  },
];

export const findHold = (ref: string) => holds.find(h => encodeURIComponent(h.ref) === encodeURIComponent(ref));
export const findConfirmed = (code: string) => confirmed.find(c => c.goCode === code);

export const totalMilesEarned = confirmed.reduce((s, c) => s + c.earnedMiles, 0);
