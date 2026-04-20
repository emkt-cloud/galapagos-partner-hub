import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag, MapPin } from "lucide-react";
import { mainlandTours } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

const groups = [
  { label: "Quito", category: "mainland-quito" as const },
  { label: "Otavalo", category: "mainland-otavalo" as const },
];

const MainlandTours = () => {
  return (
    <div className="space-y-8 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Our Services", to: "/recursos/services" }, { label: "Mainland Tours" }]} />

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-navy">Mainland Tours</h2>
        <p className="text-sm text-muted-foreground">Five curated experiences across Ecuador's Andes — perfect pre/post-cruise add-ons.</p>
      </div>

      {groups.map(g => {
        const items = mainlandTours.filter(t => t.category === g.category);
        return (
          <section key={g.label} className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-bold text-navy">{g.label}</h3>
              <span className="text-xs text-muted-foreground">· {items.length} tour{items.length > 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map(t => (
                <Link
                  key={t.slug}
                  to={`/recursos/services/${t.slug}`}
                  className="premium-card overflow-hidden group flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={t.cover} alt={t.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-warning text-white font-semibold">
                      {t.code}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="font-display text-base font-bold text-navy leading-tight">{t.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t.tagline}</p>
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
          </section>
        );
      })}
    </div>
  );
};

export default MainlandTours;
