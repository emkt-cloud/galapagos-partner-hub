import { Link } from "react-router-dom";
import { Image as ImageIcon, Package, Sparkles, ArrowRight, FileText, Map as MapIcon } from "lucide-react";

const featured = {
  to: "/recursos/products",
  title: "Our Products",
  sub: "Legend · Coral · GO Quito Hotel · Karanki Magdalena",
  desc: "Tech sheets, deckplans, brochures and HD photo packs for every flagship product. Toggle between branded and unbranded versions.",
  image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1800&q=80",
};

const tiles = [
  {
    to: "/recursos/services",
    title: "Our Services",
    sub: "Best Sellers · Mainland Tours",
    desc: "Cruise + mainland combos, day tours and multi-day journeys.",
    icon: Sparkles,
    tone: "from-primary/20 via-ocean/10 to-transparent",
    accent: "text-primary",
    image: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    to: "/recursos/gallery",
    title: "Gallery",
    sub: "HD photo & video library",
    desc: "Hand-picked imagery by destination and product · 4K institutional video.",
    icon: ImageIcon,
    tone: "from-warning/20 via-warning/5 to-transparent",
    accent: "text-warning",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
  },
];

const quickLinks = [
  { to: "/recursos/products/legend",       label: "Legend brochure", icon: FileText },
  { to: "/recursos/products/coral",        label: "Coral deckplan",  icon: MapIcon },
  { to: "/recursos/services/best-sellers", label: "Top combos",      icon: Sparkles },
  { to: "/recursos/gallery",               label: "Photo pack HD",   icon: ImageIcon },
];

const Recursos = () => {
  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean p-8 lg:p-12 text-white">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1800&q=80)" }}
        />
        <div className="relative max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary-glow">Resource Center</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-2 leading-tight">
            Everything you need to <span className="text-gradient-brand">sell Galápagos</span>.
          </h2>
          <p className="mt-3 text-white/75 max-w-lg text-sm">
            Brochures, deckplans, itineraries, HD photography and ready-to-share material — all in one place, in Spanish & English.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section>
        <Link
          to={featured.to}
          className="group relative overflow-hidden rounded-3xl block h-72 lg:h-80 shadow-soft hover:shadow-elegant transition-all duration-500"
        >
          <img src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/20" />
          <div className="relative h-full p-8 lg:p-12 flex flex-col justify-between text-white max-w-2xl">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-[10px] uppercase tracking-wider">
              <Package className="h-3.5 w-3.5" /> Featured
            </div>
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold leading-tight">{featured.title}</h3>
              <p className="text-primary-glow text-sm mt-2">{featured.sub}</p>
              <p className="text-white/75 text-sm mt-3 max-w-lg">{featured.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Browse products <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Two main tiles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tiles.map(t => (
          <Link
            key={t.to}
            to={t.to}
            className="group relative overflow-hidden rounded-2xl h-60 shadow-soft hover:shadow-elegant transition-all duration-500 bg-card border border-border"
          >
            <div
              className="absolute inset-0 opacity-25 group-hover:opacity-40 bg-cover bg-center transition-opacity"
              style={{ backgroundImage: `url(${t.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${t.tone}`} />
            <div className="relative h-full p-7 flex flex-col justify-between">
              <div className={`h-12 w-12 rounded-xl bg-card shadow-soft grid place-items-center ${t.accent}`}>
                <t.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-navy leading-tight">{t.title}</h3>
                <p className={`text-sm font-medium mt-1 ${t.accent}`}>{t.sub}</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">{t.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-navy group-hover:gap-3 transition-all">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Quick links */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Quick downloads</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(q => (
            <Link
              key={q.to}
              to={q.to}
              className="premium-card p-4 flex items-center gap-3 group hover:gradient-brand hover:text-white transition-premium"
            >
              <div className="h-9 w-9 rounded-lg bg-secondary group-hover:bg-white/20 grid place-items-center text-primary group-hover:text-white transition-colors">
                <q.icon className="h-4 w-4" strokeWidth={1.6} />
              </div>
              <span className="text-sm font-medium text-navy group-hover:text-white">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recursos;
