import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock4, Lock, Mail, X, ArrowRight, FileText, Ship, Users,
  Calendar, AlertTriangle, Sparkles, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { holds, shipImageMap, type Hold } from "@/data/bookings";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

type HoldStatus = "critical" | "warning" | "ok";

const statusOf = (d: number): HoldStatus => d <= 2 ? "critical" : d <= 4 ? "warning" : "ok";
const max = 7;

const statusMap = {
  critical: { ring: "hsl(var(--destructive))", text: "text-destructive", bg: "bg-destructive/10", label: "Urgent" },
  warning:  { ring: "hsl(var(--warning))",     text: "text-warning",     bg: "bg-warning/10",     label: "Soon" },
  ok:       { ring: "hsl(var(--success))",     text: "text-success",     bg: "bg-success/10",     label: "OK" },
} as const;

const Holds = () => {
  const navigate = useNavigate();
  const [confirmHold, setConfirmHold] = useState<Hold | null>(null);
  const [cancelHold, setCancelHold] = useState<Hold | null>(null);

  const counts = {
    critical: holds.filter(h => statusOf(h.expiresIn) === "critical").length,
    warning:  holds.filter(h => statusOf(h.expiresIn) === "warning").length,
    ok:       holds.filter(h => statusOf(h.expiresIn) === "ok").length,
  };

  return (
    <div className="space-y-6 max-w-[1480px]">
      {/* Banner — modifications, hold cabins, confirmation, cancel */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-6 lg:p-8 shadow-navy">
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-3">
              <Lock className="h-3.5 w-3.5 text-primary-glow" />
              <span className="text-[10px] uppercase tracking-[0.22em]">Quote Stage</span>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-light leading-tight">
              Modifications, hold cabins, confirmation <span className="font-semibold">or cancel quotation</span>
            </h1>
            <p className="text-white/75 text-sm mt-3 max-w-2xl">
              Manage your active <strong className="text-white">Q-codes</strong> before they expire. Hold cabins guarantee inventory while
              you collect deposits, finalise passenger details and lock in the rate. After the deadline, the price and availability are released.
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-2.5 text-[12px]">
              <div className="px-3 py-2 rounded-xl bg-white/5 backdrop-blur border border-white/10">
                <p className="text-primary-glow font-semibold mb-0.5 text-[11px] uppercase tracking-wider">Hold Cabins</p>
                <p className="text-white/75 leading-snug">Block selected cabins until your time-limit expires.</p>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/5 backdrop-blur border border-white/10">
                <p className="text-primary-glow font-semibold mb-0.5 text-[11px] uppercase tracking-wider">Confirmation & Payment</p>
                <p className="text-white/75 leading-snug">Process the deposit and convert your Q-code into a T-code.</p>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/5 backdrop-blur border border-white/10">
                <p className="text-primary-glow font-semibold mb-0.5 text-[11px] uppercase tracking-wider">Cancel Quotation</p>
                <p className="text-white/75 leading-snug">Release inventory immediately if the client steps back.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 premium-card p-7 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warning/15 blur-3xl" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.28em] text-warning mb-3 inline-flex items-center gap-2">
              <Clock4 className="h-3.5 w-3.5" /> Active holds · Q codes
            </p>
            <p className="font-display text-5xl font-semibold text-navy leading-none">{holds.length}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Total accumulated value of{" "}
              <span className="text-navy font-semibold">${holds.reduce((s,h) => s + h.total, 0).toLocaleString()}</span>
            </p>
          </div>
        </div>
        {[
          { k: "critical" as const, label: "Expiring in ≤ 2 days", count: counts.critical },
          { k: "warning"  as const, label: "Between 3 and 4 days", count: counts.warning },
          { k: "ok"       as const, label: "More than 5 days",     count: counts.ok },
        ].map(s => {
          const v = statusMap[s.k];
          return (
            <div key={s.label} className="premium-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("h-9 w-9 rounded-lg grid place-items-center", v.bg, v.text)}>
                  {s.k === "critical" ? <AlertTriangle className="h-4 w-4" /> :
                   s.k === "warning"  ? <Clock4 className="h-4 w-4" /> :
                                        <Sparkles className="h-4 w-4" />}
                </span>
                <span className={cn("pill", v.bg, v.text)}>{v.label}</span>
              </div>
              <p className="font-display text-3xl font-semibold text-navy leading-none">{s.count}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{s.label}</p>
            </div>
          );
        })}
      </section>

      {/* Hold cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {holds.map((h, i) => {
          const st = statusOf(h.expiresIn);
          const v = statusMap[st];
          const pct = Math.min(100, (h.expiresIn / max) * 100);
          return (
            <article
              key={h.ref}
              style={{ animationDelay: `${i * 70}ms` }}
              className="premium-card p-0 animate-fade-up group relative overflow-hidden"
            >
              <span className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ background: v.ring }} />

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr]">
                <div className="relative overflow-hidden">
                  <img
                    src={shipImageMap[h.ship]}
                    alt={h.ship}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30" />
                </div>

                <div className="p-5 lg:p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0 rounded-full grid place-items-center"
                      style={{ background: `conic-gradient(${v.ring} ${pct}%, hsl(var(--secondary)) 0)` }}>
                      <div className="h-[54px] w-[54px] rounded-full bg-card grid place-items-center">
                        <div className="text-center">
                          <p className={cn("font-display text-lg font-semibold leading-none", v.text)}>{h.expiresIn}</p>
                          <p className="text-[8px] uppercase tracking-wider text-muted-foreground mt-0.5">{h.expiresIn === 1 ? "day" : "days"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="min-w-0">
                          <p className="font-mono text-[11px] text-primary font-semibold tracking-wide">{h.ref}</p>
                          <p className="font-display text-[16px] font-semibold text-navy leading-tight truncate">{h.client}</p>
                        </div>
                        <span className={cn("pill shrink-0", v.bg, v.text)}>{v.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[12.5px] text-navy/80 mt-1.5">
                        <Ship className="h-3.5 w-3.5 text-ocean shrink-0" />
                        <span className="truncate">{h.ship} · <span className="text-muted-foreground">{h.cabin}</span></span>
                      </div>
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-0.5 text-[11.5px] text-muted-foreground mt-1">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {h.departure}</span>
                        <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {h.pax} pax</span>
                        <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" /> <span className="text-navy font-display font-semibold">${h.total.toLocaleString()}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/60">
                    <button
                      onClick={() => navigate(`/booking/${encodeURIComponent(h.ref)}`)}
                      className="h-9 rounded-lg bg-navy text-white text-[12px] font-medium inline-flex items-center justify-center gap-1.5 hover:gradient-brand transition-premium"
                    >
                      <Lock className="h-3.5 w-3.5" /> Hold
                    </button>
                    <button
                      onClick={() => setConfirmHold(h)}
                      className="h-9 rounded-lg gradient-brand text-white text-[12px] font-medium inline-flex items-center justify-center gap-1 shadow-glow hover:shadow-elegant transition-premium"
                    >
                      <Mail className="h-3.5 w-3.5" /> Confirm & Pay
                    </button>
                    <button
                      onClick={() => setCancelHold(h)}
                      className="h-9 rounded-lg border border-destructive/30 bg-card text-destructive text-[12px] font-medium hover:bg-destructive/5 transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                  </div>

                  <Link
                    to={`/booking/${encodeURIComponent(h.ref)}`}
                    className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-primary hover:text-ocean font-medium"
                  >
                    Open booking details <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Confirm dialog */}
      <Dialog open={!!confirmHold} onOpenChange={(v) => !v && setConfirmHold(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/60 rounded-2xl">
          <div className="relative h-20 gradient-brand">
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur grid place-items-center border border-white/20">
                <Mail className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div className="px-6 pt-5 pb-6">
            <DialogHeader>
              <DialogTitle className="font-display text-navy">Confirmation & Payment</DialogTitle>
              <DialogDescription>
                Convert <span className="font-mono font-semibold text-navy">{confirmHold?.ref}</span> into a T-code and trigger payment for{" "}
                <span className="font-semibold text-navy">${confirmHold?.total.toLocaleString()}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button onClick={() => setConfirmHold(null)} className="h-10 rounded-lg border border-border text-navy text-sm font-medium hover:bg-secondary">Not yet</button>
              <button
                onClick={() => { if (confirmHold) navigate(`/booking/${encodeURIComponent(confirmHold.ref)}`); setConfirmHold(null); }}
                className="h-10 rounded-lg gradient-brand text-white text-sm font-medium shadow-glow"
              >
                Open & Pay
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel dialog */}
      <Dialog open={!!cancelHold} onOpenChange={(v) => !v && setCancelHold(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/60 rounded-2xl">
          <div className="relative h-20 bg-destructive/90">
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur grid place-items-center border border-white/20">
                <X className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div className="px-6 pt-5 pb-6">
            <DialogHeader>
              <DialogTitle className="font-display text-navy">Cancel Quotation</DialogTitle>
              <DialogDescription>
                This will release the cabins held for <span className="font-mono font-semibold text-navy">{cancelHold?.ref}</span>.
                The action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button onClick={() => setCancelHold(null)} className="h-10 rounded-lg border border-border text-navy text-sm font-medium hover:bg-secondary">Keep hold</button>
              <button onClick={() => setCancelHold(null)} className="h-10 rounded-lg bg-destructive text-white text-sm font-medium hover:opacity-90">Cancel quotation</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Holds;
