import { useState } from "react";
import { Calendar, Download, Sparkles, Wifi, BedDouble, FileText } from "lucide-react";
import DownloadDialog from "@/components/resources/DownloadDialog";
import type { ResourceDoc } from "@/data/resources";

const yearDocs: ResourceDoc[] = [
  { id: "rates-2026", label: "Rates 2026", kind: "brochure", size: "3.8 MB", langs: ["es", "en"], file: "/docs/rates-2026" },
  { id: "rates-2027", label: "Rates 2027", kind: "brochure", size: "3.9 MB", langs: ["es", "en"], file: "/docs/rates-2027" },
];

const promos = [
  { icon: Calendar,  tag: "−15%", title: "Early Bird",                                desc: "Book 2027 departures before Sep 30, 2026 and save 15%." },
  { icon: BedDouble, tag: "+3N",  title: "3 Complimentary Nights at GO Quito Hotel",  desc: "Free with any 8D Galapagos cruise · until Dec 31, 2026." },
  { icon: Wifi,      tag: "FREE", title: "Free WiFi onboard",                          desc: "Unlimited browsing for all guests on 2026 departures." },
];

const Tarifas = () => {
  const [activeDoc, setActiveDoc] = useState<ResourceDoc | null>(null);

  return (
    <div className="space-y-8 max-w-[1400px]">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Rates</h1>
        <p className="text-sm text-muted-foreground mt-1">Download the official partner gross rates · USD per pax · double occupancy.</p>
      </div>

      {/* Year tariff downloads */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {yearDocs.map(d => (
          <button
            key={d.id}
            onClick={() => setActiveDoc(d)}
            className="premium-card p-7 text-left group hover:shadow-elegant transition-premium relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-start gap-5">
              <div className="h-14 w-14 rounded-2xl gradient-brand text-white grid place-items-center shadow-glow">
                <FileText className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1">Tariffs</p>
                <h3 className="font-display text-2xl font-semibold text-navy">Download {d.label}</h3>
                <p className="text-sm text-muted-foreground mt-2">Choose between English and Spanish · {d.size}</p>
                <span className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-secondary text-navy text-sm font-medium group-hover:gradient-brand group-hover:text-white transition-premium">
                  <Download className="h-4 w-4" /> Choose language
                </span>
              </div>
            </div>
          </button>
        ))}
      </section>

      {/* Promotions */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-navy inline-flex items-center gap-2 mb-5">
          <Sparkles className="h-5 w-5 text-primary" /> Active promotions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {promos.map(p => (
            <div key={p.title} className="premium-card p-6 group relative overflow-hidden">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center text-white shadow-glow">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{p.tag}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-navy mt-4">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DownloadDialog doc={activeDoc} open={!!activeDoc} onOpenChange={v => !v && setActiveDoc(null)} />
    </div>
  );
};

export default Tarifas;
