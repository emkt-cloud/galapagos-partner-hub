export type AcademyDownload = {
  label: string;
  file?: string;              // /docs/<file>-en.pdf / -es.pdf
  external?: string;          // opens in a new tab
  size?: string;
  langs?: ("en" | "es")[];
};

export type AcademyModule = {
  id: number;
  title: string;
  track: string;
  duration: string;
  videoReady?: boolean;
  summary: string;
  topics: string[];
  downloads: AcademyDownload[];
};

export const academyModules: AcademyModule[] = [
  {
    id: 1,
    title: "Discover GO",
    track: "Company Awareness",
    duration: "3–6 min",
    summary:
      "Meet GO Galapagos by KleinTours: who we are, our mission and 38+ years of trajectory, our commitment to responsible tourism, and a complete tour of our portfolio — Legend & Coral fleet, GO as a DMC, GO Packages, GO Bespoke and GO Quito Hotel.",
    topics: [
      "Who we are — history, milestones, mission and 38+ years of experience",
      "Our commitment to sustainability — responsible tourism and recognitions",
      "Our portfolio at a glance: fleet, DMC, Packages, Bespoke and GO Quito Hotel",
    ],
    downloads: [
      { label: "GO Galapagos Corporate Brochure", external: "https://heyzine.com/flip-book/0d465b8317.html", size: "Flip book" },
      { label: "GO Portfolio Overview", file: "go-portfolio", size: "1.8 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 2,
    title: "Why Galápagos & Ecuador",
    track: "Market & Destination Awareness",
    duration: "3–6 min",
    summary:
      "Learn how to inspire your clients: the Galápagos experience as a natural laboratory and World Heritage site, Ecuador as a country of 4 combinable worlds, and the arguments that make GO stand out from the competition.",
    topics: [
      "The Galápagos experience — unique biodiversity, natural laboratory, World Heritage",
      "Ecuador, a country of 4 worlds — Amazon, Andes, Pacific Coast & Galápagos",
      "Why GO — trajectory, fleet, guide team, safety and high-content experiences",
    ],
    downloads: [
      { label: "Mainland Tours Brochure", file: "land-brochure", size: "3.2 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 3,
    title: "Galapagos Legend",
    track: "Product Awareness",
    duration: "6–10 min",
    videoReady: true,
    summary:
      "A full walkthrough of the Galapagos Legend: the expedition cruise experience and its cabins, gastronomy and social life on board — buffet, à la carte, BBQ, bars and spa — plus itineraries, islands and wildlife.",
    topics: [
      "Ship experience & cabins — expedition cruising, experiences and cabin categories",
      "Gastronomy & social life on board — buffet, à la carte, BBQ, bars, spa, social areas",
      "Itineraries & excursions — routes, animals and islands",
    ],
    downloads: [
      { label: "Deck Plan Legend 2026", file: "legend-deckplan", size: "2.4 MB", langs: ["en", "es"] },
      { label: "Itineraries Legend 2026–2027", file: "legend-itineraries", size: "4.1 MB", langs: ["en", "es"] },
      { label: "Brochure Legend 2026", file: "legend-brochure", size: "6.3 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 4,
    title: "Coral Yachts",
    track: "Product Awareness",
    duration: "6–10 min",
    videoReady: true,
    summary:
      "Everything about Coral I & Coral II: the intimate yacht experience and cabin categories, dining and social life on board, and the itineraries, animals and islands you can promise your clients.",
    topics: [
      "Ship experience & cabins — expedition cruising, experiences and cabin categories",
      "Gastronomy & social life on board — buffet, à la carte, BBQ, bars, spa, social areas",
      "Itineraries & excursions — routes, animals and islands",
    ],
    downloads: [
      { label: "Deck Plan Coral 2026", file: "coral-deckplan", size: "2.2 MB", langs: ["en", "es"] },
      { label: "Itineraries Corals 2026–2027", file: "coral-itineraries", size: "3.9 MB", langs: ["en", "es"] },
      { label: "Brochure Coral Yachts 2026", file: "coral-brochure", size: "5.8 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 5,
    title: "Beyond the Cruise",
    track: "Product Awareness",
    duration: "6–10 min",
    summary:
      "GO is more than cruises: our DMC operation and local expertise, GO Packages and the Bespoke categories — art & culture, nature, wellness, romance, foodie, family and adventure — plus the GO Quito Hotel experience.",
    topics: [
      "GO as a DMC — local knowledge, partner network, operational excellence",
      "GO Packages & GO Bespoke — combinations and Bespoke categories",
      "GO Quito Hotel — location, guest experience and event facilities",
    ],
    downloads: [
      { label: "Land Tours Brochure 2026", file: "land-brochure", size: "3.2 MB", langs: ["en", "es"] },
      { label: "Brochure GO Quito Hotel", file: "hotel-brochure", size: "2.9 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 6,
    title: "How to Sell & Book with GO",
    track: "Sales Awareness",
    duration: "8–10 min",
    videoReady: true,
    summary:
      "Your commercial toolkit: key selling points for Galápagos and Ecuador with answers to the most common objections, plus a hands-on GO Ware tutorial — availability, quotations, courtesy holds, confirmations, vouchers and the full partners site.",
    topics: [
      "Selling arguments for Galápagos & Ecuador — key points, objections & answers, closing",
      "GO Ware — availability, quotation, courtesy hold, confirmation, vouchers, partners site",
    ],
    downloads: [
      { label: "Partners Site Registration Guide", file: "partners-registration", size: "1.2 MB", langs: ["en", "es"] },
      { label: "GO Ware Quick Reference", file: "goware-reference", size: "0.9 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 7,
    title: "Essential Logistics & Conditions",
    track: "Operations & Company Awareness",
    duration: "3–6 min",
    summary:
      "What every partner needs to know before operating: GO Shuttle, airport assistance, the transit control card and what to bring — plus the Terms & Conditions highlights that generate the most client questions.",
    topics: [
      "Before you GO — GO Shuttle, airport assistance, transit control card, what to bring",
      "Terms & Conditions highlights — cancellation & change policies, insurance, responsibilities",
    ],
    downloads: [
      { label: "What to Take — Galápagos", file: "what-to-take", size: "0.8 MB", langs: ["en", "es"] },
      { label: "GO Terms & Conditions", file: "terms-go", size: "1.1 MB", langs: ["en", "es"] },
    ],
  },
];
