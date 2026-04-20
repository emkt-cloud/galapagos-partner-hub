// Central catalog for the Resources module.
// Slugs power the URL structure under /recursos/*.

export type Lang = "es" | "en";

export type ResourceDoc = {
  id: string;
  label: string;
  kind: "tech" | "deckplan" | "itinerary" | "gallery" | "map" | "brochure";
  size: string;
  langs: Lang[];
  // Path under /public; we provide both languages by appending -es / -en.
  file: string;
};

export type ProductSlug = "legend" | "coral" | "quito-hotel" | "karanki";

export type Product = {
  slug: ProductSlug;
  name: string;
  tagline: string;
  cover: string;
  description: string;
  highlights: string[];
  docs: ResourceDoc[];
  gallery: string[];
};

export const products: Product[] = [
  {
    slug: "legend",
    name: "Galápagos Legend",
    tagline: "Expedition cruise · 100 guests",
    cover:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1600&q=80",
    description:
      "Our flagship expedition vessel sailing the Galápagos archipelago with 100 guests, naturalist guides and 4/5/8-day itineraries.",
    highlights: [
      "57 cabins across 4 decks",
      "4D · 5D · 8D itineraries",
      "Naturalist guides Lvl. III",
      "All meals + excursions included",
    ],
    docs: [
      { id: "legend-tech", label: "Technical Sheet", kind: "tech", size: "1.8 MB", langs: ["es", "en"], file: "/docs/legend-tech" },
      { id: "legend-deck", label: "Deckplan", kind: "deckplan", size: "3.2 MB", langs: ["es", "en"], file: "/docs/legend-deckplan" },
      { id: "legend-itin", label: "Itineraries A · B · C", kind: "itinerary", size: "4.1 MB", langs: ["es", "en"], file: "/docs/legend-itineraries" },
      { id: "legend-broc", label: "Brochure 2025", kind: "brochure", size: "8.4 MB", langs: ["es", "en"], file: "/docs/legend-brochure" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "coral",
    name: "Coral I & Coral II",
    tagline: "Boutique yachts · 36 guests each",
    cover:
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1600&q=80",
    description:
      "Two intimate yachts cruising side-by-side in Galápagos. Perfect for small groups and personalised expeditions.",
    highlights: [
      "20 cabins per yacht",
      "4D · 5D · 8D itineraries",
      "Sun deck + jacuzzi",
      "Premium gastronomy",
    ],
    docs: [
      { id: "coral-tech", label: "Technical Sheet", kind: "tech", size: "1.5 MB", langs: ["es", "en"], file: "/docs/coral-tech" },
      { id: "coral-deck", label: "Deckplan", kind: "deckplan", size: "2.8 MB", langs: ["es", "en"], file: "/docs/coral-deckplan" },
      { id: "coral-itin", label: "Itineraries Northern · Southern", kind: "itinerary", size: "3.6 MB", langs: ["es", "en"], file: "/docs/coral-itineraries" },
      { id: "coral-broc", label: "Brochure 2025", kind: "brochure", size: "7.1 MB", langs: ["es", "en"], file: "/docs/coral-brochure" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "quito-hotel",
    name: "GO Quito Hotel",
    tagline: "Boutique 5★ · Historic Centre",
    cover:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1600&q=80",
    description:
      "Boutique 5★ hotel in the heart of Quito's UNESCO Historic Centre. The perfect pre/post-cruise stay.",
    highlights: [
      "48 colonial-modern rooms",
      "Rooftop bar with Pichincha views",
      "Spa & wellness floor",
      "Walking distance to Plaza Grande",
    ],
    docs: [
      { id: "hotel-tech", label: "Fact Sheet", kind: "tech", size: "1.2 MB", langs: ["es", "en"], file: "/docs/hotel-tech" },
      { id: "hotel-deck", label: "Floorplan", kind: "deckplan", size: "2.1 MB", langs: ["es", "en"], file: "/docs/hotel-floorplan" },
      { id: "hotel-itin", label: "Hotel Programs", kind: "itinerary", size: "2.4 MB", langs: ["es", "en"], file: "/docs/hotel-programs" },
      { id: "hotel-broc", label: "Brochure 2025", kind: "brochure", size: "5.2 MB", langs: ["es", "en"], file: "/docs/hotel-brochure" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "karanki",
    name: "Karanki Magdalena",
    tagline: "Andean cultural lodge · Imbabura",
    cover:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    description:
      "Community lodge immersed in the Karanki indigenous culture, surrounded by volcanoes and ancestral traditions.",
    highlights: [
      "12 hand-built cottages",
      "Ancestral cuisine experience",
      "Hiking & horseback riding",
      "Community-led storytelling",
    ],
    docs: [
      { id: "karanki-tech", label: "Fact Sheet", kind: "tech", size: "1.1 MB", langs: ["es", "en"], file: "/docs/karanki-tech" },
      { id: "karanki-deck", label: "Lodge Map", kind: "map", size: "1.6 MB", langs: ["es", "en"], file: "/docs/karanki-map" },
      { id: "karanki-itin", label: "Cultural Programs", kind: "itinerary", size: "2.2 MB", langs: ["es", "en"], file: "/docs/karanki-programs" },
      { id: "karanki-broc", label: "Brochure 2025", kind: "brochure", size: "4.8 MB", langs: ["es", "en"], file: "/docs/karanki-brochure" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1444930694458-01babe71870e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

// Best Sellers (cruise + mainland combos)
export type Tour = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  duration: string;
  fromUSD: number;
  category: "best-seller" | "mainland-quito" | "mainland-otavalo";
  cover: string;
  highlights: string[];
  docs: ResourceDoc[];
  gallery: string[];
};

const tourDocs = (slug: string): ResourceDoc[] => [
  { id: `${slug}-itin`, label: "Day-by-day Itinerary", kind: "itinerary", size: "2.4 MB", langs: ["es", "en"], file: `/docs/${slug}-itinerary` },
  { id: `${slug}-map`, label: "Route Map", kind: "map", size: "1.2 MB", langs: ["es", "en"], file: `/docs/${slug}-map` },
  { id: `${slug}-gallery`, label: "Photo Pack HD", kind: "gallery", size: "48 MB", langs: ["es", "en"], file: `/docs/${slug}-gallery` },
];

const baseGallery = [
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80",
];

export const bestSellers: Tour[] = [
  {
    slug: "go1-7d",
    code: "GO 1",
    name: "Galápagos Cruise & Colonial Quito · 7D",
    tagline: "A journey through time and nature's wonders",
    duration: "7 days / 6 nights",
    fromUSD: 3053,
    category: "best-seller",
    cover: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
    highlights: ["3 days in Quito", "4 days onboard Galápagos", "All meals included onboard"],
    docs: tourDocs("go1-7d"),
    gallery: baseGallery,
  },
  {
    slug: "go1-8d",
    code: "GO 1",
    name: "Galápagos Cruise & Colonial Quito · 8D",
    tagline: "A journey through time and nature's wonders",
    duration: "8 days / 7 nights",
    fromUSD: 3920,
    category: "best-seller",
    cover: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1600&q=80",
    highlights: ["3 days in Quito", "5 days onboard Galápagos", "All meals included onboard"],
    docs: tourDocs("go1-8d"),
    gallery: baseGallery,
  },
  {
    slug: "go2-9d",
    code: "GO 2",
    name: "Galápagos & Andean Cross-Culture · 9D",
    tagline: "A fusion of nature and culture",
    duration: "9 days / 8 nights",
    fromUSD: 3551,
    category: "best-seller",
    cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    highlights: ["3 days Quito + 2 days Karanki", "4 days onboard Galápagos", "All meals included onboard"],
    docs: tourDocs("go2-9d"),
    gallery: baseGallery,
  },
  {
    slug: "go2-13d",
    code: "GO 2",
    name: "Galápagos & Andean Cross-Culture · 13D",
    tagline: "A fusion of nature and culture",
    duration: "13 days / 12 nights",
    fromUSD: 6482,
    category: "best-seller",
    cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    highlights: ["3 days Quito + 2 days Karanki", "8 days onboard Galápagos", "All meals included onboard"],
    docs: tourDocs("go2-13d"),
    gallery: baseGallery,
  },
  {
    slug: "go3-12d",
    code: "GO 3",
    name: "Galápagos & Volcano Avenue · 12D",
    tagline: "Andes peaks meet Pacific isles",
    duration: "12 days / 11 nights",
    fromUSD: 5410,
    category: "best-seller",
    cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    highlights: ["8 days Mainland Ecuador", "4 days onboard Galápagos", "All meals included onboard"],
    docs: tourDocs("go3-12d"),
    gallery: baseGallery,
  },
  {
    slug: "go6-grand",
    code: "GO 6",
    name: "Ecuador, Galápagos & Peru · Grand Tour 14D",
    tagline: "South America's timeless treasures",
    duration: "14 days / 13 nights",
    fromUSD: 7480,
    category: "best-seller",
    cover: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80",
    highlights: ["3 days Quito + 4 days Galápagos", "5 days Peru (Cusco · Machu Picchu)", "All transfers & meals included"],
    docs: tourDocs("go6-grand"),
    gallery: baseGallery,
  },
];

const quitoCover = "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1600&q=80";
const otavaloCover = "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1600&q=80";

export const mainlandTours: Tour[] = [
  {
    slug: "quito-colonial-half",
    code: "ML-QU1",
    name: "Quito Colonial Half Day",
    tagline: "Walk through 5 centuries of history",
    duration: "Half day · 4 hrs",
    fromUSD: 89,
    category: "mainland-quito",
    cover: quitoCover,
    highlights: ["Plaza Grande & La Compañía", "Local artisan stops", "Bilingual guide"],
    docs: tourDocs("quito-colonial-half"),
    gallery: baseGallery,
  },
  {
    slug: "quito-mitad-mundo",
    code: "ML-QU2",
    name: "Quito + Mitad del Mundo · Full Day",
    tagline: "Stand on both hemispheres",
    duration: "Full day · 8 hrs",
    fromUSD: 145,
    category: "mainland-quito",
    cover: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Equator monument", "Intiñan museum", "Lunch included"],
    docs: tourDocs("quito-mitad-mundo"),
    gallery: baseGallery,
  },
  {
    slug: "quito-gastronomic",
    code: "ML-QU3",
    name: "Quito Gastronomic Tour",
    tagline: "Andean flavours by night",
    duration: "Evening · 4 hrs",
    fromUSD: 119,
    category: "mainland-quito",
    cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    highlights: ["3 tasting venues", "Mixology workshop", "Local sommelier"],
    docs: tourDocs("quito-gastronomic"),
    gallery: baseGallery,
  },
  {
    slug: "otavalo-market",
    code: "ML-OT1",
    name: "Otavalo Market Full Day",
    tagline: "South America's largest indigenous market",
    duration: "Full day · 10 hrs",
    fromUSD: 165,
    category: "mainland-otavalo",
    cover: otavaloCover,
    highlights: ["Plaza de Ponchos", "Cotacachi leather", "Peguche waterfall"],
    docs: tourDocs("otavalo-market"),
    gallery: baseGallery,
  },
  {
    slug: "otavalo-cuicocha-2d",
    code: "ML-OT2",
    name: "Otavalo + Cotacachi + Cuicocha · 2D",
    tagline: "Crater lakes and Andean villages",
    duration: "2 days / 1 night",
    fromUSD: 389,
    category: "mainland-otavalo",
    cover: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Cuicocha crater hike", "Hacienda overnight", "Andean dinner"],
    docs: tourDocs("otavalo-cuicocha-2d"),
    gallery: baseGallery,
  },
];

export const allTours: Tour[] = [...bestSellers, ...mainlandTours];

export const findProduct = (slug: string) => products.find(p => p.slug === slug);
export const findTour = (slug: string) => allTours.find(t => t.slug === slug);

// Gallery categories
export type GalleryItem = {
  id: string;
  title: string;
  type: "image" | "video";
  category: "Galápagos Legend" | "Coral Yachts" | "GO Quito Hotel" | "Karanki" | "Mainland" | "Brand";
  size: string;
  url: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Legend · Sun deck sunset", type: "image", category: "Galápagos Legend", size: "12 MB", url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80" },
  { id: "g2", title: "Legend · Wildlife encounter", type: "image", category: "Galápagos Legend", size: "9 MB", url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80" },
  { id: "g3", title: "Coral · Aerial view", type: "image", category: "Coral Yachts", size: "14 MB", url: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1200&q=80" },
  { id: "g4", title: "Coral · Suite interior", type: "image", category: "Coral Yachts", size: "8 MB", url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80" },
  { id: "g5", title: "GO Quito · Rooftop bar", type: "image", category: "GO Quito Hotel", size: "11 MB", url: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80" },
  { id: "g6", title: "GO Quito · Master suite", type: "image", category: "GO Quito Hotel", size: "10 MB", url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80" },
  { id: "g7", title: "Karanki · Cultural ceremony", type: "image", category: "Karanki", size: "13 MB", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" },
  { id: "g8", title: "Karanki · Lodge at dusk", type: "image", category: "Karanki", size: "9 MB", url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80" },
  { id: "g9", title: "Mainland · Otavalo market", type: "image", category: "Mainland", size: "10 MB", url: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80" },
  { id: "g10", title: "Mainland · Quito old town", type: "image", category: "Mainland", size: "11 MB", url: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1200&q=80" },
  { id: "g11", title: "Brand · Logo pack", type: "image", category: "Brand", size: "4 MB", url: "https://images.unsplash.com/photo-1611224885990-ab7363d7f2a9?auto=format&fit=crop&w=1200&q=80" },
  { id: "g12", title: "Institutional video 4K", type: "video", category: "Brand", size: "320 MB", url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80" },
];

export const galleryCategories = [
  "All",
  "Galápagos Legend",
  "Coral Yachts",
  "GO Quito Hotel",
  "Karanki",
  "Mainland",
  "Brand",
] as const;
