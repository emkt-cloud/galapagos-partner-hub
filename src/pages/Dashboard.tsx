import {
  ArrowUpRight, Users, Ship, Sparkles, Clock4, CheckCircle2, FileText,
  AlertTriangle, ChevronRight, Wand2, Wifi, Calendar, BedDouble, Tag, Image as ImageIcon, FolderOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import shipLegend from "@/assets/ship-legend.jpg";
import shipCoral1 from "@/assets/ship-coral1.jpg";
import shipCoral2 from "@/assets/ship-coral2.jpg";
import { getUserById } from "@/data/users";
import TierInfo from "@/components/TierInfo";

const shipImageMap: Record<string, string> = {
  "Galapagos Legend": shipLegend,
  "Legend": shipLegend,
  "Coral I": shipCoral1,
  "Coral II": shipCoral2,
};

// Quotes (Q-codes), Holds (Q-codes pre-confirmation), Confirmed (T-codes)
const quotes = [
  { code: "Q 129092", date: "Apr 16", client: "Maria Pérez",     product: "Legend · Itin A · 5n",  status: "Sent" },
  { code: "Q 129091", date: "Apr 15", client: "Robert Klein",    product: "Coral II · North · 4n", status: "Pending" },
  { code: "Q 129090", date: "Apr 15", client: "Sophie Laurent",  product: "Combo Quito + Coral I", status: "Reviewed" },
  { code: "Q 129088", date: "Apr 14", client: "Hiroshi Tanaka",  product: "Legend · Itin B · 4n",  status: "Sent" },
];

const holdsPreview = [
  { ref: "Q 129085", ship: "Galapagos Legend", date: "Apr 22", exp: 1 },
  { ref: "Q 129083", ship: "Coral II",         date: "Apr 26", exp: 3 },
  { ref: "Q 129080", ship: "Coral I",          date: "Apr 29", exp: 6 },
];

const confirmedPreview = [
  { code: "T-8934-2026", ship: "Galapagos Legend", date: "Apr 22", miles: 1240 },
  { code: "T-8932-2026", ship: "Coral I",          date: "Apr 24", miles: 980 },
  { code: "T-8929-2026", ship: "Coral II",         date: "Apr 26", miles: 760 },
];

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
  const userId = typeof window !== "undefined" ? sessionStorage.getItem("portal:userId") : null;
  const user = getUserById(userId);

  // Active Bookings counts
  const counts = { quotes: quotes.length, holds: holdsPreview.length, confirmed: confirmedPreview.length };

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl text-white p-7 lg:p-9 shadow-navy min-h-[230px]">
        <img src={dashboardHero} alt="" width={1920} height={720} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-[90px]" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary-glow mb-3 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-primary-glow" /> Partner Portal · April 2026
            </p>
            <h2 className="font-display text-3xl lg:text-[40px] font-light leading-[1.1] max-w-2xl tracking-tight">
              Welcome, <span className="font-semibold text-primary-glow">{user.name.split(" ")[0]}</span>
            </h2>
            <div className="mt-3 flex items-center gap-3 text-sm text-white/75">
              <span>{user.company}</span>
              <span className="opacity-50">·</span>
              <TierInfo user={user} className="bg-white/10 text-white hover:bg-white/15" />
              <span className="opacity-50 hidden sm:inline">·</span>
              <span className="hidden sm:inline">Commission <span className="text-white font-semibold">{user.commission}%</span></span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link to="/reservas" className="h-11 px-5 rounded-xl bg-white text-navy font-medium hover:bg-primary-glow hover:text-white transition-premium text-sm">Book a Cruise</Link>
            <Link to="/recursos" className="h-11 px-5 rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/10 transition-premium text-sm inline-flex items-center gap-2">Resources <ChevronRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </section>

      {/* Active Bookings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-navy">Active Bookings</h3>
            <p className="text-xs text-muted-foreground">Live overview of your pipeline</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Quotes",            value: counts.quotes,    icon: FileText,     tone: "primary",  to: "/reservas",    desc: "Sent in the last 7 days" },
            { label: "Holds",             value: counts.holds,     icon: Clock4,       tone: "warning",  to: "/holds",       desc: "Awaiting confirmation" },
            { label: "Confirmed bookings",value: counts.confirmed, icon: CheckCircle2, tone: "success",  to: "/confirmadas", desc: "Upcoming departures" },
          ].map((k, i) => (
            <Link key={k.label} to={k.to} style={{ animationDelay: `${i*60}ms` }} className="premium-card p-6 animate-fade-up relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-xl"
                style={{ background: k.tone === "warning" ? "hsl(var(--warning))" : k.tone === "success" ? "hsl(var(--success))" : "hsl(var(--primary))" }} />
              <div className="relative flex items-center justify-between mb-4">
                <div className={cn(
                  "h-10 w-10 rounded-xl grid place-items-center shadow-soft",
                  k.tone === "warning" ? "bg-warning/10 text-warning" :
                  k.tone === "success" ? "bg-success/10 text-success" :
                  "bg-primary/10 text-primary"
                )}>
                  <k.icon className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="font-display text-4xl font-semibold text-navy leading-none">{k.value}</p>
              <p className="text-sm text-navy/80 mt-2 font-medium">{k.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{k.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick navigation tiles (Dashboard / Book Now / Gallery / Resources) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: "/reservas",         label: "Book a Cruise",  icon: Ship },
          { to: "/recursos/gallery", label: "Gallery",        icon: ImageIcon },
          { to: "/tarifas",          label: "Rates",          icon: Tag },
          { to: "/recursos",         label: "Resources",      icon: FolderOpen },
        ].map(t => (
          <Link key={t.to} to={t.to} className="premium-card p-4 flex items-center gap-3 hover:shadow-elegant transition-premium group">
            <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center text-ocean group-hover:gradient-brand group-hover:text-white transition-all">
              <t.icon className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <p className="text-sm font-medium text-navy">{t.label}</p>
          </Link>
        ))}
      </section>

      {/* Special Discounts + Smart Alert + Seasonal Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Special Discounts */}
        <div className="premium-card p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
          <div className="relative flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg gradient-brand grid place-items-center shadow-glow"><Sparkles className="h-3.5 w-3.5 text-white" /></div>
            <h3 className="font-display text-[15px] font-semibold text-navy">Special Discounts</h3>
          </div>
          <div className="relative space-y-3">
            {[
              { icon: Wifi,      t: "Free WiFi onboard",                       d: "Complimentary on all 2026 departures.", tag: "FREE" },
              { icon: Calendar,  t: "Early Bird 2027",                          d: "Book before Sep 30 and save 15%.",      tag: "−15%" },
              { icon: BedDouble, t: "3 Complimentary Nights at GO Quito Hotel", d: "With any 8D Galapagos cruise.",         tag: "+3N" },
            ].map(s => (
              <div key={s.t} className="group p-3 rounded-xl bg-secondary/50 hover:bg-accent transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-white grid place-items-center text-primary shadow-soft">
                    <s.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-medium text-navy leading-tight">{s.t}</p>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">{s.tag}</span>
                    </div>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Alert */}
        <div className="premium-card p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-warning/15 blur-2xl" />
          <div className="relative flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-warning/15 text-warning grid place-items-center"><AlertTriangle className="h-3.5 w-3.5" /></div>
            <h3 className="font-display text-[15px] font-semibold text-navy">Smart Alert</h3>
          </div>
          <div className="relative space-y-3">
            <div className="p-3 rounded-xl bg-warning/5 border border-warning/20">
              <p className="text-[13px] font-medium text-navy">Only 2 cabins left</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">Coral II · Apr 22 departure. Confirm holds before they expire.</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <p className="text-[13px] font-medium text-navy">Q 129085 expires today</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">Maria Pérez · Galapagos Legend · 5n</p>
            </div>
            <Link to="/holds" className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:gap-2 transition-all">
              Review holds <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Seasonal Insights */}
        <div className="premium-card p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-ocean/15 blur-2xl" />
          <div className="relative flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-ocean/15 text-ocean grid place-items-center"><Wand2 className="h-3.5 w-3.5" /></div>
            <h3 className="font-display text-[15px] font-semibold text-navy">Seasonal Insights</h3>
          </div>
          <div className="relative space-y-3">
            {[
              { t: "May is high season for Galapagos", d: "Expect 80%+ occupancy. Lock holds early." },
              { t: "Strong demand expected for summer", d: "Jun–Aug departures fill 4–6 weeks ahead." },
              { t: "UK & EU peak Jul–Aug",              d: "Activate campaigns to capture early bookers." },
            ].map(s => (
              <div key={s.t} className="p-3 rounded-xl bg-secondary/50">
                <p className="text-[13px] font-medium text-navy leading-tight">{s.t}</p>
                <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">{s.d}</p>
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
              <h3 className="font-display text-[17px] font-semibold text-navy">Recent quotes</h3>
              <p className="text-xs text-muted-foreground">Quotes sent in the last 7 days</p>
            </div>
            <Link to="/reservas" className="text-xs text-primary hover:text-ocean inline-flex items-center gap-1 font-medium">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-y border-border/60 bg-secondary/30">
                  <th className="text-left font-medium px-6 py-2.5">Quote</th>
                  <th className="text-left font-medium py-2.5">Date</th>
                  <th className="text-left font-medium py-2.5">Client</th>
                  <th className="text-left font-medium py-2.5">Product</th>
                  <th className="text-left font-medium py-2.5 pl-4 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {quotes.map(q => (
                  <tr key={q.code} className="hover:bg-secondary/40 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[12px] font-medium text-navy">{q.code}</td>
                    <td className="py-3.5 text-muted-foreground">{q.date}</td>
                    <td className="py-3.5 font-medium text-navy">{q.client}</td>
                    <td className="py-3.5 text-navy/80">{q.product}</td>
                    <td className="py-3.5 pl-4 pr-6"><span className="pill bg-primary/15 text-primary">{q.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-border/40">
            {quotes.map(q => (
              <div key={q.code} className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-mono text-[12px] text-navy font-medium">{q.code}</p>
                  <span className="pill bg-primary/15 text-primary">{q.status}</span>
                </div>
                <p className="font-medium text-navy">{q.client}</p>
                <p className="text-xs text-muted-foreground">{q.product} · {q.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock4 className="h-4 w-4 text-warning" strokeWidth={1.7} />
              <h3 className="font-display text-[17px] font-semibold text-navy">Active holds</h3>
            </div>
            <Link to="/holds" className="text-xs text-primary hover:text-ocean font-medium inline-flex items-center gap-1">Manage <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-3">
            {holdsPreview.map(h => (
              <div key={h.ref} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/50 hover:bg-accent transition-colors">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                  <img src={shipImageMap[h.ship] || shipLegend} alt="" loading="lazy" width={96} height={96} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <HoldRing days={h.exp} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-mono font-medium text-navy truncate">{h.ref}</p>
                  <p className="text-[11px] text-muted-foreground">{h.ship} · {h.date}</p>
                </div>
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
              <CheckCircle2 className="h-4 w-4 text-success" /> Confirmed bookings
            </h3>
            <p className="text-xs text-muted-foreground">Most recent confirmations · earning miles</p>
          </div>
          <Link to="/confirmadas" className="text-xs text-primary hover:text-ocean font-medium inline-flex items-center gap-1">View all <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-y border-border/60 bg-secondary/30">
                <th className="text-left font-medium px-6 py-2.5">Booking Code</th>
                <th className="text-left font-medium py-2.5">Ship</th>
                <th className="text-left font-medium py-2.5">Departure</th>
                <th className="text-left font-medium py-2.5 pl-4">Status</th>
                <th className="text-right font-medium px-6 py-2.5">Miles earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {confirmedPreview.map(b => (
                <tr key={b.code} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-[12px] font-medium text-navy">{b.code}</td>
                  <td className="py-3.5 text-navy/80">{b.ship}</td>
                  <td className="py-3.5 text-muted-foreground">{b.date}</td>
                  <td className="py-3.5 pl-4"><span className="pill bg-success/15 text-success">Confirmed</span></td>
                  <td className="px-6 py-3.5 text-right font-display font-semibold text-primary inline-flex items-center justify-end gap-1.5 w-full">
                    <Sparkles className="h-3.5 w-3.5" /> {b.miles.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y divide-border/40">
          {confirmedPreview.map(b => (
            <div key={b.code} className="p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="font-mono text-[12px] text-navy font-medium">{b.code}</p>
                <span className="pill bg-success/15 text-success">Confirmed</span>
              </div>
              <p className="text-sm text-navy">{b.ship} · {b.date}</p>
              <p className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> {b.miles.toLocaleString()} miles earned
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
