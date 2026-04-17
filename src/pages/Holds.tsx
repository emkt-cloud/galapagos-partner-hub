import { Clock4, AlertTriangle, Ship, ArrowRight, X, RefreshCcw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type HoldStatus = "critical" | "warning" | "ok";

type Hold = {
  ref: string;
  client: string;
  ship: string;
  cabin: string;
  departure: string;
  expiresIn: number; // days
  total: string;
  pax: number;
};

const holds: Hold[] = [
  { ref: "GO-2841", client: "Maria Pérez",     ship: "Galapagos Legend", cabin: "Balcony Suite", departure: "Apr 22, 2025", expiresIn: 1, total: "$9,780",  pax: 2 },
  { ref: "GO-2839", client: "Robert Klein",    ship: "Coral II",         cabin: "Junior Suite",  departure: "Apr 26, 2025", expiresIn: 3, total: "$7,120",  pax: 2 },
  { ref: "GO-2836", client: "Sophie Laurent",  ship: "Coral I",          cabin: "Standard Plus", departure: "Apr 29, 2025", expiresIn: 6, total: "$11,350", pax: 4 },
  { ref: "GO-2830", client: "Hiroshi Tanaka",  ship: "Galapagos Legend", cabin: "Standard",      departure: "May 2, 2025",  expiresIn: 8, total: "$8,490",  pax: 2 },
];

const statusOf = (d: number): HoldStatus => d <= 2 ? "critical" : d <= 4 ? "warning" : "ok";
const max = 7;

const statusMap = {
  critical: { ring: "hsl(var(--destructive))", text: "text-destructive", bg: "bg-destructive/10", label: "Urgent" },
  warning:  { ring: "hsl(var(--warning))",     text: "text-warning",     bg: "bg-warning/10",     label: "Soon" },
  ok:       { ring: "hsl(var(--success))",     text: "text-success",     bg: "bg-success/10",     label: "OK" },
} as const;

const Holds = () => {
  const counts = {
    critical: holds.filter(h => statusOf(h.expiresIn) === "critical").length,
    warning:  holds.filter(h => statusOf(h.expiresIn) === "warning").length,
    ok:       holds.filter(h => statusOf(h.expiresIn) === "ok").length,
  };

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 premium-card p-7 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warning/15 blur-3xl" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.28em] text-warning mb-3 inline-flex items-center gap-2">
              <Clock4 className="h-3.5 w-3.5" /> Active holds
            </p>
            <p className="font-display text-5xl font-semibold text-navy leading-none">{holds.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total accumulated value of <span className="text-navy font-semibold">$36,740</span></p>
          </div>
        </div>
        {[
          { k: "critical" as const, label: "Expiring in ≤ 2 days", count: counts.critical },
          { k: "warning"  as const, label: "Between 3 and 4 days", count: counts.warning },
          { k: "ok"       as const, label: "More than 5 days",     count: counts.ok },
        ].map(s => {
          const v = statusMap[s.k];
          return (
            <div key={s.label} className="premium-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("h-9 w-9 rounded-lg grid place-items-center", v.bg, v.text)}>
                  {s.k === "critical" ? <AlertTriangle className="h-4 w-4" /> :
                   s.k === "warning"  ? <Clock4 className="h-4 w-4" /> :
                                        <CheckCircle2 className="h-4 w-4" />}
                </span>
                <span className={cn("pill", v.bg, v.text)}>{v.label}</span>
              </div>
              <p className="font-display text-3xl font-semibold text-navy leading-none">{s.count}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{s.label}</p>
            </div>
          );
        })}
      </section>

      {/* Hold cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {holds.map((h, i) => {
          const st = statusOf(h.expiresIn);
          const v = statusMap[st];
          const pct = Math.min(100, (h.expiresIn / max) * 100);
          return (
            <article
              key={h.ref}
              style={{ animationDelay: `${i * 70}ms` }}
              className="premium-card p-6 animate-fade-up group relative overflow-hidden"
            >
              <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: v.ring }} />

              <div className="flex items-start gap-5">
                {/* Countdown ring */}
                <div className="relative h-20 w-20 shrink-0 rounded-full grid place-items-center"
                  style={{ background: `conic-gradient(${v.ring} ${pct}%, hsl(var(--secondary)) 0)` }}>
                  <div className="h-[68px] w-[68px] rounded-full bg-card grid place-items-center">
                    <div className="text-center">
                      <p className={cn("font-display text-xl font-semibold leading-none", v.text)}>{h.expiresIn}</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{h.expiresIn === 1 ? "day" : "days"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] text-muted-foreground">{h.ref}</p>
                      <p className="font-display text-[17px] font-semibold text-navy leading-tight truncate">{h.client}</p>
                    </div>
                    <span className={cn("pill shrink-0", v.bg, v.text)}>{v.label}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-navy/80 mt-2">
                    <Ship className="h-3.5 w-3.5 text-ocean" />
                    {h.ship} · <span className="text-muted-foreground">{h.cabin}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-muted-foreground mt-1">
                    <span>Departs {h.departure}</span>
                    <span>· {h.pax} pax</span>
                    <span>· <span className="text-navy font-display font-semibold">{h.total}</span></span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-border/60">
                <button className="h-10 rounded-xl gradient-brand text-white text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 shadow-glow hover:shadow-elegant transition-premium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Confirm
                </button>
                <button className="h-10 rounded-xl border border-border bg-card text-navy text-[12.5px] font-medium hover:border-primary/40 transition-colors inline-flex items-center justify-center gap-1.5">
                  <RefreshCcw className="h-3.5 w-3.5" /> Extend
                </button>
                <button className="h-10 rounded-xl border border-border bg-card text-muted-foreground text-[12.5px] font-medium hover:border-destructive/40 hover:text-destructive transition-colors inline-flex items-center justify-center gap-1.5">
                  <X className="h-3.5 w-3.5" /> Cancel
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Holds;
