import { Download, FileText, Image, Video, FileBox, Search } from "lucide-react";

const cats = ["All", "Brochures", "Photography", "Video", "Itineraries", "Logos", "Sales Deck"];

const items = [
  { type: "pdf",   icon: FileText, title: "Brochure 2025 · Galapagos Legend", lang: "ES · EN", size: "8.4 MB" },
  { type: "image", icon: Image,    title: "Official photography · Coral I",    lang: "RAW",     size: "124 MB" },
  { type: "video", icon: Video,    title: "Institutional video 4K",            lang: "ES",      size: "320 MB" },
  { type: "pdf",   icon: FileText, title: "Itinerary A · Day by day",          lang: "ES · EN · DE", size: "2.1 MB" },
  { type: "pdf",   icon: FileBox,  title: "Sales Deck Q2 2025",                lang: "ES",      size: "12 MB" },
  { type: "image", icon: Image,    title: "Logos · Brand identity pack",       lang: "SVG · PNG", size: "4.6 MB" },
  { type: "pdf",   icon: FileText, title: "GO Quito Hotel Brochure",           lang: "ES · EN", size: "5.2 MB" },
  { type: "video", icon: Video,    title: "Social media reels",                lang: "—",       size: "210 MB" },
];

const typeAccent = {
  pdf:   "from-ocean/20 to-ocean/0 text-ocean",
  image: "from-primary/20 to-primary/0 text-primary",
  video: "from-warning/20 to-warning/0 text-warning",
};

const Recursos = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {cats.map((c, i) => (
            <button key={c} className={`px-4 h-10 rounded-xl text-sm transition-colors ${i===0?"bg-navy text-white":"bg-card border border-border text-navy hover:border-primary/40"}`}>{c}</button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input className="h-10 pl-11 pr-4 w-72 rounded-xl bg-card border border-border text-sm focus:border-primary/40 outline-none" placeholder="Search resources…" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <div key={i} className="premium-card overflow-hidden group">
            <div className={`relative h-40 bg-gradient-to-br ${typeAccent[it.type as keyof typeof typeAccent]}`}>
              <div className="absolute inset-0 grid place-items-center">
                <it.icon className="h-12 w-12 opacity-40 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
              </div>
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/80 backdrop-blur text-navy font-semibold">{it.type}</span>
            </div>
            <div className="p-5">
              <p className="font-medium text-navy text-sm leading-snug min-h-[2.5rem]">{it.title}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>{it.lang}</span>
                <span>{it.size}</span>
              </div>
              <button className="mt-4 w-full h-10 rounded-lg bg-secondary text-navy text-sm font-medium inline-flex items-center justify-center gap-2 hover:gradient-brand hover:text-white hover:shadow-glow transition-premium">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recursos;
