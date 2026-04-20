import { Link } from "react-router-dom";
import { Image as ImageIcon, Package, Sparkles, CalendarCheck, BarChart3, DollarSign, ArrowRight } from "lucide-react";

const tiles = [
  {
    to: "/dashboard",
    title: "Dashboard",
    sub: "Live KPIs · holds · sales",
    icon: BarChart3,
    tone: "from-ocean to-navy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    to: "/reservas",
    title: "New Booking",
    sub: "Create a booking in seconds",
    icon: CalendarCheck,
    tone: "from-primary to-ocean",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    to: "/tarifas",
    title: "Gross Rates",
    sub: "Net & gross tariffs · 2025",
    icon: DollarSign,
    tone: "from-warning to-destructive",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    to: "/recursos/gallery",
    title: "Gallery",
    sub: "HD photo & video library",
    icon: ImageIcon,
    tone: "from-primary-glow to-primary",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
  },
  {
    to: "/recursos/products",
    title: "Our Products",
    sub: "Legend · Coral · GO Quito · Karanki",
    icon: Package,
    tone: "from-ocean to-primary",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    to: "/recursos/services",
    title: "Our Services",
    sub: "Best Sellers · Mainland Tours",
    icon: Sparkles,
    tone: "from-navy to-ocean",
    image: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1200&q=80",
  },
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

      {/* Tiles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map(t => (
          <Link
            key={t.to}
            to={t.to}
            className="group relative overflow-hidden rounded-2xl h-56 shadow-soft hover:shadow-elegant transition-all duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${t.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${t.tone} opacity-85 group-hover:opacity-90 transition-opacity`} />
            <div className="relative h-full p-6 flex flex-col justify-between text-white">
              <div className="h-11 w-11 rounded-xl bg-white/15 backdrop-blur grid place-items-center border border-white/25">
                <t.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight">{t.title}</h3>
                <p className="text-white/80 text-sm mt-1">{t.sub}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium opacity-90 group-hover:gap-3 transition-all">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Recursos;
