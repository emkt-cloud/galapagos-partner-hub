import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Clock, Tag, Check } from "lucide-react";
import { findTour, type ResourceDoc } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";
import DocCard from "@/components/resources/DocCard";
import DownloadDialog from "@/components/resources/DownloadDialog";

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const tour = slug ? findTour(slug) : undefined;
  const [activeDoc, setActiveDoc] = useState<ResourceDoc | null>(null);

  if (!tour) return <Navigate to="/recursos/services" replace />;

  const parent =
    tour.category === "best-seller"
      ? { label: "Best Sellers", to: "/recursos/services/best-sellers" }
      : { label: "Mainland Tours", to: "/recursos/services/mainland" };

  return (
    <div className="space-y-7 max-w-[1400px]">
      <ResourceBreadcrumb
        items={[
          { label: "Our Services", to: "/recursos/services" },
          parent,
          { label: tour.name },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl h-[340px] shadow-elegant">
        <img src={tour.cover} alt={tour.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/95 via-navy/55 to-transparent" />
        <div className="relative h-full p-8 lg:p-10 flex flex-col justify-end text-white max-w-2xl">
          <span className="inline-flex w-fit text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary text-white font-semibold">
            {tour.code}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 leading-tight">{tour.name}</h2>
          <p className="text-white/80 text-sm mt-2">{tour.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs">
              <Clock className="h-3 w-3" /> {tour.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs">
              <Tag className="h-3 w-3" /> From ${tour.fromUSD.toLocaleString()} pp
            </span>
            {tour.highlights.map(h => (
              <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs">
                <Check className="h-3 w-3 text-primary-glow" /> {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Docs */}
      <section className="space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold text-navy">Downloadable resources</h3>
          <p className="text-sm text-muted-foreground">Itinerary, route map and HD photo pack — Spanish & English.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tour.docs.map(d => (
            <DocCard key={d.id} doc={d} onClick={() => setActiveDoc(d)} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-navy">Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {tour.gallery.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <img src={src} alt={`${tour.name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <DownloadDialog doc={activeDoc} open={!!activeDoc} onOpenChange={(v) => !v && setActiveDoc(null)} />
    </div>
  );
};

export default TourDetail;
