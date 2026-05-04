import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, FileText, Filter, Search, Sparkles, Printer, CreditCard, Users, Calendar, Ship, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Booking = {
  code: string;            // T-8934-2026
  partner: string;
  contact: string;
  contactEmail: string;
  contactPhone: string;
  client: string;
  pax: number;
  ship: string;
  departure: string;
  miles: number;
  notes?: string;
};

const bookings: Booking[] = [
  { code: "T-8934-2026", partner: "Andes Travel", contact: "Camila Rivera", contactEmail: "camila@andestravel.com", contactPhone: "+593 99 123 4567", client: "Maria Pérez",     pax: 2, ship: "Galapagos Legend", departure: "Apr 22, 2026", miles: 1240 },
  { code: "T-8932-2026", partner: "Andes Travel", contact: "Camila Rivera", contactEmail: "camila@andestravel.com", contactPhone: "+593 99 123 4567", client: "Robert Klein",    pax: 2, ship: "Coral I",          departure: "Apr 24, 2026", miles: 980 },
  { code: "T-8929-2026", partner: "Andes Travel", contact: "Camila Rivera", contactEmail: "camila@andestravel.com", contactPhone: "+593 99 123 4567", client: "Sophie Laurent",  pax: 4, ship: "Coral II",         departure: "Apr 26, 2026", miles: 1620 },
  { code: "T-8925-2026", partner: "Andes Travel", contact: "Camila Rivera", contactEmail: "camila@andestravel.com", contactPhone: "+593 99 123 4567", client: "Hiroshi Tanaka",  pax: 2, ship: "Galapagos Legend", departure: "Apr 29, 2026", miles: 1040 },
  { code: "T-8920-2026", partner: "Andes Travel", contact: "Camila Rivera", contactEmail: "camila@andestravel.com", contactPhone: "+593 99 123 4567", client: "Anna Lindqvist",  pax: 3, ship: "Coral II",         departure: "May 2, 2026",  miles: 1380 },
  { code: "T-8916-2026", partner: "Andes Travel", contact: "Camila Rivera", contactEmail: "camila@andestravel.com", contactPhone: "+593 99 123 4567", client: "James Whitaker",  pax: 2, ship: "Coral I",          departure: "May 5, 2026",  miles: 980 },
];

