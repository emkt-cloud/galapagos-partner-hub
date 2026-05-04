import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Mountain } from "lucide-react";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

const services = [
  {
    to: "/recursos/services/best-sellers",
    title: "Best Sellers",
    sub: "6 cruise + mainland combos",
    description: "Our top-selling Galápagos packages combined with Quito, Andes and Peru.",
    icon: Sparkles,
    cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    to: "/recursos/services/mainland",
    title: "Mainland Tours",
    sub: "5 day-tours · Quito & Otavalo",
    description: "Half-day to 2-day curated experiences across Ecuador's highlands.",
    icon: Mountain,
    cover: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1600&q=80",
  },
];

const ServicesList = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Our Services" }]} />

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-navy">Our Services</h2>
        <p className="text-sm text-muted-foreground">Pre-built journeys ready to quote and download.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map(s => (
          <Link
            key={s.to}
            to={s.to}
            className="group relative overflow-hidden rounded-3xl h-80 shadow-soft hover:shadow-elegant transition-all duration-500"
          >
            <img src={s.cover} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/90 via-navy/50 to-transparent" />
            <div className="relative h-full p-8 flex flex-col justify-between text-white">
              <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center border border-white/25">
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-primary-glow">{s.sub}</p>
                <h3 className="font-display text-2xl font-bold mt-1.5 leading-tight">{s.title}</h3>
                <p className="text-white/75 text-sm mt-2 max-w-md">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
