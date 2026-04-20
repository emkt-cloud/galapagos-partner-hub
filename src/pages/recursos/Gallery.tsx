import { useState, useMemo } from "react";
import { Search, Download, Play, Image as ImageIcon } from "lucide-react";
import { galleryItems, galleryCategories } from "@/data/resources";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";
import { toast } from "@/hooks/use-toast";

const Gallery = () => {
  const [active, setActive] = useState<string>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return galleryItems.filter(g =>
      (active === "All" || g.category === active) &&
      (q === "" || g.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [active, q]);

  const handleDownload = (title: string, size: string) => {
    toast({ title: `Downloading HD · ${title}`, description: size });
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <ResourceBreadcrumb items={[{ label: "Gallery" }]} />

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-navy">Gallery</h2>
        <p className="text-sm text-muted-foreground">High-resolution photography & video by service or product.</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 h-10 rounded-xl text-sm transition-colors ${
                active === c ? "bg-navy text-white" : "bg-card border border-border text-navy hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 pl-11 pr-4 w-72 rounded-xl bg-card border border-border text-sm focus:border-primary/40 outline-none"
            placeholder="Search assets…"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(g => (
          <div key={g.id} className="premium-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img src={g.url} alt={g.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/85 backdrop-blur text-navy font-semibold inline-flex items-center gap-1">
                {g.type === "video" ? <Play className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />} {g.type}
              </span>
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-primary/90 text-white font-semibold">HD</span>
            </div>
            <div className="p-4">
              <p className="font-medium text-navy text-sm leading-snug">{g.title}</p>
              <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                <span>{g.category}</span>
                <span>{g.size}</span>
              </div>
              <button
                onClick={() => handleDownload(g.title, g.size)}
                className="mt-3 w-full h-10 rounded-lg bg-secondary text-navy text-sm font-medium inline-flex items-center justify-center gap-2 hover:gradient-brand hover:text-white hover:shadow-glow transition-premium"
              >
                <Download className="h-3.5 w-3.5" /> Download HD
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">No assets match your search.</div>
      )}
    </div>
  );
};

export default Gallery;
