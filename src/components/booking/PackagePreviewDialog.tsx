import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Bus, Check, Hotel as HotelIcon, MapPin, Ship } from "lucide-react";
import type { BestSellerPackage, PackageService } from "@/data/packages";

type Props = {
  pkg: BestSellerPackage | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const typeIcon = (type: string) => {
  switch (type) {
    case "Hotel": return <HotelIcon className="h-3.5 w-3.5 mt-0.5 text-primary-glow shrink-0" />;
    case "Galapagos Cruise": return <Ship className="h-3.5 w-3.5 mt-0.5 text-primary-glow shrink-0" />;
    case "Land Tour": return <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary-glow shrink-0" />;
    default: return <Bus className="h-3.5 w-3.5 mt-0.5 text-primary-glow shrink-0" />;
  }
};

const detailFor = (s: PackageService) =>
  s.type === "Hotel" ? "Premium Room" : "";

const PackagePreviewDialog = ({ pkg, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-5xl p-0 overflow-hidden border-0 bg-night text-white">
      {pkg && (
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] max-h-[85vh]">
          {/* Cover */}
          <div className="relative">
            <img
              src={pkg.cover}
              alt={pkg.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/20 lg:bg-gradient-to-r" />
            <div className="relative h-full flex flex-col justify-end p-6">
              <span className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[10px] uppercase tracking-[0.2em]">
                Package preview
              </span>
              <h3 className="mt-3 font-display text-2xl font-light tracking-tight">{pkg.title}</h3>
              <p className="mt-2 text-xs text-white/70">{pkg.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">{pkg.packageDuration}</span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">Cruise {pkg.cruiseDuration}</span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">From ${pkg.fromUSD.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Day-by-day */}
          <div className="p-7 lg:p-9 overflow-y-auto">
            <h4 className="font-display text-lg font-semibold tracking-tight">What this package includes, day by day</h4>
            <p className="text-xs text-white/60 mt-1">Confirm a departure to see the full cruise itinerary and dates.</p>

            <div className="mt-5 space-y-5">
              {Array.from(new Set(pkg.services.map(s => s.day))).sort((a, b) => a - b).map(day => {
                const rows = pkg.services.filter(s => s.day === day).sort((a, b) => a.order - b.order);
                return (
                  <div key={day} className="pt-5 border-t border-white/15 first:border-0 first:pt-0">
                    <p className="text-sm font-medium text-white/90">Day {day}</p>
                    <div className="mt-2 space-y-1.5">
                      {rows.map((s, i) => (
                        <p key={i} className="text-sm text-white/70 flex items-start gap-2">
                          {typeIcon(s.type)}
                          <span>
                            {s.service}
                            {detailFor(s) && <span className="text-white/50"> · {detailFor(s)}</span>}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-white/15">
              <p className="text-[11px] uppercase tracking-wider text-white/60">Also included</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pkg.includes.map(inc => (
                  <span key={inc} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70">
                    <Check className="h-3 w-3 text-primary-glow" /> {inc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default PackagePreviewDialog;
