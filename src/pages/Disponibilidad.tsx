import { Ship, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const ships = ["Galapagos Legend", "Coral I", "Coral II"];

const status = (d: number, s: number): "available" | "low" | "full" => {
  const seed = (d * 7 + s * 13) % 10;
  if (seed < 6) return "available";
  if (seed < 8) return "low";
  return "full";
};

const colorMap = {
  available: "bg-primary/15 text-ocean hover:bg-primary/30",
  low:       "bg-warning/15 text-warning hover:bg-warning/30",
  full:      "bg-destructive/15 text-destructive cursor-not-allowed",
};

const Disponibilidad = () => {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["Todas","Galapagos Legend","Coral I","Coral II"].map((f, i) => (
            <button key={f} className={cn("px-4 h-10 rounded-xl text-sm transition-colors",
              i === 0 ? "bg-navy text-white" : "bg-card border border-border text-navy hover:border-primary/40"
            )}>{f}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-border bg-card text-navy text-sm inline-flex items-center gap-2 hover:border-primary/40 transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filtros
          </button>
          <select className="h-10 px-4 rounded-xl border border-border bg-card text-navy text-sm">
            <option>Abril 2025</option><option>Mayo 2025</option><option>Junio 2025</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded bg-primary" /> Disponible</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded bg-warning" /> Pocas plazas</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded bg-destructive" /> Completo</span>
      </div>

      {/* Grid */}
      <div className="premium-card p-6 overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="text-left text-xs uppercase tracking-wider text-muted-foreground font-medium pb-3 sticky left-0 bg-card pr-4 min-w-[180px]">Embarcación</th>
              {days.map(d => (
                <th key={d} className="text-xs text-muted-foreground font-medium pb-3 min-w-[36px]">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ships.map((s, si) => (
              <tr key={s}>
                <td className="sticky left-0 bg-card pr-4 py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg gradient-ocean grid place-items-center text-white"><Ship className="h-4 w-4" /></div>
                    <div>
                      <p className="font-medium text-navy text-sm">{s}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Itinerario {si === 0 ? "A · 5n" : si === 1 ? "Sur · 4n" : "Norte · 4n"}</p>
                    </div>
                  </div>
                </td>
                {days.map(d => {
                  const st = status(d, si);
                  return (
                    <td key={d} className="p-0.5">
                      <button className={cn("w-full h-10 rounded-md text-[11px] font-medium transition-all", colorMap[st])}>
                        {st === "full" ? "—" : st === "low" ? "3" : "12"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salidas destacadas */}
      <div>
        <h3 className="font-display text-lg font-semibold text-navy mb-4">Salidas destacadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { ship: "Legend", date: "22 Abr · Itin. A", left: 2,  st: "low" },
            { ship: "Coral I", date: "24 Abr · Sur",    left: 8,  st: "available" },
            { ship: "Coral II", date: "26 Abr · Norte", left: 14, st: "available" },
          ].map((c, i) => (
            <div key={i} className="premium-card p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center text-white shadow-glow"><Ship className="h-4 w-4" /></div>
                <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-semibold",
                  c.st === "low" ? "bg-warning/15 text-warning" : "bg-primary/15 text-ocean"
                )}>{c.st === "low" ? "Pocas plazas" : "Disponible"}</span>
              </div>
              <p className="font-display font-semibold text-navy text-lg">{c.ship}</p>
              <p className="text-sm text-muted-foreground">{c.date}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60">
                <div>
                  <p className="text-xs text-muted-foreground">Cabinas libres</p>
                  <p className="font-display font-semibold text-navy">{c.left}</p>
                </div>
                <button className="h-9 px-4 rounded-lg gradient-brand text-white text-sm font-medium hover:shadow-glow transition-premium">Reservar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Disponibilidad;
