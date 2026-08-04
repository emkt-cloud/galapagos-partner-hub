import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Compass, CalendarDays, Plane } from "lucide-react";
import type { CruiseItinerary } from "@/data/packages";

type Props = {
  itinerary: CruiseItinerary | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const ItineraryDialog = ({ itinerary, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-6xl p-0 overflow-hidden border-0 bg-night text-white">
      {itinerary && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] max-h-[85vh]">
          {/* Map */}
          <div className="relative bg-navy/60 p-6">
            <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[10px] uppercase tracking-[0.2em]">
              <Compass className="h-3.5 w-3.5" /> Expedition
            </span>
            <img
              src={itinerary.map}
              alt={`${itinerary.code} route map`}
              className="w-full h-full max-h-[80vh] object-contain"
            />
          </div>

          {/* Detail */}
          <div className="p-7 lg:p-9 overflow-y-auto">
            <h3 className="font-display text-3xl font-light tracking-tight">{itinerary.code}</h3>
            <span className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs uppercase tracking-wider">
              <CalendarDays className="h-4 w-4 text-primary-glow" /> {itinerary.duration}
            </span>

            <div className="mt-6 space-y-5">
              {itinerary.days.map(d => (
                <div key={d.day} className="pt-5 border-t border-white/15 first:border-0 first:pt-0">
                  <p className="text-sm font-medium text-white/90">{d.day}</p>
                  <div className="mt-2 space-y-1.5">
                    {d.items.map((it, i) => (
                      <p key={i} className="text-sm text-white/70 flex items-start gap-2">
                        {it.flight ? (
                          <Plane className="h-3.5 w-3.5 mt-0.5 text-primary-glow shrink-0" />
                        ) : (
                          <span className="w-7 shrink-0 text-white/50">{it.when}</span>
                        )}
                        <span>{it.text}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default ItineraryDialog;
