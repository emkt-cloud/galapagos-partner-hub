import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { bestSellers } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

const BestSellers = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Our Services", to: "/recursos/services" }, { label: "Best Sellers" }]} />

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-navy">Best Sellers</h2>
        <p className="text-sm text-muted-foreground">Six top-performing combos blending Galapagos cruises with mainland Ecuador and Peru.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bestSellers.map(t => (
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
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] uppercase tracking-wider opacity-80">{t.tagline}</p>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-base font-bold text-navy leading-tight">{t.name}</h3>
              <div className="mt-3 space-y-1.5">
                {t.highlights.map(h => (
                  <p key={h} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" />{h}
                  </p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {t.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-navy mt-1">
                    <Tag className="h-3.5 w-3.5 text-primary" /> From ${t.fromUSD.toLocaleString()}
                  </div>
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
