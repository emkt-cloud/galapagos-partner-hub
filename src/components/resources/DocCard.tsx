import { Download, FileText, Map, Image as ImageIcon, Layers, BookOpen, ScrollText } from "lucide-react";
import type { ResourceDoc } from "@/data/resources";

const kindMeta: Record<ResourceDoc["kind"], { icon: any; tone: string; label: string }> = {
  tech:      { icon: ScrollText, tone: "from-ocean/15 to-ocean/0 text-ocean",      label: "Tech sheet" },
  deckplan:  { icon: Layers,     tone: "from-navy/15 to-navy/0 text-navy",         label: "Deckplan" },
  itinerary: { icon: BookOpen,   tone: "from-primary/15 to-primary/0 text-primary",label: "Itinerary" },
  gallery:   { icon: ImageIcon,  tone: "from-warning/15 to-warning/0 text-warning",label: "Photo pack" },
  map:       { icon: Map,        tone: "from-success/15 to-success/0 text-success",label: "Map" },
  brochure:  { icon: FileText,   tone: "from-primary/15 to-ocean/10 text-ocean",   label: "Brochure" },
};

const DocCard = ({ doc, onClick }: { doc: ResourceDoc; onClick: () => void }) => {
  const meta = kindMeta[doc.kind];
  return (
    <button
      onClick={onClick}
      className="premium-card text-left overflow-hidden group flex flex-col"
    >
      <div className={`relative h-28 bg-gradient-to-br ${meta.tone}`}>
        <div className="absolute inset-0 grid place-items-center">
          <meta.icon className="h-10 w-10 opacity-40 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
        </div>
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/85 backdrop-blur text-navy font-semibold">
          {meta.label}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-medium text-navy text-sm leading-snug">{doc.label}</p>
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{doc.langs.map(l => l.toUpperCase()).join(" · ")}</span>
          <span>{doc.size}</span>
        </div>
        <span className="mt-3 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-secondary text-navy text-xs font-medium group-hover:gradient-brand group-hover:text-white group-hover:shadow-glow transition-premium">
          <Download className="h-3.5 w-3.5" /> Download
        </span>
      </div>
    </button>
  );
};

export default DocCard;
