import { useState } from "react";
import { Download, FileText, Filter, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Booking = {
  code: string; ref: string; client: string; pax: number;
  ship: string; departure: string; total: number; deposit: number;
};

const bookings: Booking[] = [
  { code: "GO-2820", ref: "AT-9271", client: "Maria Pérez",     pax: 2, ship: "Galapagos Legend", departure: "22 Abr 2025", total: 9780,  deposit: 4890 },
  { code: "GO-2818", ref: "AT-9268", client: "Robert Klein",    pax: 2, ship: "Coral I",          departure: "24 Abr 2025", total: 11350, deposit: 11350 },
  { code: "GO-2815", ref: "AT-9261", client: "Sophie Laurent",  pax: 4, ship: "Coral II",         departure: "26 Abr 2025", total: 7120,  deposit: 2136 },
  { code: "GO-2812", ref: "AT-9255", client: "Hiroshi Tanaka",  pax: 2, ship: "Galapagos Legend", departure: "29 Abr 2025", total: 8490,  deposit: 8490 },
  { code: "GO-2809", ref: "AT-9248", client: "Anna Lindqvist",  pax: 3, ship: "Coral II",         departure: "2 May 2025",  total: 12780, deposit: 6390 },
  { code: "GO-2805", ref: "AT-9241", client: "James Whitaker",  pax: 2, ship: "Coral I",          departure: "5 May 2025",  total: 7480,  deposit: 7480 },
];

const fmt = (n: number) => `$${n.toLocaleString()}`;

const Confirmadas = () => {
  const [ship, setShip] = useState("Todas");
  const total = bookings.reduce((a, b) => a + b.total, 0);
  const deposited = bookings.reduce((a, b) => a + b.deposit, 0);

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { l: "Reservas confirmadas", v: bookings.length.toString(), d: "Próximos 60 días" },
          { l: "Valor total",          v: fmt(total),                 d: "Cartera confirmada" },
          { l: "Depositado",           v: fmt(deposited),             d: `${Math.round((deposited/total)*100)}% del total` },
          { l: "Balance pendiente",    v: fmt(total - deposited),     d: "Por cobrar" },
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
          {["Todas","Galapagos Legend","Coral I","Coral II"].map(f => (
            <button key={f} onClick={() => setShip(f)} className={cn(
              "px-4 h-9 rounded-xl text-[13px] font-medium transition-colors",
              ship === f ? "bg-navy text-white shadow-soft" : "bg-card border border-border text-navy hover:border-primary/40"
            )}>{f}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-secondary/60 w-64">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input className="bg-transparent outline-none text-[13px] flex-1" placeholder="Cliente, código, ref…" />
          </div>
          <button className="h-9 px-3.5 rounded-xl border border-border bg-card text-navy text-[13px] inline-flex items-center gap-1.5 hover:border-primary/40 transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filtros
          </button>
          <button className="h-9 px-4 rounded-xl gradient-brand text-white text-[13px] font-medium inline-flex items-center gap-1.5 shadow-glow hover:shadow-elegant transition-premium">
            <Download className="h-3.5 w-3.5" /> Exportar CSV
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
                <th className="text-left font-medium py-3">Ref. agencia</th>
                <th className="text-left font-medium py-3">Cliente</th>
                <th className="text-center font-medium py-3">Pax</th>
                <th className="text-left font-medium py-3">Barco · Salida</th>
                <th className="text-right font-medium py-3">Total</th>
                <th className="text-right font-medium py-3">Depositado</th>
                <th className="text-right font-medium py-3">Balance</th>
                <th className="text-left font-medium py-3 pl-6">Estado</th>
                <th className="text-right font-medium px-6 py-3">Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {bookings.map(b => {
                const balance = b.total - b.deposit;
                const paid = (b.deposit / b.total) * 100;
                const fullyPaid = balance === 0;
                return (
                  <tr key={b.code} className="hover:bg-secondary/40 transition-colors group">
                    <td className="px-6 py-3.5 font-mono text-[12px] font-medium text-navy">{b.code}</td>
                    <td className="py-3.5 font-mono text-[12px] text-muted-foreground">{b.ref}</td>
                    <td className="py-3.5 font-medium text-navy">{b.client}</td>
                    <td className="py-3.5 text-center text-navy/80">{b.pax}</td>
                    <td className="py-3.5">
                      <p className="text-navy">{b.ship}</p>
                      <p className="text-[11px] text-muted-foreground">{b.departure}</p>
                    </td>
                    <td className="py-3.5 text-right font-display font-semibold text-navy">{fmt(b.total)}</td>
                    <td className="py-3.5 text-right text-success font-medium">{fmt(b.deposit)}</td>
                    <td className="py-3.5 text-right font-medium" style={{ color: balance ? "hsl(var(--warning))" : "hsl(var(--success))" }}>
                      {balance ? fmt(balance) : "—"}
                    </td>
                    <td className="py-3.5 pl-6">
                      <div className="flex items-center gap-2 max-w-[140px]">
                        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className={cn("h-full rounded-full", fullyPaid ? "bg-success" : "gradient-brand")} style={{ width: `${paid}%` }} />
                        </div>
                        <span className="text-[11px] tabular-nums" style={{ color: fullyPaid ? "hsl(var(--success))" : "hsl(var(--muted-foreground))" }}>
                          {Math.round(paid)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="inline-flex items-center gap-1 text-[12px] text-primary hover:text-ocean font-medium">
                        <FileText className="h-3.5 w-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile cards */}
      <section className="md:hidden space-y-3">
        {bookings.map(b => {
          const balance = b.total - b.deposit;
          const fullyPaid = balance === 0;
          const paid = (b.deposit / b.total) * 100;
          return (
            <div key={b.code} className="premium-card p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-mono text-[11px] text-muted-foreground">{b.code} · {b.ref}</p>
                  <p className="font-display font-semibold text-navy">{b.client}</p>
                </div>
                <span className={cn("pill", fullyPaid ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                  {fullyPaid ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  {fullyPaid ? "Pagado" : "Pendiente"}
                </span>
              </div>
              <p className="text-[13px] text-navy/80">{b.ship} · {b.departure}</p>
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/60 text-[12px]">
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-display font-semibold text-navy">{fmt(b.total)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Depositado</p>
                  <p className="font-medium text-success">{fmt(b.deposit)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Balance</p>
                  <p className="font-medium" style={{ color: balance ? "hsl(var(--warning))" : "hsl(var(--success))" }}>
                    {balance ? fmt(balance) : "—"}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className={cn("h-full rounded-full", fullyPaid ? "bg-success" : "gradient-brand")} style={{ width: `${paid}%` }} />
                </div>
                <button className="text-[12px] text-primary font-medium inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" /> Voucher
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Confirmadas;
