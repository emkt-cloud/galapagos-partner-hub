import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag, Star, MapPin } from "lucide-react";
import { bestSellers } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

const BestSellers = () => {
  const [hero, ...rest] = bestSellers;

  return (
    <div className="space-y-7 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Our Services", to: "/recursos/services" }, { label: "Best Sellers" }]} />

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-navy inline-flex items-center gap-2">
          <Star className="h-5 w-5 text-primary fill-primary" /> Best Sellers
        </h2>
        <p className="text-sm text-muted-foreground">Top-performing combos blending Galápagos cruises with mainland Ecuador and Peru.</p>
      </div>

      {/* Featured hero */}
      <Link
        to={`/recursos/services/${hero.slug}`}
        className="group relative overflow-hidden rounded-3xl block h-[360px] shadow-soft hover:shadow-elegant transition-all duration-500"
      >
        <img src={hero.cover} alt={hero.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/10" />
        <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between text-white max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-primary text-white text-[10px] uppercase tracking-wider font-bold">{hero.code}</span>
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Star className="h-3 w-3 fill-primary-glow text-primary-glow" /> #1 Best Seller
            </span>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-primary-glow">{hero.tagline}</p>
            <h3 className="font-display text-3xl lg:text-4xl font-bold mt-2 leading-tight">{hero.name}</h3>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {hero.duration}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Quito + Galápagos</span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/60">From</p>
                <p className="font-display text-3xl font-bold">${hero.fromUSD.toLocaleString()}<span className="text-sm font-normal text-white/70"> /pax</span></p>
              </div>
              <span className="h-11 px-5 rounded-xl bg-white text-navy font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View itinerary <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map(t => (
          <Link
            key={t.slug}
            to={`/recursos/services/${t.slug}`}
            className="premium-card overflow-hidden group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={t.cover} alt={t.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary text-white font-semibold">
                {t.code}
              </span>
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-navy font-semibold inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {t.duration.split("·")[0].trim()}
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] uppercase tracking-wider opacity-80">{t.tagline}</p>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-base font-bold text-navy leading-tight">{t.name}</h3>
              <div className="mt-3 space-y-1.5 flex-1">
                {t.highlights.map(h => (
                  <p key={h} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" />{h}
                  </p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm font-semibold text-navy">
                  <Tag className="h-3.5 w-3.5 text-primary" /> From ${t.fromUSD.toLocaleString()}
                </div>
                <span className="h-9 w-9 rounded-lg bg-secondary grid place-items-center group-hover:gradient-brand group-hover:text-white transition-premium">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