// === Detail view ===
const BookingDetail = ({ b }: { b: Booking }) => {
  const passengers = Array.from({ length: b.pax }).map((_, i) => ({
    name: i === 0 ? b.client : `${b.client.split(" ")[0]} · Pax ${i + 1}`,
    passport: `EC-${(900000 + i * 137).toString()}`,
    dob: "1985-04-12",
  }));

  return (
    <div className="space-y-6 max-w-[1200px]">
      <Link to="/confirmadas" className="text-xs text-primary hover:text-ocean inline-flex items-center gap-1">← Back to confirmed</Link>

      <section className="premium-card p-6 lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-success mb-2">Booking Details · Confirmed</p>
            <h2 className="font-display text-2xl font-semibold text-navy">{b.code}</h2>
            <p className="text-sm text-muted-foreground mt-1">{b.client} · {b.pax} pax · {b.ship}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-medium inline-flex items-center gap-2 shadow-glow">
              <CreditCard className="h-4 w-4" /> Confirmation & Payment
            </button>
            <button className="h-10 px-4 rounded-xl bg-card border border-border text-navy text-sm font-medium hover:border-primary/40 inline-flex items-center gap-2">
              <Printer className="h-4 w-4" /> Print
            </button>
            <button className="h-10 px-4 rounded-xl bg-card border border-border text-navy text-sm font-medium hover:border-primary/40 inline-flex items-center gap-2">
              <FileText className="h-4 w-4" /> Voucher PDF
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 premium-card p-6 space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Partner</p>
            <p className="font-medium text-navy">{b.partner}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Contact</p>
            <p className="font-medium text-navy">{b.contact}</p>
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Mail className="h-3 w-3" /> {b.contactEmail}</p>
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Phone className="h-3 w-3" /> {b.contactPhone}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Pax</p>
              <p className="font-display text-xl font-semibold text-navy inline-flex items-center gap-2"><Users className="h-4 w-4 text-ocean" /> {b.pax}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Departure</p>
              <p className="font-display text-xl font-semibold text-navy inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-ocean" /> {b.departure}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Services</p>
            <ul className="space-y-2">
              {[
                { icon: Ship, t: "Galapagos cruise", d: `${b.ship} · 5n · Itinerary A` },
                { icon: Calendar, t: "Pre-cruise night", d: "GO Quito Hotel · Junior Suite" },
                { icon: Users, t: "Naturalist guide", d: "Bilingual · Lvl. III" },
              ].map(s => (
                <li key={s.t} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className="h-9 w-9 rounded-lg bg-white grid place-items-center text-primary shadow-soft"><s.icon className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-navy">{s.t}</p>
                    <p className="text-[11.5px] text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Itinerary</p>
            <ol className="text-sm text-navy/85 space-y-1.5 pl-5 list-decimal">
              <li>Day 1 · Quito arrival & welcome dinner</li>
              <li>Day 2 · Flight UIO–GPS · Embarkation</li>
              <li>Day 3 · Bartolomé & Sullivan Bay</li>
              <li>Day 4 · Santa Cruz · Charles Darwin Station</li>
              <li>Day 5 · Floreana · Punta Cormorant</li>
              <li>Day 6 · Disembarkation · UIO transfer</li>
            </ol>
          </div>
          {b.notes && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Observations</p>
              <p className="text-sm text-navy/80">{b.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="premium-card p-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
            <p className="text-[10px] uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Miles earned</p>
            <p className="font-display text-4xl font-semibold text-navy">{b.miles.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Credited upon final payment</p>
          </div>

          <div className="premium-card p-6">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Passengers ({passengers.length})</p>
            <ul className="space-y-2">
              {passengers.map(p => (
                <li key={p.passport} className="p-3 rounded-xl bg-secondary/50">
                  <p className="text-sm font-medium text-navy">{p.name}</p>
                  <p className="text-[11.5px] text-muted-foreground">Passport {p.passport} · DOB {p.dob}</p>
                  <button className="mt-1 text-[11px] text-primary font-medium">View detail →</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const Confirmadas = () => {
  const { code } = useParams<{ code: string }>();
  const [ship, setShip] = useState("All");

  if (code) {
    const b = bookings.find(x => x.code === code) ?? bookings[0];
    return <BookingDetail b={b} />;
  }

  const filtered = ship === "All" ? bookings : bookings.filter(b => b.ship === ship);
  const totalMiles = bookings.reduce((a, b) => a + b.miles, 0);

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Stats — no monetary values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { l: "Confirmed bookings", v: bookings.length.toString(),       d: "Next 60 days" },
          { l: "Total pax",          v: bookings.reduce((a,b)=>a+b.pax,0).toString(), d: "Across all bookings" },
          { l: "Miles generated",    v: totalMiles.toLocaleString(),      d: "Credited to your tier" },
        ].map((k, i) => (
          <div key={k.l} style={{ animationDelay: `${i*60}ms` }} className="premium-card p-5 animate-fade-up">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{k.l}</p>
            <p className="font-display text-3xl font-semibold text-navy mt-1.5 leading-none">{k.v}</p>
            <p className="text-xs text-muted-foreground mt-2">{k.d}</p>
          </div>
        ))}
      </section>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {["All","Galapagos Legend","Coral I","Coral II"].map(f => (
            <button key={f} onClick={() => setShip(f)} className={cn(
              "px-4 h-9 rounded-xl text-[13px] font-medium transition-colors",
              ship === f ? "bg-navy text-white shadow-soft" : "bg-card border border-border text-navy hover:border-primary/40"
            )}>{f}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-secondary/60 w-64">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input className="bg-transparent outline-none text-[13px] flex-1" placeholder="Client, code…" />
          </div>
          <button className="h-9 px-3.5 rounded-xl border border-border bg-card text-navy text-[13px] inline-flex items-center gap-1.5 hover:border-primary/40 transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
          <button className="h-9 px-4 rounded-xl gradient-brand text-white text-[13px] font-medium inline-flex items-center gap-1.5 shadow-glow hover:shadow-elegant transition-premium">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <section className="hidden md:block premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-b border-border/60 bg-secondary/30">
                <th className="text-left font-medium px-6 py-3">Booking Code</th>
                <th className="text-left font-medium py-3">Client</th>
                <th className="text-center font-medium py-3">Pax</th>
                <th className="text-left font-medium py-3">Ship · Departure</th>
                <th className="text-left font-medium py-3">Status</th>
                <th className="text-right font-medium py-3">Miles</th>
                <th className="text-right font-medium px-6 py-3">Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map(b => (
                <tr key={b.code} className="hover:bg-secondary/40 transition-colors group">
                  <td className="px-6 py-3.5">
                    <Link to={`/confirmadas/${b.code}`} className="font-mono text-[12px] font-medium text-navy hover:text-primary">{b.code}</Link>
                  </td>
                  <td className="py-3.5 font-medium text-navy">{b.client}</td>
                  <td className="py-3.5 text-center text-navy/80">{b.pax}</td>
                  <td className="py-3.5">
                    <p className="text-navy">{b.ship}</p>
                    <p className="text-[11px] text-muted-foreground">{b.departure}</p>
                  </td>
                  <td className="py-3.5"><span className="pill bg-success/15 text-success">Confirmed</span></td>
                  <td className="py-3.5 text-right">
                    <span className="font-display font-semibold text-primary inline-flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> {b.miles.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1 text-[12px] text-primary hover:text-ocean font-medium">
                      <FileText className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile cards */}
      <section className="md:hidden space-y-3">
        {filtered.map(b => (
          <Link key={b.code} to={`/confirmadas/${b.code}`} className="premium-card p-5 block">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-mono text-[12px] text-navy font-medium">{b.code}</p>
                <p className="font-display font-semibold text-navy">{b.client}</p>
              </div>
              <span className="pill bg-success/15 text-success">Confirmed</span>
            </div>
            <p className="text-[13px] text-navy/80">{b.ship} · {b.departure}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{b.pax} pax</span>
              <span className="text-primary font-medium text-xs inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> {b.miles.toLocaleString()} miles
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Confirmadas;
