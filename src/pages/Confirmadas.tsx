import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, Sparkles, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { confirmed, totalMilesEarned } from "@/data/bookings";

const fmt = (n: number) => `$${n.toLocaleString()}`;

const Confirmadas = () => {
  const [ship, setShip] = useState("All");
  const [openPaxOf, setOpenPaxOf] = useState<string | null>(null);

  const filtered = ship === "All" ? confirmed : confirmed.filter(c => c.ship === ship);

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Stats — solo confirmed bookings + millas acumuladas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="premium-card p-6 animate-fade-up relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-success/15 blur-3xl" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-success">Confirmed bookings</p>
          <p className="font-display text-5xl font-semibold text-navy mt-2 leading-none">{confirmed.length}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Active <span className="font-mono font-semibold text-navy">T-codes</span> in the next 90 days
          </p>
        </div>
        <div className="premium-card p-6 animate-fade-up relative overflow-hidden" style={{ animationDelay: "60ms" }}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Miles earned by these bookings
          </div>
          <p className="font-display text-5xl font-semibold text-gradient-brand mt-2 leading-none">{totalMilesEarned.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Will post to your wallet upon full payment & departure.
          </p>
        </div>
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
            <input className="bg-transparent outline-none text-[13px] flex-1" placeholder="T-code, client, ref…" />
          </div>
          <button className="h-9 px-3.5 rounded-xl border border-border bg-card text-navy text-[13px] inline-flex items-center gap-1.5 hover:border-primary/40 transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <section className="hidden md:block premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-b border-border/60 bg-secondary/30">
                <th className="text-left font-medium px-6 py-3">GO Code</th>
                <th className="text-left font-medium py-3">Reservation Type</th>
                <th className="text-left font-medium py-3">Partner Code</th>
                <th className="text-left font-medium py-3">Guest Reference</th>
                <th className="text-center font-medium py-3">Pax Type</th>
                <th className="text-left font-medium py-3">Departure</th>
                <th className="text-left font-medium py-3">Ship</th>
                <th className="text-right font-medium py-3 pr-6">Miles</th>
                <th className="text-right font-medium px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map(b => (
                <>
                  <tr key={b.goCode} className="hover:bg-secondary/40 transition-colors group">
                    <td className="px-6 py-3.5 font-mono text-[12px] font-semibold text-navy">{b.goCode}</td>
                    <td className="py-3.5 text-navy/80">{b.reservationType}</td>
                    <td className="py-3.5 text-primary font-medium">{b.partnerCode}</td>
                    <td className="py-3.5 text-navy/80">{b.guestRef}</td>
                    <td className="py-3.5 text-center text-navy/80">{b.paxType}</td>
                    <td className="py-3.5 text-muted-foreground">{b.departure}</td>
                    <td className="py-3.5 text-navy">{b.ship}</td>
                    <td className="py-3.5 pr-6 text-right font-display font-semibold text-primary">+{b.earnedMiles.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setOpenPaxOf(openPaxOf === b.goCode ? null : b.goCode)}
                          className="h-8 px-2.5 rounded-lg border border-border text-navy text-[11.5px] font-medium hover:border-primary/40 inline-flex items-center gap-1"
                        >
                          <Users className="h-3 w-3" /> Pax
                        </button>
                        <Link
                          to={`/booking/${b.goCode}`}
                          className="h-8 px-2.5 rounded-lg gradient-brand text-white text-[11.5px] font-medium inline-flex items-center gap-1"
                        >
                          Open <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  {openPaxOf === b.goCode && (
                    <tr key={b.goCode + "-pax"} className="bg-secondary/30">
                      <td colSpan={9} className="px-6 py-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2.5">Passenger list — {b.goCode}</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {b.passengers.map((p, i) => (
                            <Link
                              key={i}
                              to={`/booking/${b.goCode}`}
                              className="group/pax flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
                            >
                              <div className="h-9 w-9 rounded-full gradient-brand grid place-items-center text-white text-[11px] font-semibold shrink-0">
                                {p.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-medium text-navy truncate">{p.name}</p>
                                <p className="text-[10.5px] text-muted-foreground">{p.type} · {p.nationality} · {p.passport}</p>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover/pax:text-primary" />
                            </Link>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile cards */}
      <section className="md:hidden space-y-3">
        {filtered.map(b => (
          <div key={b.goCode} className="premium-card p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-mono text-[12px] font-semibold text-navy">{b.goCode}</p>
                <p className="text-[13px] text-navy/80">{b.guestRef}</p>
              </div>
              <span className="pill bg-primary/10 text-primary">+{b.earnedMiles.toLocaleString()} mi</span>
            </div>
            <p className="text-[12px] text-muted-foreground">{b.ship} · {b.departure} · {b.paxType}</p>
            <Link to={`/booking/${b.goCode}`} className="mt-3 inline-flex items-center gap-1 text-[12px] text-primary font-medium">
              Open booking <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Confirmadas;
