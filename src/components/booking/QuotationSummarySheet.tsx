import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ClipboardList } from "lucide-react";
import type { BestSellerPackage, PackageDeparture } from "@/data/packages";

type Props = {
  pkg: BestSellerPackage;
  departure: PackageDeparture;
  total: number;
  pax: number;
  cabinName: string;
};

const detailFor = (type: string, cruise: string) =>
  type === "Hotel" ? "Premium Room" : type === "Galapagos Cruise" ? cruise : "";

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const QuotationSummarySheet = ({ pkg, departure, total, pax, cabinName }: Props) => {
  const days = Array.from(new Set(pkg.services.map(s => s.day))).sort((a, b) => a - b);
  const cruiseLabel = `${pkg.itinerary.code} · ${pkg.cruiseDuration}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-11 px-5 rounded-xl gradient-brand text-white text-sm font-semibold inline-flex items-center gap-2 shadow-elegant hover:shadow-soft transition-premium">
          <ClipboardList className="h-4 w-4" /> Quotation Summary
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border/60 text-left">
          <SheetTitle className="font-display text-xl text-navy">Quotation Summary</SheetTitle>
          <p className="text-xs text-muted-foreground">{pkg.title} · {departure.ship}</p>
          <p className="text-xs text-muted-foreground">
            {departure.packageStart} → {departure.packageEnd} · {pkg.packageDuration}
          </p>
        </SheetHeader>

        {/* Simple day-by-day list: one row per service */}
        <div className="p-6">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[56px_1fr] bg-secondary/70 px-4 py-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Day</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Service</span>
            </div>

            {days.map(day => {
              const rows = pkg.services.filter(s => s.day === day).sort((a, b) => a.order - b.order);
              return (
                <div key={day} className="grid grid-cols-[56px_1fr] border-t border-border/70">
                  <div className="px-4 py-3 bg-secondary/30">
                    <span className="text-sm font-bold text-navy">{day}</span>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    {rows.map((s, i) => {
                      const detail = detailFor(s.type, cruiseLabel);
                      return (
                        <div key={i}>
                          <p className="text-sm text-navy leading-snug">
                            {s.service || pkg.itinerary.code}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {s.type}{detail ? ` · ${detail}` : ""}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
