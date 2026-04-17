import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Ship, Sparkles, AlertCircle, Calendar } from "lucide-react";

const kpis = [
  { label: "Reservas activas",   value: "182", delta: "+12.4%", up: true,  icon: Users,    accent: "from-primary/20 to-primary/0" },
  { label: "Ventas del mes",     value: "$284K", delta: "+8.2%", up: true,  icon: TrendingUp, accent: "from-ocean/20 to-ocean/0" },
  { label: "Próximas salidas",   value: "14",  delta: "esta semana", up: true, icon: Ship, accent: "from-primary-glow/30 to-primary/0" },
  { label: "Cabinas disponibles",value: "37",  delta: "-6 vs ayer", up: false, icon: Calendar, accent: "from-warning/20 to-transparent" },
];

const upcoming = [
  { ship: "Galapagos Legend", route: "Itinerario A · 5 noches", date: "22 Abr", occ: 92 },
  { ship: "Coral I",          route: "Itinerario Sur · 4 noches", date: "24 Abr", occ: 76 },
  { ship: "Coral II",         route: "Itinerario Norte · 4 noches", date: "26 Abr", occ: 64 },
  { ship: "Galapagos Legend", route: "Itinerario B · 4 noches", date: "29 Abr", occ: 48 },
];

const promos = [
  { title: "Early Booking 2025", desc: "15% off + cabina upgrade", tag: "Activa" },
  { title: "Familias",           desc: "Niño gratis en cabina compartida", tag: "Nueva" },
  { title: "Honeymoon",          desc: "Cena privada + champagne", tag: "Activa" },
];

const Sparkline = () => (
  <svg viewBox="0 0 200 60" className="w-full h-16">
    <defs>
      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,45 L20,40 L40,42 L60,30 L80,35 L100,22 L120,28 L140,18 L160,24 L180,12 L200,16 L200,60 L0,60 Z" fill="url(#g1)" />
    <path d="M0,45 L20,40 L40,42 L60,30 L80,35 L100,22 L120,28 L140,18 L160,24 L180,12 L200,16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Hero card */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-10 shadow-navy">
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[80px]" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-glow mb-3">Resumen Comercial · Abril</p>
            <h2 className="font-display text-4xl lg:text-5xl font-light leading-tight max-w-xl">
              Vas <span className="font-semibold text-primary-glow">8.2%</span> por encima del objetivo mensual.
            </h2>
            <p className="text-white/70 mt-4 max-w-md">Tu mejor mes del trimestre. Mantén el ritmo con las salidas de mayo.</p>
          </div>
          <div className="flex gap-3">
            <button className="h-12 px-6 rounded-xl bg-white text-navy font-medium hover:bg-primary-glow hover:text-white transition-premium">Ver reporte</button>
            <button className="h-12 px-6 rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/10 transition-premium">Nueva reserva</button>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k, i) => (
          <div key={k.label} style={{ animationDelay: `${i * 80}ms` }} className="premium-card p-6 animate-fade-up relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${k.accent}`} />
            <div className="relative flex items-start justify-between mb-6">
              <div className="h-10 w-10 rounded-lg bg-white grid place-items-center text-ocean shadow-soft">
                <k.icon className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium ${k.up ? "text-success" : "text-destructive"}`}>
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </span>
            </div>
            <div className="relative">
              <p className="text-3xl font-display font-semibold text-navy">{k.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{k.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Charts row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy">Revenue estimado</h3>
              <p className="text-xs text-muted-foreground">Últimas 12 semanas</p>
            </div>
            <div className="flex gap-1 text-xs">
              {["7D","4W","12W","1Y"].map((p, i) => (
                <button key={p} className={`px-3 py-1.5 rounded-lg transition-colors ${i === 2 ? "bg-navy text-white" : "text-muted-foreground hover:bg-secondary"}`}>{p}</button>
              ))}
            </div>
          </div>
          <p className="font-display text-4xl font-semibold text-navy">$284,920</p>
          <p className="text-sm text-success mt-1 inline-flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +12.4% vs periodo anterior</p>
          <Sparkline />
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60 mt-2">
            {[["Legend","$142K"],["Coral I","$84K"],["Coral II","$58K"]].map(([n,v]) => (
              <div key={n}>
                <p className="text-xs text-muted-foreground">{n}</p>
                <p className="font-display font-semibold text-navy">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
          <div className="relative flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy">Millas</h3>
              <p className="text-xs text-muted-foreground">Nivel Platinum</p>
            </div>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="relative font-display text-4xl font-semibold text-gradient-brand">48,250</p>
          <p className="relative text-xs text-muted-foreground mt-1">millas acumuladas</p>
          <div className="relative mt-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">Hacia Diamond</span>
              <span className="text-navy font-medium">76%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full gradient-brand rounded-full relative" style={{ width: "76%" }}>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,white/40,transparent)] animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Faltan 11,750 millas para tu próximo nivel.</p>
          </div>
        </div>
      </section>

      {/* Lower row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold text-navy">Próximas salidas</h3>
            <button className="text-xs text-primary hover:text-ocean inline-flex items-center gap-1">Ver todas <ArrowUpRight className="h-3 w-3" /></button>
          </div>
          <div className="divide-y divide-border/60">
            {upcoming.map(u => (
              <div key={u.ship + u.date} className="py-4 flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-accent grid place-items-center text-ocean group-hover:gradient-brand group-hover:text-white transition-all">
                  <Ship className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy">{u.ship}</p>
                  <p className="text-xs text-muted-foreground">{u.route}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-navy">{u.date}</p>
                  <p className="text-xs text-muted-foreground">2025</p>
                </div>
                <div className="w-32">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Ocupación</span>
                    <span className="font-medium text-navy">{u.occ}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className={`h-full rounded-full ${u.occ > 85 ? "bg-destructive" : u.occ > 70 ? "bg-warning" : "gradient-brand"}`} style={{ width: `${u.occ}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="premium-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4 text-warning" />
              <h3 className="font-display font-semibold text-navy">Alertas</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                <p className="text-navy/80"><span className="font-medium text-navy">Legend · 22 Abr</span> — Solo 2 cabinas Suite</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning shrink-0" />
                <p className="text-navy/80"><span className="font-medium text-navy">Coral I · 24 Abr</span> — 4 plazas Junior</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-navy/80"><span className="font-medium text-navy">Tarifa MAR2025</span> vence en 7 días</p>
              </li>
            </ul>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-display font-semibold text-navy mb-4">Promociones activas</h3>
            <div className="space-y-3">
              {promos.map(p => (
                <div key={p.title} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-accent transition-colors">
                  <div>
                    <p className="text-sm font-medium text-navy">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">{p.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
