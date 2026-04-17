import { TrendingUp, DollarSign, Users, Anchor, Download, Calendar } from "lucide-react";

const kpis = [
  { label: "Revenue YTD",     value: "$284K", delta: "+24%", icon: DollarSign, accent: "text-success" },
  { label: "Bookings YTD",    value: "127",   delta: "+18%", icon: Anchor,     accent: "text-primary" },
  { label: "Pax YTD",         value: "342",   delta: "+22%", icon: Users,      accent: "text-ocean" },
  { label: "Avg ticket",      value: "$2,236", delta: "+5%", icon: TrendingUp, accent: "text-warning" },
];

const months = [
  { m: "Jan", v: 38, r: 28000 },
  { m: "Feb", v: 52, r: 41000 },
  { m: "Mar", v: 68, r: 58000 },
  { m: "Apr", v: 84, r: 72000 },
  { m: "May", v: 71, r: 64000 },
  { m: "Jun", v: 92, r: 89000 },
  { m: "Jul", v: 95, r: 94000 },
];
const max = Math.max(...months.map(m => m.v));

const ships = [
  { name: "Galapagos Legend", pct: 52, count: 66 },
  { name: "Coral I",          pct: 28, count: 36 },
  { name: "Coral II",         pct: 20, count: 25 },
];

const top = [
  { agent: "Camila Vega",    bookings: 42, revenue: "$94K" },
  { agent: "Andrés Pinto",   bookings: 31, revenue: "$72K" },
  { agent: "María Salazar",  bookings: 28, revenue: "$61K" },
  { agent: "Diego Ruiz",     bookings: 26, revenue: "$54K" },
];

const Reportes = () => (
  <div className="space-y-6 max-w-[1400px]">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Reports</h1>
        <p className="text-sm text-muted-foreground">Performance insights · Jan – Jul 2025</p>
      </div>
      <div className="flex gap-2">
        <button className="h-10 px-4 rounded-xl bg-card border border-border text-sm text-navy inline-flex items-center gap-2 hover:border-primary/40 transition-colors">
          <Calendar className="h-3.5 w-3.5" /> This year
        </button>
        <button className="h-10 px-4 rounded-xl bg-navy text-white text-sm font-medium inline-flex items-center gap-2 hover:gradient-brand hover:shadow-glow transition-premium">
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      </div>
    </div>

    {/* KPIs */}
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map(k => (
        <div key={k.label} className="premium-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center">
              <k.icon className={`h-4 w-4 ${k.accent}`} />
            </div>
            <span className={`text-xs font-semibold ${k.accent}`}>{k.delta}</span>
          </div>
          <p className="text-xs text-muted-foreground">{k.label}</p>
          <p className="font-display text-3xl font-semibold text-navy mt-1">{k.value}</p>
        </div>
      ))}
    </section>

    {/* Bar chart */}
    <section className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-navy">Bookings by month</h3>
          <p className="text-xs text-muted-foreground">Volume + revenue</p>
        </div>
      </div>
      <div className="flex items-end gap-3 h-56">
        {months.map(m => (
          <div key={m.m} className="flex-1 flex flex-col items-center gap-2 group">
            <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">${(m.r/1000).toFixed(0)}K</span>
            <div className="w-full rounded-t-lg gradient-brand relative overflow-hidden hover:shadow-glow transition-all" style={{ height: `${(m.v/max)*100}%` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
            </div>
            <span className="text-xs text-muted-foreground">{m.m}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Mix by ship */}
      <div className="premium-card p-6">
        <h3 className="font-display text-lg font-semibold text-navy mb-5">Mix by ship</h3>
        <div className="space-y-4">
          {ships.map(s => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="text-navy font-medium">{s.name}</span>
                <span className="text-muted-foreground"><span className="font-display font-semibold text-navy">{s.count}</span> · {s.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full gradient-brand rounded-full transition-all duration-700" style={{ width: `${s.pct*1.7}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top agents */}
      <div className="premium-card p-6">
        <h3 className="font-display text-lg font-semibold text-navy mb-5">Top performers</h3>
        <div className="divide-y divide-border">
          {top.map((t, i) => (
            <div key={t.agent} className="py-3 flex items-center gap-4">
              <span className="font-display text-lg font-semibold text-primary w-6">{i+1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy">{t.agent}</p>
                <p className="text-xs text-muted-foreground">{t.bookings} bookings</p>
              </div>
              <span className="font-display font-semibold text-navy">{t.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Reportes;
