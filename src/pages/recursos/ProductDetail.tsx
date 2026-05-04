import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Check, Layers, Sparkles } from "lucide-react";
import { findProduct, type ResourceDoc, type ProductSlug } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";
import DocCard from "@/components/resources/DocCard";
import DownloadDialog from "@/components/resources/DownloadDialog";

const journeyDocs: ResourceDoc[] = [
  { id: "journey-branded",   label: "Branded version",   kind: "brochure", size: "6.4 MB", langs: ["es", "en"], file: "/docs/journey-branded" },
  { id: "journey-unbranded", label: "Unbranded version", kind: "brochure", size: "6.1 MB", langs: ["es", "en"], file: "/docs/journey-unbranded" },
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: ProductSlug }>();
  const product = slug ? findProduct(slug) : undefined;
  const [activeDoc, setActiveDoc] = useState<ResourceDoc | null>(null);

  if (!product) return <Navigate to="/recursos/products" replace />;

  return (
    <div className="space-y-7 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Our Products", to: "/recursos/products" }, { label: product.name }]} />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl h-[340px] shadow-elegant">
        <img src={product.cover} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/95 via-navy/55 to-transparent" />
        <div className="relative h-full p-8 lg:p-10 flex flex-col justify-end text-white max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary-glow">{product.tagline}</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-2 leading-tight">{product.name}</h2>
          <p className="text-white/80 text-sm mt-3 max-w-lg">{product.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {product.highlights.map(h => (
              <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs">
                <Check className="h-3 w-3 text-primary-glow" /> {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Docs */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-navy">Downloadable resources</h3>
            <p className="text-sm text-muted-foreground">Available in Spanish & English.</p>
          </div>
          <span className="text-xs text-muted-foreground">{product.docs.length} files</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {product.docs.map(d => (
            <DocCard key={d.id} doc={d} onClick={() => setActiveDoc(d)} />
          ))}
        </div>
      </section>

      {/* Journey Resources */}
      <section className="space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold text-navy inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Journey Resources
          </h3>
          <p className="text-sm text-muted-foreground">Sales-ready material in branded or unbranded format.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {journeyDocs.map(d => (
            <DocCard key={d.id} doc={d} onClick={() => setActiveDoc(d)} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-navy">Gallery</h3>
            <p className="text-sm text-muted-foreground">Hand-picked HD imagery.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {product.gallery.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
              <img src={src} alt={`${product.name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      <DownloadDialog doc={activeDoc} open={!!activeDoc} onOpenChange={(v) => !v && setActiveDoc(null)} />
    </div>
  );
};

export default ProductDetail;
