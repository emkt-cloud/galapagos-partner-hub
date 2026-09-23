import { useState } from "react";
import {
  ArrowLeft, Check, Download, ExternalLink, GraduationCap, ListChecks,
  MonitorPlay, Play,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { academyModules, type AcademyDownload, type AcademyModule } from "@/data/academy";

const langLabel = { en: "English", es: "Español" } as const;

const handleDownload = (d: AcademyDownload, lang?: "en" | "es") => {
  if (d.external) {
    window.open(d.external, "_blank", "noopener");
    toast({ title: "Opening brochure", description: d.label });
    return;
  }
  const l = lang ?? d.langs?.[0] ?? "en";
  const a = document.createElement("a");
  a.href = `/docs/${d.file}-${l}.pdf`;
  a.download = `${d.label.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_")}_${l.toUpperCase()}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast({ title: `Downloading · ${langLabel[l]}`, description: d.label });
};

const DownloadCard = ({ d }: { d: AcademyDownload }) => (
  <div className="premium-card p-4 flex items-center gap-3">
    <span className="h-10 w-10 shrink-0 rounded-xl bg-secondary grid place-items-center">
      {d.external ? <ExternalLink className="h-4.5 w-4.5 text-primary" /> : <FileText className="h-4.5 w-4.5 text-primary" />}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-navy truncate">{d.label}</p>
      <p className="text-[11px] text-muted-foreground">PDF{d.size ? ` · ${d.size}` : ""}</p>
    </div>
    {d.external ? (
      <button
        onClick={() => handleDownload(d)}
        className="h-9 px-4 rounded-lg gradient-brand text-white text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 hover:shadow-glow transition-premium"
      >
        <ExternalLink className="h-3.5 w-3.5" /> Open
      </button>
    ) : d.langs && d.langs.length > 1 ? (
      <div className="flex gap-1.5 shrink-0">
        {d.langs.map(l => (
          <button
            key={l}
            onClick={() => handleDownload(d, l)}
            className="h-9 px-3 rounded-lg border border-border text-xs font-medium text-navy hover:gradient-brand hover:text-white hover:border-transparent transition-premium"
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    ) : (
      <button
        onClick={() => handleDownload(d)}
        className="h-9 px-4 rounded-lg gradient-brand text-white text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 hover:shadow-glow transition-premium"
      >
        <Download className="h-3.5 w-3.5" /> PDF
      </button>
    )}
  </div>
);

const Academy = () => {
  const [active, setActive] = useState<AcademyModule | null>(null);

  const playVideo = (m: AcademyModule) =>
    toast({
      title: m.videoReady ? "Loading lesson video…" : "Video coming soon",
      description: m.videoReady
        ? `${m.title} lesson is ready and will stream here.`
        : `The ${m.title} video is in production — downloads are available now.`,
    });

  if (active) {
    return (
      <div className="space-y-7 max-w-[1100px]">
        <button
          onClick={() => setActive(null)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All GO Academy modules
        </button>

        {/* Video lesson */}
        <section className="relative overflow-hidden rounded-3xl gradient-ocean shadow-navy">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
          <div className="relative aspect-video grid place-items-center">
            <button
              onClick={() => playVideo(active)}
              className="group relative grid place-items-center"
              aria-label={`Play ${active.title} lesson video`}
            >
              <span className="absolute h-28 w-28 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-premium" />
              <span className="relative h-20 w-20 rounded-full bg-white grid place-items-center shadow-elegant">
                <Play className="h-8 w-8 text-navy ml-1" fill="currentColor" />
              </span>
            </button>
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] uppercase tracking-[0.2em] text-white">
              <MonitorPlay className="h-3.5 w-3.5" /> Video lesson · {active.duration}
            </div>
            {active.videoReady && (
              <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready
              </span>
            )}
            <p className="absolute bottom-5 text-white/70 text-xs">{active.title} — one lesson, all the essentials.</p>
          </div>
        </section>

        {/* Summary */}
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="premium-card p-6">
            <h2 className="font-display text-2xl font-bold text-navy">Module {active.id} · {active.title}</h2>
            <span className="mt-2 inline-block text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
              {active.track}
            </span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{active.summary}</p>
          </div>
          <div className="premium-card p-6">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              <ListChecks className="h-3.5 w-3.5 text-primary" /> What you'll learn
            </p>
            <ul className="mt-4 space-y-3">
              {active.topics.map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-navy">
                  <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span className="leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Downloads */}
        <section className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-bold text-navy">Lesson downloads</h3>
            <p className="text-sm text-muted-foreground">Documents that accompany this module, in English & Spanish.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {active.downloads.map(d => <DownloadCard key={d.label} d={d} />)}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-10 shadow-navy">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-3">
            <GraduationCap className="h-3.5 w-3.5 text-primary-glow" />
            <span className="text-[11px] uppercase tracking-[0.22em]">GO Academy</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-light leading-tight">
            Become a <span className="font-semibold">GO Galapagos expert</span>.
          </h1>
          <p className="text-white/75 text-sm mt-3">
            One video per module, a quick summary and downloadable material — about one hour in total.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Modules</h2>
            <p className="text-sm text-muted-foreground">Click a module to open its lesson video, summary and downloads.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {academyModules.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className={cn("premium-card p-6 text-left group hover:shadow-elegant transition-premium")}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-bold text-primary/25 group-hover:text-primary transition-colors">
                  {String(m.id).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                  {m.duration}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy leading-tight">{m.title}</h3>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{m.track}</p>
              <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Play className="h-3 w-3" /> 1 video</span>
                <span className="inline-flex items-center gap-1"><ListChecks className="h-3 w-3" /> {m.topics.length} topics</span>
                <span className="inline-flex items-center gap-1"><Download className="h-3 w-3" /> {m.downloads.length}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Academy;
