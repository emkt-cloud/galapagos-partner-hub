import { useState } from "react";
import {
  Filter, MapPin, Star, Sparkles, Languages, Users, Calendar,
  ArrowRight, Heart, Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";
import availabilityHero from "@/assets/availability-hero.jpg";
import shipLegend from "@/assets/ship-legend.jpg";
import shipCoral1 from "@/assets/ship-coral1.jpg";
import shipCoral2 from "@/assets/ship-coral2.jpg";

type Cabin = { name: string; price: string; left: number };
type Sailing = {
  ship: string;
  image: string;
  itinerary: string;
  duration: string;
  range: string;
  rating: number;
  badge?: "best" | "promo" | "last";
  cabins: Cabin[];
  langs: string[];
  highlights: string[];
  promo?: string;
};

const sailings: Sailing[] = [
  {
    ship: "Galapagos Legend",
    image: shipLegend,
    itinerary: "Itinerary A · Northern",
    duration: "5 Days / 4 Nights",
    range: "Apr 22 → Apr 26",
    rating: 4.9,
    badge: "best",
    promo: "Early booking · 15% off",
    langs: ["EN","ES","DE","FR"],
    highlights: ["Genovesa", "Bartolomé", "North Seymour"],
    cabins: [
      { name: "Standard",         price: "$3,290", left: 12 },
      { name: "Junior Suite",     price: "$3,890", left: 6 },
      { name: "Balcony Suite",    price: "$4,490", left: 3 },
      { name: "Legend Balcony",   price: "$5,290", left: 2 },
    ],
  },
  {
    ship: "Coral I",
    image: shipCoral1,
    itinerary: "Itinerary South · Eastern",
    duration: "4 Days / 3 Nights",
    range: "Apr 24 → Apr 27",
    rating: 4.8,
    badge: "promo",
    promo: "Stay 4 pay 3",
    langs: ["EN","ES","IT"],
    highlights: ["Española", "Floreana", "Santa Fe"],
    cabins: [
      { name: "Standard Plus",    price: "$2,890", left: 8  },
      { name: "Junior Suite",     price: "$3,240", left: 5  },
      { name: "Balcony Suite",    price: "$3,890", left: 2  },
    ],
  },
  {
    ship: "Coral II",
    image: shipCoral2,
    itinerary: "Itinerary North · Western",
    duration: "4 Days / 3 Nights",
    range: "Apr 26 → Apr 29",
    rating: 4.7,
    badge: "last",
    promo: "Only 2 cabins left",
    langs: ["EN","ES","PT"],
    highlights: ["Isabela", "Fernandina", "Rabida"],
    cabins: [
      { name: "Standard",         price: "$3,140", left: 4 },
      { name: "Junior Suite",     price: "$3,540", left: 2 },
      { name: "Balcony Suite",    price: "$4,180", left: 1 },
    ],
  },
];

const flagMap: Record<string, string> = {
  EN: "🇬🇧", ES: "🇪🇸", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", PT: "🇵🇹",
};

const Badge = ({ kind }: { kind?: Sailing["badge"] }) => {
  if (!kind) return null;
  const map = {
    best: { t: "Best Seller",     c: "bg-primary text-white" },
    promo:{ t: "Active promo",    c: "bg-ocean text-white" },
    last: { t: "Last availability", c: "bg-destructive text-white" },
  } as const;
  const v = map[kind];
  return <span className={cn("pill shadow-soft", v.c)}>{v.t}</span>;
};

const Disponibilidad = () => {
  const [view, setView] = useState<"cards"|"grid">("cards");
  const [shipFilter, setShipFilter] = useState("All");

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl shadow-navy">
        <img src={availabilityHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1600} height={640} />
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-navy/70 to-navy/30" />
        <div className="absolute inset-0 grid-luxe opacity-10" />
        <div className="relative p-7 lg:p-10 text-white">
          <p className="text-[10px] uppercase tracking-[0.32em] text-primary-glow mb-2">Search Availability · FTS</p>
          <h2 className="font-display text-3xl lg:text-[40px] font-light leading-tight max-w-2xl tracking-tight">
            Find the perfect departure in <span className="font-semibold text-primary-glow">seconds</span>.
          </h2>

          {/* Sticky filter bar */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2 p-2 bg-white/95 rounded-2xl shadow-elegant max-w-4xl backdrop-blur-md">
            {[
              { icon: Calendar, label: "Dates",      value: "Apr 22 → Apr 30" },
              { icon: Users,    label: "Passengers", value: "2 adults" },
              { icon: MapPin,   label: "Duration",   value: "4–5 nights" },
              { icon: Sparkles, label: "Ship",       value: "All" },
            ].map(f => (
              <button key={f.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary text-left transition-colors">
                <div className="h-9 w-9 rounded-lg bg-accent grid place-items-center text-ocean shrink-0">
                  <f.icon className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
                  <p className="text-[13px] font-medium text-navy truncate">{f.value}</p>
                </div>
              </button>
            ))}
            <button className="h-full rounded-xl gradient-brand text-white font-medium text-sm inline-flex items-center justify-center gap-2 shadow-glow hover:shadow-elegant transition-premium">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sticky top-[72px] bg-background/85 backdrop-blur-xl py-3 z-20 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex flex-wrap gap-2">
          {["All","Galapagos Legend","Coral I","Coral II"].map(f => (
            <button key={f} onClick={() => setShipFilter(f)} className={cn(
              "px-4 h-9 rounded-xl text-[13px] font-medium transition-colors",
              shipFilter === f ? "bg-navy text-white shadow-soft" : "bg-card border border-border text-navy hover:border-primary/40"
            )}>{f}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3.5 rounded-xl border border-border bg-card text-navy text-[13px] inline-flex items-center gap-1.5 hover:border-primary/40 transition-colors">
            <Filter className="h-3.5 w-3.5" /> More filters
          </button>
          <div className="flex p-0.5 rounded-xl bg-secondary/60">
            {(["cards","grid"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={cn(
                "px-3 h-8 text-[12px] rounded-lg font-medium transition-all capitalize",
                view === v ? "bg-white text-navy shadow-soft" : "text-muted-foreground"
              )}>{v === "cards" ? "Cards" : "Grid"}</button>
            ))}
          </div>
        </div>
      </div>

      {/* AI suggestion */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/[0.08] via-ocean/[0.05] to-transparent border border-primary/15">
        <div className="h-9 w-9 rounded-lg gradient-brand grid place-items-center text-white shrink-0 shadow-glow">
          <Wand2 className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-navy">AI Suggestion</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Combine <span className="text-primary font-medium">Coral II · Apr 26</span> with 2 nights at <span className="text-primary font-medium">GO Quito Hotel</span> for an estimated upsell of <span className="text-navy font-semibold">+$580</span> and a bonus of <span className="text-navy font-semibold">+1,000 miles</span>.</p>
        </div>
        <button className="hidden md:inline-flex h-9 px-4 rounded-lg bg-navy text-white text-[12px] font-medium hover:bg-night transition-colors items-center gap-1.5">
          Apply combo <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Sailings */}
      <div className="space-y-5">
        {sailings.map((s, i) => (
          <article
            key={s.ship + s.range}
            style={{ animationDelay: `${i * 80}ms` }}
            className="premium-card p-0 overflow-hidden animate-fade-up group"
          >
            <div className="grid lg:grid-cols-[1fr_280px]">
              {/* Details */}
              <div className="p-6 lg:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5 lg:hidden">
                      <Badge kind={s.badge} />
                      <span className="inline-flex items-center gap-1 text-[11px] text-warning">
                        <Star className="h-3 w-3 fill-warning" /> {s.rating}
                      </span>
                    </div>
                    <div className="hidden lg:inline-flex items-center gap-1 text-[11px] text-warning mb-1">
                      <Star className="h-3 w-3 fill-warning" /> {s.rating}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-navy leading-tight">{s.ship}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.itinerary} · {s.duration}</p>
                  </div>
                  <button className="h-9 w-9 rounded-xl border border-border grid place-items-center text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors">
                    <Heart className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] mb-5">
                  <span className="inline-flex items-center gap-1.5 text-navy font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> {s.range}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Languages className="h-3.5 w-3.5" />
                    {s.langs.map(l => <span key={l} title={l} className="text-base leading-none">{flagMap[l]}</span>)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-ocean" />
                    {s.highlights.join(" · ")}
                  </span>
                </div>

                {/* Cabins matrix */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {s.cabins.map(c => (
                    <div key={c.name} className={cn(
                      "p-3.5 rounded-xl border transition-all hover:border-primary/40 hover:shadow-soft cursor-pointer",
                      c.left <= 2 ? "border-destructive/30 bg-destructive/[0.03]" :
                      c.left <= 5 ? "border-warning/30 bg-warning/[0.03]" :
                      "border-border bg-secondary/30"
                    )}>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.name}</p>
                      <p className="font-display font-semibold text-navy text-base mt-0.5">{c.price}</p>
                      <p className={cn("text-[11px] mt-0.5",
                        c.left <= 2 ? "text-destructive font-medium" :
                        c.left <= 5 ? "text-warning" :
                        "text-success"
                      )}>{c.left} available</p>
                    </div>
                  ))}
                </div>

                {s.promo && (
                  <div className="mt-4 inline-flex items-center gap-2 text-[12px] text-primary font-medium">
                    <Sparkles className="h-3.5 w-3.5" /> {s.promo}
                  </div>
                )}
              </div>

              {/* Right: action panel */}
              <div className="border-t lg:border-t-0 lg:border-l border-border/60 bg-gradient-to-br from-secondary/40 to-accent/30 p-6 lg:p-7 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">From</p>
                  <p className="font-display text-[34px] font-semibold text-gradient-brand leading-none mt-1">
                    {s.cabins[0].price}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">per person · double</p>

                  <div className="mt-5 space-y-1.5 text-[11.5px]">
                    <div className="flex justify-between"><span className="text-muted-foreground">Partner commission</span><span className="text-navy font-medium">15%</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Miles/pax</span><span className="text-primary font-medium">+2,400</span></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full h-11 rounded-xl gradient-brand text-white font-medium text-sm shadow-glow hover:shadow-elegant transition-premium inline-flex items-center justify-center gap-2">
                    Book now <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="h-9 rounded-lg border border-border bg-card text-navy text-[12px] font-medium hover:border-primary/40 transition-colors">Quote</button>
                    <button className="h-9 rounded-lg border border-border bg-card text-navy text-[12px] font-medium hover:border-primary/40 transition-colors">View details</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Disponibilidad;
