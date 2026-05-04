import { Clock4, AlertTriangle, Ship, X, CreditCard, CheckCircle2, Plus, Plane, MapPin, FileText } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import shipLegend from "@/assets/ship-legend.jpg";
import shipCoral1 from "@/assets/ship-coral1.jpg";
import shipCoral2 from "@/assets/ship-coral2.jpg";

const shipImageMap: Record<string, string> = {
  "Galapagos Legend": shipLegend,
  "Coral I": shipCoral1,
  "Coral II": shipCoral2,
};

type HoldStatus = "critical" | "warning" | "ok";

type Hold = {
  ref: string;       // Q 12909x
  partner: string;
  client: string;
  ship: string;
  cabin: string;
  departure: string;
  expiresIn: number;
  total: string;
  pax: number;
  status: "Hold";
};

const holds: Hold[] = [
  { ref: "Q 129090", partner: "Andes Travel", client: "Maria Pérez",     ship: "Galapagos Legend", cabin: "Balcony Suite", departure: "Apr 22, 2026", expiresIn: 1, total: "$9,780",  pax: 2, status: "Hold" },
  { ref: "Q 129088", partner: "Andes Travel", client: "Robert Klein",    ship: "Coral II",         cabin: "Junior Suite",  departure: "Apr 26, 2026", expiresIn: 3, total: "$7,120",  pax: 2, status: "Hold" },
  { ref: "Q 129085", partner: "Andes Travel", client: "Sophie Laurent",  ship: "Coral I",          cabin: "Standard Plus", departure: "Apr 29, 2026", expiresIn: 6, total: "$11,350", pax: 4, status: "Hold" },
  { ref: "Q 129081", partner: "Andes Travel", client: "Hiroshi Tanaka",  ship: "Galapagos Legend", cabin: "Standard",      departure: "May 2, 2026",  expiresIn: 8, total: "$8,490",  pax: 2, status: "Hold" },
];

const statusOf = (d: number): HoldStatus => d <= 2 ? "critical" : d <= 4 ? "warning" : "ok";

const statusMap = {
  critical: { ring: "hsl(var(--destructive))", text: "text-destructive", bg: "bg-destructive/10", label: "Urgent" },
  warning:  { ring: "hsl(var(--warning))",     text: "text-warning",     bg: "bg-warning/10",     label: "Soon" },
  ok:       { ring: "hsl(var(--success))",     text: "text-success",     bg: "bg-success/10",     label: "OK" },
} as const;

