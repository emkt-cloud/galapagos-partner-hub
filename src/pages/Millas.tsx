import { Sparkles, Trophy, Gift, TrendingUp, Crown, Award } from "lucide-react";

const tiers = [
  { name: "Silver",   from: 0,     icon: Award,  color: "text-muted-foreground" },
  { name: "Gold",     from: 15000, icon: Award,  color: "text-warning" },
  { name: "Platinum", from: 35000, icon: Trophy, color: "text-primary" },
  { name: "Diamond",  from: 60000, icon: Crown,  color: "text-ocean" },
];

const history = [
  { date: "12 Abr 2025", desc: "Reserva Legend · 5n",    pts: "+2,400" },
  { date: "08 Abr 2025", desc: "Bono Early Booking",     pts: "+800" },
  { date: "02 Abr 2025", desc: "Reserva Coral II · 4n",  pts: "+1,650" },
  { date: "28 Mar 2025", desc: "Combinado Quito + Crucero", pts: "+3,200" },
  { date: "20 Mar 2025", desc: "Reserva Coral I · 4n",   pts: "+1,800" },
];

const bonuses = [
  { title: "Doble millas Coral II",   desc: "Hasta 30 abr en todas las salidas Coral II", tag: "x2" },
  { title: "Bonus combinado",         desc: "+1,000 millas por crucero + GO Quito Hotel", tag: "+1K" },
  { title: "Ascenso anticipado",      desc: "Llega a Diamond y mantén el nivel 12 meses", tag: "VIP" },
];

const Millas = () => {
  const current = 48250;
  const nextTier = tiers[3];
  const progress = (current / nextTier.from) * 100;

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Hero loyalty */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-12 shadow-navy">
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-primary-glow/20 blur-[60px] animate-float" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-5">
              <Trophy className="h-3.5 w-3.5 text-primary-glow" />
              <span className="text-xs uppercase tracking-wider">Nivel Platinum</span>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-glow mb-3">Tus millas</p>
            <h1 className="font-display text-6xl lg:text-7xl font-light leading-none">
              <span className="font-semibold">48,250</span>
            </h1>
            <p className="text-white/70 mt-3">Acumuladas en los últimos 12 meses</p>

            <div className="mt-8 max-w-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/70">Hacia Diamond</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full gradient-brand rounded-full relative" style={{ width: `${progress}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Faltan <span className="text-primary-glow font-medium">11,750 millas</span> para alcanzar Diamond.</p>
            </div>
          </div>

          {/* Tier ladder */}
          <div className="grid grid-cols-2 gap-3">
            {tiers.map((t, i) => {
              const active = i === 2;
              return (
                <div key={t.name} className={`relative rounded-2xl p-5 border transition-all ${active ? "border-primary bg-white/10 backdrop-blur-md shadow-glow" : "border-white/10 bg-white/5"}`}>
                  <t.icon className={`h-6 w-6 mb-3 ${active ? "text-primary-glow" : "text-white/50"}`} strokeWidth={1.4} />
                  <p className={`font-display font-semibold ${active ? "text-white" : "text-white/70"}`}>{t.name}</p>
                  <p className="text-xs text-white/50">desde {t.from.toLocaleString()}</p>
                  {active && <span className="absolute top-3 right-3 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary text-white font-bold">Actual</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bonuses & History */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-5">
          <h3 className="font-display text-lg font-semibold text-navy">Bonos vigentes</h3>
          {bonuses.map(b => (
            <div key={b.title} className="premium-card p-5 group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl gradient-brand grid place-items-center text-white shadow-glow">
                  <Gift className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-navy">{b.title}</p>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{b.tag}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy">Historial</h3>
              <p className="text-xs text-muted-foreground">Últimos movimientos</p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-success">
              <TrendingUp className="h-3.5 w-3.5" /> +9,850 este mes
            </div>
          </div>
          <div className="divide-y divide-border/60">
            {history.map((h, i) => (
              <div key={i} className="py-3.5 flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-accent grid place-items-center text-ocean">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy">{h.desc}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <span className="font-display font-semibold text-primary">{h.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Millas;
