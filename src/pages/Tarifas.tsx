import { Tag, TrendingDown, Calendar, Download, Sparkles } from "lucide-react";

const seasons = [
  { name: "Low",  months: "May · Sep · Nov",          factor: "0.85x" },
  { name: "Mid",  months: "Mar · Apr · Oct",          factor: "1.00x" },
  { name: "High", months: "Jun · Jul · Aug · Dec",    factor: "1.20x" },
];

const rates = [
  { ship: "Galapagos Legend", cabin: "Standard Plus",  itinA: 3890, itinB: 2490, itinC: 1990 },
  { ship: "Galapagos Legend", cabin: "Junior Suite",   itinA: 4690, itinB: 2990, itinC: 2390 },
  { ship: "Galapagos Legend", cabin: "Balcony Suite",  itinA: 5490, itinB: 3490, itinC: 2790 },
  { ship: "Coral I",          cabin: "Standard",       itinA: 3490, itinB: 2290, itinC: 1790 },
  { ship: "Coral I",          cabin: "Suite",          itinA: 4290, itinB: 2790, itinC: 2190 },
  { ship: "Coral II",         cabin: "Standard",       itinA: 3490, itinB: 2290, itinC: 1790 },
  { ship: "Coral II",         cabin: "Suite",          itinA: 4290, itinB: 2790, itinC: 2190 },
];

const promos = [
  { tag: "−15%", title: "Early Booking 2026",       desc: "Book before Aug 31, sail any 2026 departure",    until: "Aug 31, 2026" },
  { tag: "2x1",  title: "Bring a friend · Coral I", desc: "Second pax 50% off in select departures",         until: "Jun 30, 2026" },
  { tag: "+1",   title: "Free pre-night Quito",     desc: "Complimentary night at GO Quito with any cruise", until: "Dec 31, 2026" },
  { tag: "−10%", title: "Repeater discount",        desc: "Past guests get 10% off their next Galápagos cruise", until: "Open" },
  { tag: "FREE", title: "Single supplement waived", desc: "Solo travelers · select Coral II departures",     until: "Sep 30, 2026" },
  { tag: "GIFT", title: "Karanki experience",       desc: "Free upgrade to cultural lodge for honeymooners", until: "Dec 31, 2026" },
];

const tariffPdfs = [
  { label: "Gross Rates 2026",      file: "/docs/legend-brochure-en.pdf", year: "2026" },
  { label: "Gross Rates 2027",      file: "/docs/legend-brochure-en.pdf", year: "2027" },
  { label: "Net Rates 2026",        file: "/docs/legend-brochure-en.pdf", year: "2026" },
  { label: "Net Rates 2027",        file: "/docs/legend-brochure-en.pdf", year: "2027" },
];

const Tarifas = () => (
  <div className="space-y-8 max-w-[1400px]">
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Rates & Promotions</h1>
        <p className="text-sm text-muted-foreground mt-1">2026 partner gross rates · USD per pax · double occupancy</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tariffPdfs.map(p => (
          <a
            key={p.label}
            href={p.file}
            download
            className="h-10 px-3.5 rounded-xl bg-secondary text-navy text-xs font-medium inline-flex items-center gap-2 hover:gradient-brand hover:text-white hover:shadow-glow transition-premium"
          >
            <Download className="h-3.5 w-3.5" /> {p.label}
          </a>
        ))}
      </div>
    </div>

    {/* Seasons */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {seasons.map(s => (
        <div key={s.name} className="premium-card p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-accent grid place-items-center text-ocean">
            <Calendar className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="font-display font-semibold text-navy">{s.name} season</p>
            <p className="text-xs text-muted-foreground">{s.months}</p>
          </div>
          <span className="font-display text-xl font-semibold text-primary">{s.factor}</span>
        </div>
      ))}
    </section>

    {/* Rates table */}
    <section className="premium-card overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-navy">Gross rates · Mid season</h3>
          <p className="text-xs text-muted-foreground">Apply seasonal factor to the base value</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <Tag className="h-3.5 w-3.5" /> Updated Apr 2025
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Ship</th>
              <th className="px-5 py-3 font-medium">Cabin</th>
              <th className="px-5 py-3 font-medium text-right">Itin A · 8d</th>
              <th className="px-5 py-3 font-medium text-right">Itin B · 5d</th>
              <th className="px-5 py-3 font-medium text-right">Itin C · 4d</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rates.map((r, i) => (
              <tr key={i} className="hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3.5 font-medium text-navy">{r.ship}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{r.cabin}</td>
                <td className="px-5 py-3.5 text-right font-display font-semibold text-navy">${r.itinA.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-right font-display font-semibold text-navy">${r.itinB.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-right font-display font-semibold text-navy">${r.itinC.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* Promotions */}
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-2xl font-semibold text-navy inline-flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" /> Active promotions
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {promos.map(p => (
          <div key={p.title} className="premium-card p-6 group relative overflow-hidden">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center text-white shadow-glow">
                  <TrendingDown className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{p.tag}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-navy mt-4">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <p className="text-xs text-muted-foreground mt-4 inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Valid until {p.until}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Tarifas;
