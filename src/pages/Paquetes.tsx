import { Package, Plane, Hotel, Anchor, Sparkles, ArrowRight, Filter } from "lucide-react";
import legend from "@/assets/ship-legend.jpg";
import coral1 from "@/assets/ship-coral1.jpg";
import coral2 from "@/assets/ship-coral2.jpg";
import quito from "@/assets/quito-hotel.jpg";
import { useState } from "react";

const cats = [
  { id: "all",     label: "All",         icon: Package },
  { id: "cruise",  label: "Cruises",     icon: Anchor },
  { id: "combo",   label: "Combos",      icon: Sparkles },
  { id: "hotel",   label: "Hotel only",  icon: Hotel },
  { id: "addons",  label: "Add-ons",     icon: Plane },
];

const products = [
  { cat: "cruise", img: legend, sku: "LEG-A8",  name: "Legend · Itinerary A · 8 days",     pax: "2-100", from: 3890, badge: "Best seller" },
  { cat: "cruise", img: coral1, sku: "C1-B5",   name: "Coral I · Western · 5 days",        pax: "2-36",  from: 2490, badge: "Boutique" },
  { cat: "cruise", img: coral2, sku: "C2-C4",   name: "Coral II · Eastern · 4 days",       pax: "2-36",  from: 1990 },
  { cat: "combo",  img: quito,  sku: "CMB-QC",  name: "Quito + Cruise + Quito",            pax: "2-100", from: 4290, badge: "−25%" },
  { cat: "hotel",  img: quito,  sku: "HTL-QT",  name: "GO Quito Hotel · 2 nights",         pax: "1-4",   from: 284 },
  { cat: "addons", img: legend, sku: "ADD-WT",  name: "Wetsuit rental · full cruise",      pax: "1",     from: 45 },
];

const Paquetes = () => {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? products : products.filter(p => p.cat === active);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">Products & Services</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} items · partner net rates</p>
        </div>
        <button className="h-10 px-4 rounded-xl bg-card border border-border text-sm text-navy inline-flex items-center gap-2 hover:border-primary/40 transition-colors w-fit">
          <Filter className="h-3.5 w-3.5" /> More filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {cats.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-4 h-10 rounded-xl text-sm inline-flex items-center gap-2 transition-colors ${active === c.id ? "bg-navy text-white" : "bg-card border border-border text-navy hover:border-primary/40"}`}
          >
            <c.icon className="h-3.5 w-3.5" /> {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div key={p.sku} className="premium-card overflow-hidden group">
            <div className="relative h-44 overflow-hidden">
              <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              {p.badge && <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/90 text-navy font-bold">{p.badge}</span>}
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-navy/40 backdrop-blur px-2 py-0.5 rounded">{p.sku}</span>
            </div>
            <div className="p-5">
              <h3 className="font-medium text-navy text-sm leading-snug min-h-[2.5rem]">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-2">Capacity · {p.pax} pax</p>
              <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                  <p className="font-display text-xl font-semibold text-navy">${p.from.toLocaleString()}</p>
                </div>
                <button className="h-9 px-3 rounded-lg gradient-brand text-white text-xs font-medium inline-flex items-center gap-1 hover:shadow-glow transition-premium">
                  Quote <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paquetes;
