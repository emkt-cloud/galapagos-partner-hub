import {
  ArrowUpRight, ArrowDownRight, TrendingUp, Users, Ship, Sparkles,
  Clock4, CheckCircle2, FileText, Zap, AlertTriangle, MoreHorizontal,
  ChevronRight, Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const kpis = [
  { label: "Reservas activas",  value: "182",  delta: "+12.4%",      up: true,  icon: Users,        tone: "primary"  },
  { label: "Holds pendientes",  value: "3",    delta: "1 vence hoy", up: false, icon: Clock4,       tone: "warning"  },
  { label: "Revenue del mes",   value: "$284K",delta: "+8.2%",       up: true,  icon: TrendingUp,   tone: "ocean"    },
  { label: "Próximas salidas",  value: "14",   delta: "esta semana", up: true,  icon: Ship,         tone: "primary"  },
  { label: "Cabinas libres",    value: "37",   delta: "-6 vs ayer",  up: false, icon: CheckCircle2, tone: "ocean"    },
  { label: "Millas",            value: "48.2K",delta: "Platinum",    up: true,  icon: Sparkles,     tone: "primary"  },
];

const quotes = [
  { date: "16 Abr", client: "Maria Pérez",     product: "Legend · Itin A · 5n",  value: "$9,780",  status: "Sent",     pill: "bg-primary/15 text-primary"   },
  { date: "15 Abr", client: "Robert Klein",    product: "Coral II · Norte · 4n", value: "$7,120",  status: "Pending",  pill: "bg-warning/15 text-warning"   },
  { date: "15 Abr", client: "Sophie Laurent",  product: "Combo Quito + Coral I", value: "$11,350", status: "Reviewed", pill: "bg-ocean/15 text-ocean"       },
  { date: "14 Abr", client: "Hiroshi Tanaka",  product: "Legend · Itin B · 4n",  value: "$8,490",  status: "Sent",     pill: "bg-primary/15 text-primary"   },
];

const holds = [
  { ref: "GO-2841", ship: "Galapagos Legend", date: "22 Abr",  exp: 1, total: "$9,780"  },
  { ref: "GO-2839", ship: "Coral II",         date: "26 Abr",  exp: 3, total: "$7,120"  },
  { ref: "GO-2836", ship: "Coral I",          date: "29 Abr",  exp: 6, total: "$11,350" },
];

const confirmed = [
  { code: "GO-2820", ref: "AT-9271", ship: "Legend",  date: "22 Abr", total: "$9,780",  paid: 50  },
  { code: "GO-2818", ref: "AT-9268", ship: "Coral I", date: "24 Abr", total: "$11,350", paid: 100 },
  { code: "GO-2815", ref: "AT-9261", ship: "Coral II",date: "26 Abr", total: "$7,120",  paid: 30  },
];

const Sparkline = () => (
  <svg viewBox="0 0 320 80" className="w-full h-20">
    <defs>
      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,60 L26,55 L52,58 L78,42 L104,48 L130,32 L156,38 L182,24 L208,30 L234,18 L260,22 L286,12 L320,16 L320,80 L0,80 Z" fill="url(#g1)" />
    <path d="M0,60 L26,55 L52,58 L78,42 L104,48 L130,32 L156,38 L182,24 L208,30 L234,18 L260,22 L286,12 L320,16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    <circle cx="320" cy="16" r="4" fill="hsl(var(--primary))" />
    <circle cx="320" cy="16" r="8" fill="hsl(var(--primary))" fillOpacity="0.25" />
  </svg>
);

const HoldRing = ({ days }: { days: number }) => {
  const max = 7;
  const pct = Math.max(0, Math.min(100, (days / max) * 100));
  const color = days <= 2 ? "hsl(var(--destructive))" : days <= 4 ? "hsl(var(--warning))" : "hsl(var(--success))";
  return (
    <div className="relative h-11 w-11 rounded-full grid place-items-center"
      style={{ background: `conic-gradient(${color} ${pct}%, hsl(var(--secondary)) 0)` }}>
      <div className="h-8 w-8 rounded-full bg-card grid place-items-center">
        <span className="text-[11px] font-display font-semibold text-navy">{days}d</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Hero strip */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-7 lg:p-9 shadow-navy">
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-[90px]" />
        <div className="absolute inset-0 grid-luxe opacity-[0.08]" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary-glow mb-3">Resumen Comercial · Abril 2025</p>
            <h2 className="font-display text-3xl lg:text-[44px] font-light leading-[1.1] max-w-2xl tracking-tight">
              Vas <span className="font-semibold text-primary-glow">8.2%</span> sobre el objetivo del mes.
            </h2>
            <p className="text-white/65 mt-3 max-w-md text-[15px]">Tu mejor abril del trienio. Asegura mayo con las salidas de Coral II.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link to="/reservas" className="h-11 px-5 rounded-xl bg-white text-navy font-medium hover:bg-primary-glow hover:text-white transition-premium text-sm">Nueva reserva</Link>
            <Link to="/reportes" className="h-11 px-5 rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/10 transition-premium text-sm inline-flex items-center gap-2">Ver reporte <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </section>

      {/* KPI strip */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <div key={k.label} style={{ animationDelay: `${i * 60}ms` }} className="premium-card p-5 animate-fade-up relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-xl"
              style={{ background: k.tone === "warning" ? "hsl(var(--warning))" : k.tone === "ocean" ? "hsl(var(--ocean))" : "hsl(var(--primary))" }} />
            <div className="relative flex items-center justify-between mb-4">
              <div className={cn(
                "h-9 w-9 rounded-lg grid place-items-center shadow-soft",
                k.tone === "warning" ? "bg-warning/10 text-warning" :
                k.tone === "ocean"   ? "bg-ocean/10 text-ocean" :
                "bg-primary/10 text-primary"
              )}>
                <k.icon className="h-4 w-4" strokeWidth={1.7} />
              </div>
              <span className={cn("inline-flex items-center gap-0.5 text-[11px] font-medium", k.up ? "text-success" : "text-warning")}>
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              </span>
            </div>
            <div className="relative">
              <p className="font-display text-2xl font-semibold text-navy leading-none">{k.value}</p>
              <p className="text-[12px] text-muted-foreground mt-1.5 leading-tight">{k.label}</p>
              <p className="text-[10px] text-muted-foreground/80 mt-0.5">{k.delta}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Revenue + Smart panel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 premium-card p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-[17px] font-semibold text-navy">Revenue estimado</h3>
              <p className="text-xs text-muted-foreground">Últimas 12 semanas</p>
            </div>
            <div className="flex gap-1 text-xs">
              {["7D","4W","12W","1Y"].map((p, i) => (
                <button key={p} className={cn("px-3 h-8 rounded-lg transition-colors", i === 2 ? "bg-navy text-white" : "text-muted-foreground hover:bg-secondary")}>{p}</button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-6 flex-wrap">
            <div>
              <p className="font-display text-4xl font-semibold text-navy leading-none">$284,920</p>
              <p className="text-sm text-success mt-2 inline-flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +12.4% vs periodo anterior</p>
            </div>
            <div className="flex gap-5 ml-auto">
              {[["Legend","$142K","primary"],["Coral I","$84K","ocean"],["Coral II","$58K","navy"]].map(([n,v,c]) => (
                <div key={n}>
                  <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: `hsl(var(--${c}))` }} />{n}
                  </p>
                  <p className="font-display font-semibold text-navy text-lg">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <Sparkline />
        </div>

        {/* Smart panel */}
        <div className="premium-card p-7 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-brand grid place-items-center shadow-glow"><Wand2 className="h-3.5 w-3.5 text-white" /></div>
              <div>
                <h3 className="font-display text-[15px] font-semibold text-navy leading-tight">Smart Insights</h3>
                <p className="text-[10px] uppercase tracking-wider text-primary">Powered by AI · mock</p>
              </div>
            </div>
          </div>
          <div className="relative space-y-3">
            {[
              { icon: TrendingUp, t: "Smart upsell", d: "Cliente Pérez podría tomar Balcony Suite por +$420.", tag: "+$420" },
              { icon: AlertTriangle, t: "Smart alert", d: "Solo 2 cabinas Coral II · 22 Abr.", tag: "URG" },
              { icon: Zap, t: "Seasonal push", d: "Mercado UK vende fuerte Jul–Ago. Activa campaña.", tag: "EU" },
            ].map(s => (
              <div key={s.t} className="group p-3 rounded-xl bg-secondary/50 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-white grid place-items-center text-primary shadow-soft">
                    <s.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-medium text-navy">{s.t}</p>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">{s.tag}</span>
                    </div>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes table + Holds */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 premium-card p-0 overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-4">
            <div>
              <h3 className="font-display text-[17px] font-semibold text-navy">Quotes recientes</h3>
              <p className="text-xs text-muted-foreground">Cotizaciones enviadas en los últimos 7 días</p>
            </div>
            <Link to="/reservas" className="text-xs text-primary hover:text-ocean inline-flex items-center gap-1 font-medium">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-y border-border/60 bg-secondary/30">
                  <th className="text-left font-medium px-6 py-2.5">Fecha</th>
                  <th className="text-left font-medium py-2.5">Cliente</th>
                  <th className="text-left font-medium py-2.5">Producto</th>
                  <th className="text-right font-medium py-2.5">Valor</th>
                  <th className="text-left font-medium py-2.5 pl-4">Estado</th>
                  <th className="px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {quotes.map(q => (
                  <tr key={q.client} className="hover:bg-secondary/40 transition-colors group">
                    <td className="px-6 py-3.5 text-muted-foreground">{q.date}</td>
                    <td className="py-3.5 font-medium text-navy">{q.client}</td>
                    <td className="py-3.5 text-navy/80">{q.product}</td>
                    <td className="py-3.5 text-right font-display font-semibold text-navy">{q.value}</td>
                    <td className="py-3.5 pl-4"><span className={cn("pill", q.pill)}>{q.status}</span></td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-navy">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border/40">
            {quotes.map(q => (
              <div key={q.client} className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-navy">{q.client}</p>
                  <span className={cn("pill", q.pill)}>{q.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{q.product}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{q.date}</span>
                  <span className="font-display font-semibold text-navy">{q.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Holds widget */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock4 className="h-4 w-4 text-warning" strokeWidth={1.7} />
              <h3 className="font-display text-[17px] font-semibold text-navy">Holds activos</h3>
            </div>
            <Link to="/holds" className="text-xs text-primary hover:text-ocean font-medium inline-flex items-center gap-1">Gestionar <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-3">
            {holds.map(h => (
              <div key={h.ref} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-accent transition-colors">
                <HoldRing days={h.exp} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-navy truncate">{h.ref} · {h.ship}</p>
                  <p className="text-[11px] text-muted-foreground">Salida {h.date} · {h.total}</p>
                </div>
                <span className={cn("pill",
                  h.exp <= 2 ? "bg-destructive/15 text-destructive" :
                  h.exp <= 4 ? "bg-warning/15 text-warning" :
                  "bg-success/15 text-success"
                )}>{h.exp <= 2 ? "Urgente" : h.exp <= 4 ? "Próx." : "OK"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confirmed bookings */}
      <section className="premium-card p-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="font-display text-[17px] font-semibold text-navy inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" /> Reservas confirmadas
            </h3>
            <p className="text-xs text-muted-foreground">Próximas salidas con balance pendiente</p>
          </div>
          <Link to="/confirmadas" className="text-xs text-primary hover:text-ocean font-medium inline-flex items-center gap-1">Ver todas <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-y border-border/60 bg-secondary/30">
                <th className="text-left font-medium px-6 py-2.5">GO Code</th>
                <th className="text-left font-medium py-2.5">Ref. agencia</th>
                <th className="text-left font-medium py-2.5">Barco</th>
                <th className="text-left font-medium py-2.5">Salida</th>
                <th className="text-right font-medium py-2.5">Total</th>
                <th className="text-left font-medium py-2.5 pl-6">Pago</th>
                <th className="text-right font-medium px-6 py-2.5">Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {confirmed.map(c => (
                <tr key={c.code} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-xs text-navy font-medium">{c.code}</td>
                  <td className="py-3.5 font-mono text-xs text-muted-foreground">{c.ref}</td>
                  <td className="py-3.5 text-navy">{c.ship}</td>
                  <td className="py-3.5 text-muted-foreground">{c.date}</td>
                  <td className="py-3.5 text-right font-display font-semibold text-navy">{c.total}</td>
                  <td className="py-3.5 pl-6">
                    <div className="flex items-center gap-2 max-w-[160px]">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className={cn("h-full rounded-full", c.paid === 100 ? "bg-success" : "gradient-brand")} style={{ width: `${c.paid}%` }} />
                      </div>
                      <span className="text-[11px] text-muted-foreground tabular-nums">{c.paid}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1 text-xs text-primary hover:text-ocean font-medium">
                      <FileText className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y divide-border/40">
          {confirmed.map(c => (
            <div key={c.code} className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-navy font-semibold">{c.code}</p>
                <span className="font-display font-semibold text-navy">{c.total}</span>
              </div>
              <p className="text-sm text-navy mt-1">{c.ship} · {c.date}</p>
              <p className="text-xs text-muted-foreground">Ref {c.ref}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className={cn("h-full rounded-full", c.paid === 100 ? "bg-success" : "gradient-brand")} style={{ width: `${c.paid}%` }} />
                </div>
                <span className="text-[11px] text-muted-foreground">{c.paid}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