// === Detail view (when /holds/:ref) ===
const HoldDetail = ({ hold }: { hold: Hold }) => (
  <div className="space-y-6 max-w-[1200px]">
    <Link to="/holds" className="text-xs text-primary hover:text-ocean inline-flex items-center gap-1">← Back to holds</Link>

    {/* Booking Management Panel */}
    <section className="premium-card p-6 lg:p-7 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
      <div className="relative">
        <p className="text-[10px] uppercase tracking-[0.28em] text-primary mb-2">Booking Management Panel</p>
        <h2 className="font-display text-2xl font-semibold text-navy">{hold.ref} · {hold.client}</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          Manage your quotation: hold cabins, add or modify services, confirm booking, process payments, or cancel the quotation.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-medium inline-flex items-center gap-2 shadow-glow hover:shadow-elegant transition-premium">
            <CreditCard className="h-4 w-4" /> Confirmation & Payments
          </button>
          <button className="h-10 px-4 rounded-xl bg-card border border-border text-navy text-sm font-medium hover:border-primary/40 transition-colors inline-flex items-center gap-2">
            <Clock4 className="h-4 w-4" /> Extend Hold
          </button>
          <button className="h-10 px-4 rounded-xl bg-card border border-border text-muted-foreground text-sm font-medium hover:border-destructive/40 hover:text-destructive transition-colors inline-flex items-center gap-2">
            <X className="h-4 w-4" /> Cancel Quote
          </button>
        </div>
      </div>
    </section>

    {/* Add Services / Itinerary */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 premium-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-navy">Add Services / Itinerary</h3>
          <button className="text-xs text-primary font-medium inline-flex items-center gap-1"><Plus className="h-3 w-3" /> Add service</button>
        </div>
        <div className="space-y-3">
          {[
            { icon: Ship,  t: "Galapagos cruise · Legend",      d: "Itin A · 5n · 2 pax · Balcony Suite", v: "$9,780" },
            { icon: Plane, t: "Internal flight UIO–GPS–UIO",    d: "Avianca · Apr 22 / Apr 27",            v: "$890" },
            { icon: MapPin,t: "Pre-cruise night · GO Quito",    d: "Apr 21 · Junior Suite",                v: "$280" },
          ].map(s => (
            <div key={s.t} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="h-9 w-9 rounded-lg bg-white grid place-items-center text-primary shadow-soft">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy">{s.t}</p>
                <p className="text-[11.5px] text-muted-foreground">{s.d}</p>
              </div>
              <span className="font-display font-semibold text-navy">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="premium-card p-6">
        <h3 className="font-display text-lg font-semibold text-navy mb-4">Pricing per pax</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Cruise base</span><span className="text-navy">$4,400</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Flights</span><span className="text-navy">$445</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Hotel night</span><span className="text-navy">$140</span></div>
          <div className="flex justify-between border-t border-border pt-3 mt-3">
            <span className="font-medium text-navy">Per pax</span><span className="font-display font-semibold text-navy">$4,985</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-navy">Total ({hold.pax} pax)</span><span className="font-display font-semibold text-primary">{hold.total}</span>
          </div>
        </div>
        <button className="mt-5 w-full h-10 rounded-xl bg-secondary text-navy text-sm font-medium hover:bg-accent inline-flex items-center justify-center gap-2">
          <FileText className="h-3.5 w-3.5" /> Download quote PDF
        </button>
      </div>
    </section>
  </div>
);

const Holds = () => {
  const { ref } = useParams<{ ref: string }>();
  const counts = {
    critical: holds.filter(h => statusOf(h.expiresIn) === "critical").length,
    warning:  holds.filter(h => statusOf(h.expiresIn) === "warning").length,
    ok:       holds.filter(h => statusOf(h.expiresIn) === "ok").length,
  };

  if (ref) {
    const hold = holds.find(h => h.ref.replace(/\s+/g, "-") === ref) ?? holds[0];
    return <HoldDetail hold={hold} />;
  }

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
            <p className="text-sm text-muted-foreground mt-2">Quotations on hold awaiting confirmation</p>
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

      {/* Table */}
      <section className="premium-card p-0 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-b border-border/60 bg-secondary/30">
                <th className="text-left font-medium px-6 py-3">Quotation Ref.</th>
                <th className="text-left font-medium py-3">Partner</th>
                <th className="text-left font-medium py-3">Client</th>
                <th className="text-center font-medium py-3">Pax</th>
                <th className="text-left font-medium py-3">Departure</th>
                <th className="text-left font-medium py-3">Status</th>
                <th className="text-left font-medium py-3">Time left</th>
                <th className="text-right font-medium px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {holds.map(h => {
                const v = statusMap[statusOf(h.expiresIn)];
                return (
                  <tr key={h.ref} className="hover:bg-secondary/40 transition-colors">
                    <td className="px-6 py-3.5">
                      <Link to={`/holds/${h.ref.replace(/\s+/g, "-")}`} className="font-mono text-[12px] font-medium text-navy hover:text-primary">
                        {h.ref}
                      </Link>
                    </td>
                    <td className="py-3.5 text-navy/80">{h.partner}</td>
                    <td className="py-3.5 font-medium text-navy">{h.client}</td>
                    <td className="py-3.5 text-center text-navy/80">{h.pax}</td>
                    <td className="py-3.5 text-muted-foreground">{h.departure}</td>
                    <td className="py-3.5"><span className="pill bg-warning/15 text-warning">{h.status}</span></td>
                    <td className="py-3.5"><span className={cn("pill", v.bg, v.text)}>{h.expiresIn}d · {v.label}</span></td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="inline-flex gap-1.5">
                        <Link to={`/holds/${h.ref.replace(/\s+/g, "-")}`} className="h-8 px-3 rounded-lg bg-warning/10 text-warning text-[11px] font-medium inline-flex items-center gap-1 hover:bg-warning/15">
                          <Clock4 className="h-3 w-3" /> Hold
                        </Link>
                        <button className="h-8 px-3 rounded-lg gradient-brand text-white text-[11px] font-medium inline-flex items-center gap-1 shadow-glow">
                          <CreditCard className="h-3 w-3" /> Confirm & Pay
                        </button>
                        <button className="h-8 px-3 rounded-lg bg-card border border-border text-muted-foreground text-[11px] font-medium hover:border-destructive/40 hover:text-destructive inline-flex items-center gap-1">
                          <X className="h-3 w-3" /> Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/40">
          {holds.map(h => {
            const v = statusMap[statusOf(h.expiresIn)];
            return (
              <div key={h.ref} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/holds/${h.ref.replace(/\s+/g, "-")}`} className="font-mono text-[12px] text-navy font-medium">{h.ref}</Link>
                    <p className="font-display font-semibold text-navy">{h.client}</p>
                    <p className="text-[11.5px] text-muted-foreground">{h.partner} · {h.pax} pax · {h.departure}</p>
                  </div>
                  <span className={cn("pill", v.bg, v.text)}>{h.expiresIn}d</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Link to={`/holds/${h.ref.replace(/\s+/g, "-")}`} className="h-9 rounded-lg bg-warning/10 text-warning text-[11px] font-medium inline-flex items-center justify-center gap-1">
                    <Clock4 className="h-3 w-3" /> Hold
                  </Link>
                  <button className="h-9 rounded-lg gradient-brand text-white text-[11px] font-medium inline-flex items-center justify-center gap-1">
                    <CreditCard className="h-3 w-3" /> Confirm
                  </button>
                  <button className="h-9 rounded-lg bg-card border border-border text-muted-foreground text-[11px] font-medium inline-flex items-center justify-center gap-1">
                    <X className="h-3 w-3" /> Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Holds;
