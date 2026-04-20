import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

const ProductsList = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Our Products" }]} />

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-navy">Our Products</h2>
        <p className="text-sm text-muted-foreground">Four flagship experiences. Tap any product to access tech sheets, deckplans, itineraries and gallery.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map(p => (
          <Link
            key={p.slug}
            to={`/recursos/products/${p.slug}`}
            className="group relative overflow-hidden rounded-3xl h-72 shadow-soft hover:shadow-elegant transition-all duration-500"
          >
            <img src={p.cover} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/90 via-navy/50 to-transparent" />
            <div className="relative h-full p-7 flex flex-col justify-end text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary-glow">{p.tagline}</p>
              <h3 className="font-display text-2xl font-bold mt-1.5 leading-tight">{p.name}</h3>
              <p className="text-white/75 text-sm mt-2 line-clamp-2 max-w-md">{p.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20">{p.docs.length} docs</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20">{p.gallery.length} photos</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all">
                  Open <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
