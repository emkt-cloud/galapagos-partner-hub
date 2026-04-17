import { Anchor, Users, Ruler, Calendar, MapPin, Star, ArrowRight } from "lucide-react";
import legend from "@/assets/ship-legend.jpg";
import coral1 from "@/assets/ship-coral1.jpg";
import coral2 from "@/assets/ship-coral2.jpg";
import map from "@/assets/itinerary-map.jpg";

const ships = [
  { name: "Galapagos Legend", img: legend, capacity: 100, cabins: 57, length: "92 m", year: 2002, rating: 4.9, tag: "Flagship" },
  { name: "Coral I",          img: coral1, capacity: 36,  cabins: 22, length: "63 m", year: 2018, rating: 4.8, tag: "Boutique" },
  { name: "Coral II",         img: coral2, capacity: 36,  cabins: 22, length: "63 m", year: 2018, rating: 4.8, tag: "Boutique" },
];

const itineraries = [
  { code: "A", days: 8, name: "Northern & Central Islands", islands: ["Baltra", "Genovesa", "Bartolomé", "Santiago", "Santa Cruz"], from: "$3,890" },
  { code: "B", days: 5, name: "Western Galápagos",          islands: ["Isabela", "Fernandina", "Santa Cruz"],                       from: "$2,490" },
  { code: "C", days: 4, name: "Eastern Highlights",         islands: ["San Cristóbal", "Española", "Floreana"],                     from: "$1,990" },
];

const Flota = () => (
  <div className="space-y-8 max-w-[1400px]">
    {/* Hero */}
    <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-12 shadow-navy">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${map})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
      <div className="relative max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-5">
          <Anchor className="h-3.5 w-3.5 text-primary-glow" />
          <span className="text-xs uppercase tracking-wider">Our Fleet</span>
        </div>
        <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight">
          Three ships.<br /><span className="font-semibold text-gradient-brand">One archipelago.</span>
        </h1>
        <p className="text-white/70 mt-4 max-w-lg">Hand-picked vessels designed for intimate exploration of the Enchanted Islands, with naturalist guides and premium service onboard.</p>
      </div>
    </section>

    {/* Ships */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {ships.map(s => (
        <div key={s.name} className="premium-card overflow-hidden group">
          <div className="relative h-56 overflow-hidden">
            <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-navy font-bold">{s.tag}</span>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-display text-xl font-semibold text-white">{s.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-warning">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs text-white/90">{s.rating}</span>
              </div>
            </div>
          </div>
          <div className="p-5 grid grid-cols-3 gap-3 text-center">
            <div><Users className="h-4 w-4 mx-auto text-primary mb-1" /><p className="text-xs text-muted-foreground">Pax</p><p className="font-semibold text-navy">{s.capacity}</p></div>
            <div><Anchor className="h-4 w-4 mx-auto text-primary mb-1" /><p className="text-xs text-muted-foreground">Cabins</p><p className="font-semibold text-navy">{s.cabins}</p></div>
            <div><Ruler className="h-4 w-4 mx-auto text-primary mb-1" /><p className="text-xs text-muted-foreground">Length</p><p className="font-semibold text-navy">{s.length}</p></div>
          </div>
          <button className="w-full h-11 border-t border-border text-sm font-medium text-navy hover:gradient-brand hover:text-white transition-premium inline-flex items-center justify-center gap-2">
            View specs <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </section>

    {/* Itineraries */}
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy">Itineraries</h2>
          <p className="text-sm text-muted-foreground">Curated routes through the archipelago</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {itineraries.map(i => (
          <div key={i.code} className="premium-card p-6 group hover:shadow-glow transition-premium">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl gradient-brand grid place-items-center text-white font-display font-bold text-lg shadow-glow">{i.code}</div>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {i.days} days</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-navy mb-2">{i.name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {i.islands.map(is => (
                <span key={is} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-navy inline-flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" /> {is}
                </span>
              ))}
            </div>
            <div className="flex items-end justify-between pt-4 border-t border-border">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                <p className="font-display text-2xl font-semibold text-navy">{i.from}</p>
              </div>
              <button className="h-9 px-4 rounded-lg bg-navy text-white text-xs font-medium hover:gradient-brand transition-premium">Quote</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Flota;
