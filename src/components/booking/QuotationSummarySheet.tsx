import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ClipboardList, Bus, Hotel, Ship as ShipIcon, Plane, Check } from "lucide-react";
import type { BestSellerPackage, PackageDeparture } from "@/data/packages";

type Props = {
  pkg: BestSellerPackage;
  departure: PackageDeparture;
  total: number;
  pax: number;
  cabinName: string;
};

const iconFor = (type: string) =>
  type === "Transfer" ? Bus : type === "Hotel" ? Hotel : type === "Galapagos Cruise" ? ShipIcon : Plane;

const subService = (type: string, pkgCruise: string) =>
  type === "Hotel" ? "Premium Room" : type === "Galapagos Cruise" ? pkgCruise : "";

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const QuotationSummarySheet = ({ pkg, departure, total, pax, cabinName }: Props) => {
  const days = Array.from(new Set(pkg.services.map(s => s.day))).sort((a, b) => a - b);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-11 px-5 rounded-xl gradient-brand text-white text-sm font-semibold inline-flex items-center gap-2 shadow-elegant hover:shadow-soft transition-premium">
          <ClipboardList className="h-4 w-4" /> Quotation Summary
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border/60 text-left">
          <SheetTitle className="font-display text-xl text-navy">Quotation Summary</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {pkg.title} · {departure.ship}
          </p>
          <p className="text-xs text-muted-foreground">
            {departure.packageStart} → {departure.packageEnd} · {pkg.packageDuration}
          </p>
        </SheetHeader>

        {/* Day-by-day timeline */}
        <div className="p-6 space-y-5">
          {days.map(day => {
            const rows = pkg.services.filter(s => s.day === day).sort((a, b) => a.order - b.order);
            return (
              <div key={day} className="relative pl-12">
                {/* Day marker */}
                <div className="absolute left-0 top-0 flex flex-col items-center">
                  <span className="h-9 w-9 rounded-xl gradient-brand text-white grid place-items-center text-xs font-bold shadow-soft">
                    {day}
                  </span>
                  {day !== days[days.length - 1] && (
                    <span className="w-px flex-1 min-h-[calc(100%-0.25rem)] bg-border mt-1" />
                  )}
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Day {day}</p>

                <div className="space-y-2 pb-4">
                  {rows.map((s, i) => {
                    const Icon = iconFor(s.type);
                    const sub = subService(s.type, `${pkg.itinerary.code} · ${pkg.cruiseDuration}`);
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-card p-3 flex items-start gap-3 hover:border-primary/40 transition-premium"
                      >
                        <span className="h-7 w-7 shrink-0 rounded-lg bg-secondary grid place-items-center">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              #{s.order}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              {s.type}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-navy leading-snug">
                            {s.service || `${pkg.itinerary.code}`}
                          </p>
                          {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Includes */}
        <div className="px-6 pb-6">
          <div className="rounded-xl bg-secondary/50 p-4 space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Includes</p>
            {pkg.includes.map(i => (
              <p key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                <Check className="h-3 w-3 mt-0.5 text-primary shrink-0" /> {i}
              </p>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="sticky bottom-0 bg-card border-t border-border/60 p-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total ({pax} pax)</p>
            <p className="font-display text-2xl font-bold text-navy">{money(total)}</p>
          </div>
          <p className="text-[11px] text-muted-foreground">{cabinName}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuotationSummarySheet;
