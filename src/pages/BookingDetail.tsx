import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Printer, Mail, X, Plane, Ship as ShipIcon, Plus, FileText, Clock, Calendar, User, Users } from "lucide-react";
import { findHold, findConfirmed } from "@/data/bookings";

const BookingDetail = () => {
  const { ref } = useParams<{ ref: string }>();
  const decoded = ref ? decodeURIComponent(ref) : "";
  const hold = findHold(decoded);
  const conf = findConfirmed(decoded);
  const isHold = !!hold;
  const data = hold ?? conf;

  if (!data) {
    return (
      <div className="max-w-xl">
        <p className="text-sm text-muted-foreground">Booking <span className="font-mono">{decoded}</span> not found.</p>
        <Link to="/holds" className="text-primary text-sm inline-flex items-center gap-1 mt-3"><ArrowLeft className="h-3.5 w-3.5" /> Back to Holds</Link>
      </div>
    );
  }

  const code = isHold ? hold!.ref : conf!.goCode;
  const client = isHold ? hold!.client : conf!.guestRef;
  const ship = isHold ? hold!.ship : conf!.ship;
  const departure = isHold ? hold!.departure : conf!.departure;
  const paxCount = isHold ? hold!.pax : conf!.pax;
  const total = isHold ? hold!.total : conf!.total;

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Top banner */}
      <div className="rounded-2xl gradient-ocean text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary-glow" />
          <span className="text-[11px] uppercase tracking-[0.28em]">Booking Details</span>
        </div>
        <span className="text-[11px] uppercase tracking-wider opacity-80">Modifications · Hold · Confirmation · Cancel</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Tour details */}
        <section className="premium-card p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2">Tour Details</p>
          <p className="text-[10px] text-muted-foreground">PARTNER</p>
          <p className="font-display font-semibold text-navy">KLEINTOURS DESARROLLO</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <p className="text-[10px] text-muted-foreground">CONTACT</p>
              <p className="text-sm text-navy">{isHold ? hold!.contact : "Armando . C"}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">AGENT</p>
              <p className="text-sm text-navy">{isHold ? hold!.agent : "Madeleine . U"}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className={`pill ${isHold ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{isHold ? "Hold" : "Confirmed"}</span>
            {isHold && <span className="text-[11px] text-muted-foreground">Modifications {hold!.numberOfMods} · Extensions 1</span>}
          </div>
        </section>

        {/* Booking info */}
        <section className="premium-card p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2">Booking Info</p>
          <dl className="space-y-1.5 text-[13px]">
            <div className="flex justify-between"><dt className="text-muted-foreground">{isHold ? "QUOTATION REF." : "GO CODE"}</dt><dd className="font-mono font-semibold text-navy">{code}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">TOTAL PASSENGERS</dt><dd className="text-navy">{paxCount} pax</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">PAX TYPE</dt><dd className="text-navy">{isHold ? `${paxCount}ADT` : conf!.paxType}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">PARTNER REF.</dt><dd className="text-primary">{isHold ? hold!.partnerCode : conf!.partnerCode}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">RESERVATION TYPE</dt><dd className="text-navy">{isHold ? hold!.reservationType : conf!.reservationType}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">RATE TYPE</dt><dd className="text-navy">{isHold ? hold!.rateType : "FTS"}</dd></div>
          </dl>
        </section>

        {/* Timeline */}
        <section className="premium-card p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2 inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> Timeline</p>
          <dl className="space-y-1.5 text-[13px]">
            <div className="flex justify-between"><dt className="text-muted-foreground">DATE OF REQUEST</dt><dd className="text-navy">Apr 29, 2026 11:50</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">RESERVATION DATE</dt><dd className="text-navy">May 4, 2026</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">TIME LIMIT</dt><dd className="text-warning font-medium">May 10, 2026 ({isHold ? `${hold!.expiresIn}d` : "—"})</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">DEPOSIT DEADLINE</dt><dd className="text-navy">Apr 10, 2026</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">FULL PAYMENT</dt><dd className="text-navy">May 4, 2026</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">SAILING DATE</dt><dd className="text-navy font-medium">{departure}</dd></div>
          </dl>
        </section>

        {/* Actions */}
        <section className="premium-card p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Actions</p>
          <div className="space-y-2">
            <button className="w-full h-10 rounded-lg gradient-brand text-white text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 shadow-glow">
              <Mail className="h-3.5 w-3.5" /> Confirmation & Payment
            </button>
            <button className="w-full h-10 rounded-lg border border-border text-navy text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 hover:border-primary/40">
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
            <button className="w-full h-10 rounded-lg border border-destructive/30 text-destructive text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 hover:bg-destructive/5">
              <X className="h-3.5 w-3.5" /> Cancel Quotation
            </button>
          </div>
        </section>
      </div>

      {/* Itinerary */}
      <section className="premium-card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-navy inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Itinerary
          </h3>
          <span className="text-[11px] text-muted-foreground">{ship}</span>
        </div>

        {/* Day 1 */}
        <div className="grid grid-cols-[80px_120px_1fr_auto] gap-4 px-6 py-5 border-b border-border items-center">
          <div className="text-center bg-primary text-white rounded-lg py-2">
            <p className="text-[10px] uppercase tracking-wider">Day 1</p>
            <p className="font-display font-bold">10 May</p>
          </div>
          <div className="bg-destructive/15 text-destructive rounded-lg py-3 px-3 text-center">
            <Plane className="h-4 w-4 mx-auto mb-1" />
            <p className="text-[11px] font-semibold">AVIANCA</p>
          </div>
          <div className="grid grid-cols-4 gap-3 text-[11.5px]">
            <div><p className="text-muted-foreground">TKT-CAT</p><p className="text-navy">Round Trip · ECON.</p></div>
            <div><p className="text-muted-foreground">OUTWARD</p><p className="text-navy">UIO – BAL</p></div>
            <div><p className="text-muted-foreground">RETURN</p><p className="text-navy">SCY – UIO</p></div>
            <div><p className="text-muted-foreground">NAC.</p><p className="text-navy">FOREIGN</p></div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">2ADT</p>
            <p className="font-display font-semibold text-navy">$1,050.00</p>
          </div>
        </div>

        <div className="grid grid-cols-[80px_120px_1fr_auto] gap-4 px-6 py-5 items-center">
          <div />
          <div className="bg-primary/15 text-primary rounded-lg py-3 px-3 text-center">
            <ShipIcon className="h-4 w-4 mx-auto mb-1" />
            <p className="text-[10px] font-semibold leading-tight">CI & CII<br/>4D / 3N</p>
          </div>
          <div className="grid grid-cols-6 gap-3 text-[11px]">
            <div><p className="text-muted-foreground">#ROOMS</p><p className="text-navy">1</p></div>
            <div><p className="text-muted-foreground">CATEGORY</p><p className="text-navy">STP</p></div>
            <div><p className="text-muted-foreground">ACOMM</p><p className="text-navy">DBL</p></div>
            <div><p className="text-muted-foreground">PAX TYPE</p><p className="text-navy">FITS</p></div>
            <div><p className="text-muted-foreground">DISCOUNT</p><p className="text-navy">Off -15%</p></div>
            <div><p className="text-muted-foreground">SEASON</p><p className="text-navy">LS</p></div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">2ADT · 1825.8</p>
            <p className="font-display font-semibold text-destructive">$3,651.60</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-secondary/30 grid place-items-center">
          <button className="h-10 px-5 rounded-full gradient-brand text-white text-[12.5px] font-medium inline-flex items-center gap-2 shadow-glow">
            <Plus className="h-3.5 w-3.5" /> Add Service to Day 1
          </button>
        </div>
      </section>

      {/* Pax + observation + totals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="premium-card p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3 inline-flex items-center gap-1.5"><Users className="h-3 w-3" /> Passengers</p>
          <div className="space-y-2">
            {data.passengers.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/40">
                <div className="h-9 w-9 rounded-full gradient-brand text-white grid place-items-center text-[11px] font-semibold">
                  {p.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-navy">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.type} · {p.nationality} · {p.passport}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="premium-card p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2">General Observation</p>
            <p className="text-sm text-muted-foreground italic">No observation</p>
          </div>
          <div className="premium-card p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Totals</p>
            <dl className="space-y-1.5 text-[13px]">
              <div className="flex justify-between"><dt className="text-muted-foreground">SUB TOTAL</dt><dd className="text-navy">${(total * 0.85).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">SUB TOTAL IVA</dt><dd className="text-navy">0.00</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">IVA</dt><dd className="text-navy">0.00</dd></div>
              <div className="flex justify-between border-t border-border pt-2 mt-2"><dt className="font-semibold text-navy">TOTAL</dt><dd className="font-display font-semibold text-primary text-xl">${total.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</dd></div>
            </dl>
          </div>
        </section>
      </div>

      <Link to={isHold ? "/holds" : "/confirmadas"} className="inline-flex items-center gap-1 text-sm text-primary font-medium">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>
    </div>
  );
};

export default BookingDetail;
