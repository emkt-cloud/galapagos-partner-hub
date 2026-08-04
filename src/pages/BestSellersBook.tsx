import { useState } from "react";
import {
  Map, ArrowRight, ArrowLeft, CalendarRange, Users, Ship as ShipIcon,
  Search, Clock, Tag, Check, UserCheck, Star, Save, Plane, Hotel, Bus
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  bestSellerPackages, departuresFor,
  type BestSellerPackage, type PackageDeparture, type CabinOption,
} from "@/data/packages";
import ItineraryDialog from "@/components/booking/ItineraryDialog";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

type Step = "grid" | "search" | "departures" | "config";

const serviceIcon = (type: string) =>
  type === "Transfer" ? Bus : type === "Hotel" ? Hotel : type === "Galapagos Cruise" ? ShipIcon : Plane;

const BestSellersBook = () => {
  const [step, setStep] = useState<Step>("grid");
  const [pkg, setPkg] = useState<BestSellerPackage | null>(null);
  const [departure, setDeparture] = useState<PackageDeparture | null>(null);
  const [cabin, setCabin] = useState<CabinOption | null>(null);
  const [itinOpen, setItinOpen] = useState<BestSellerPackage | null>(null);

  // search form
  const [dates, setDates] = useState("2026-08-01");
  const [pax, setPax] = useState(2);
  const [ship, setShip] = useState("All ships");

  const departures = pkg ? departuresFor(pkg) : [];

  const openItinerary = (p: BestSellerPackage) => setItinOpen(p);

  return (
    <div className="space-y-6 max-w-[1480px]">
      <ResourceBreadcrumb
        items={[
          { label: "Best Sellers" },
          ...(step !== "grid" && pkg ? [{ label: pkg.title }] : []),
        ]}
      />

      {/* ── STEP 1 · GRID ─────────────────────────────── */}
      {step === "grid" && (
        <>
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Best Sellers</h2>
            <p className="text-sm text-muted-foreground">
              Six signature packages combining Quito, the Andes and a Galápagos cruise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestSellerPackages.map(p => (
              <article key={p.slug} className="premium-card overflow-hidden flex flex-col group">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.cover} alt={p.title} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary text-white font-semibold">
                    {p.code}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-navy font-semibold inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {p.packageDuration.split("/")[0].trim()}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-base font-bold text-navy leading-tight">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 flex-1">{p.subtitle}</p>

                  <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><ShipIcon className="h-3 w-3 text-primary" /> Cruise {p.cruiseDuration.split("/")[0].trim()}</span>
                    <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3 text-primary" /> From ${p.fromUSD.toLocaleString()}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => openItinerary(p)}
                      className="h-10 px-3 rounded-xl border border-border text-xs text-muted-foreground hover:text-navy hover:border-primary/40 inline-flex items-center gap-1.5 transition-premium"
                    >
                      <Map className="h-3.5 w-3.5" /> Itinerary
                    </button>
                    <button
                      onClick={() => { setPkg(p); setStep("search"); }}
                      className="flex-1 h-10 rounded-xl gradient-brand text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant transition-premium"
                    >
                      Book <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* ── STEP 2 · SEARCH ───────────────────────────── */}
      {step === "search" && pkg && (
        <>
          <button onClick={() => setStep("grid")} className="text-xs text-muted-foreground inline-flex items-center gap-1.5 hover:text-navy">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Best Sellers
          </button>

          <section className="relative overflow-hidden rounded-3xl shadow-navy">
            <img src={pkg.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-navy/75 to-navy/40" />
            <div className="relative p-7 lg:p-9 text-white">
              <p className="text-[10px] uppercase tracking-[0.32em] text-primary-glow mb-2">Book a Package</p>
              <h2 className="font-display text-3xl font-light tracking-tight">{pkg.title}</h2>
              <p className="text-white/70 text-sm mt-1">{pkg.packageDuration} · Cruise {pkg.cruiseDuration}</p>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-3">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 inline-flex items-center gap-1.5"><Tag className="h-3 w-3" /> Rate / Product</label>
                  <p className="text-sm mt-1">FTS · {pkg.code} Package</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-3">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 inline-flex items-center gap-1.5"><CalendarRange className="h-3 w-3" /> Cruise date</label>
                  <input type="date" value={dates} onChange={e => setDates(e.target.value)}
                    className="w-full bg-transparent text-sm mt-1 outline-none [color-scheme:dark]" />
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-3">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 inline-flex items-center gap-1.5"><Users className="h-3 w-3" /> Passengers</label>
                  <input type="number" min={1} max={20} value={pax} onChange={e => setPax(+e.target.value)}
                    className="w-full bg-transparent text-sm mt-1 outline-none" />
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-3">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 inline-flex items-center gap-1.5"><ShipIcon className="h-3 w-3" /> Ship</label>
                  <select value={ship} onChange={e => setShip(e.target.value)}
                    className="w-full bg-transparent text-sm mt-1 outline-none [&>option]:text-navy">
                    {["All ships", "Galapagos Legend", "Coral I & Coral II", "Coral II"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button onClick={() => setStep("departures")}
                  className="h-11 px-6 rounded-xl bg-white text-navy text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                  <Search className="h-4 w-4" /> Search availability
                </button>
                <button onClick={() => openItinerary(pkg)}
                  className="h-11 px-5 rounded-xl bg-white/10 border border-white/25 text-sm inline-flex items-center gap-2">
                  <Map className="h-4 w-4" /> View itinerary
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── STEP 3 · DEPARTURES ───────────────────────── */}
      {step === "departures" && pkg && (
        <>
          <button onClick={() => setStep("search")} className="text-xs text-muted-foreground inline-flex items-center gap-1.5 hover:text-navy">
            <ArrowLeft className="h-3.5 w-3.5" /> Modify search
          </button>
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Available departures</h2>
            <p className="text-sm text-muted-foreground">{departures.length} departures for {pkg.title} · {pax} passengers</p>
          </div>

          <div className="space-y-5">
            {departures.map(d => (
              <article key={d.id} className="premium-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
                  {/* Left */}
                  <div className="p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-border/60">
                    <div className="flex items-start gap-4">
                      <img src={d.shipImage} alt={d.ship} className="h-20 w-28 rounded-xl object-cover shadow-soft" />
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold text-navy leading-tight">{d.ship}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="pill bg-secondary text-navy text-[11px]">Package {pkg.packageDuration}</span>
                          <span className="pill bg-primary/10 text-primary text-[11px]">Cruise {pkg.cruiseDuration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-secondary/60 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Package dates</p>
                        <p className="text-sm font-semibold text-navy mt-0.5">{d.packageStart} → {d.packageEnd}</p>
                      </div>
                      <div className="rounded-xl bg-secondary/60 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cruise dates</p>
                        <p className="text-sm font-semibold text-navy mt-0.5">{d.cruiseStart} → {d.cruiseEnd}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button onClick={() => openItinerary(pkg)}
                        className="h-9 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:text-navy hover:border-primary/40 inline-flex items-center gap-1.5 transition-premium">
                        <Map className="h-3.5 w-3.5" /> {pkg.itinerary.code}
                      </button>
                      <span className="h-9 px-3 rounded-lg bg-secondary text-xs text-navy inline-flex items-center gap-1.5">
                        <UserCheck className="h-3.5 w-3.5 text-primary" /> Our guides · {d.langs.join(" / ")}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Max {d.maxPassengers} pax · {d.maxCabins} cabins
                      </span>
                    </div>
                  </div>

                  {/* Right — cabins & promos */}
                  <div className="p-5 lg:p-6">
                    {d.promo && (
                      <p className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                        <Star className="h-3 w-3 fill-primary" /> {d.promo}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {d.cabins.map(c => (
                        <button
                          key={c.name}
                          disabled={!c.available}
                          onClick={() => { setDeparture(d); setCabin(c); setStep("config"); }}
                          className={cn(
                            "text-left rounded-xl border p-3 transition-premium",
                            c.available
                              ? "border-border hover:border-primary hover:shadow-soft"
                              : "border-dashed border-border/60 opacity-50 cursor-not-allowed"
                          )}
                        >
                          <p className="text-xs font-medium text-navy">{c.name}</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="font-display text-lg font-bold text-navy">${c.gross.toLocaleString()}</span>
                            {c.discount && <span className="pill bg-primary text-white text-[10px]">-{c.discount}%</span>}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {c.available ? "Available · per pax" : "Not available"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* ── STEP 4 · CABIN CONFIG & QUOTATION ─────────── */}
      {step === "config" && pkg && departure && cabin && (
        <>
          <button onClick={() => setStep("departures")} className="text-xs text-muted-foreground inline-flex items-center gap-1.5 hover:text-navy">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to departures
          </button>
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Cabin configuration & save quotation</h2>
            <p className="text-sm text-muted-foreground">{pkg.title} · {departure.ship}</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.85fr] gap-6 items-start">
            <div className="space-y-5">
              {/* 1 Departure information */}
              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">1. Departure information</h3>
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    ["Ship", departure.ship],
                    ["Itinerary", pkg.itinerary.code],
                    ["Package dates", `${departure.packageStart} → ${departure.packageEnd}`],
                    ["Cruise dates", `${departure.cruiseStart} → ${departure.cruiseEnd}`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-secondary/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
                      <p className="text-sm font-semibold text-navy mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2 Cabins and accommodation */}
              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">2. Cabins and accommodation</h3>
                <div className="mt-4 space-y-3">
                  {Array.from({ length: Math.max(1, Math.ceil(pax / 2)) }, (_, i) => (
                    <div key={i} className="rounded-xl border border-border p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cabin {i + 1}</p>
                        <p className="text-sm font-semibold text-navy">{cabin.name}</p>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Occupancy</label>
                        <select className="w-full h-9 mt-1 rounded-lg border border-border bg-background text-sm px-2">
                          <option>Double</option><option>Twin</option><option>Single</option><option>Triple</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Passengers</label>
                        <select className="w-full h-9 mt-1 rounded-lg border border-border bg-background text-sm px-2">
                          <option>2 ADT</option><option>1 ADT</option><option>1 ADT + 1 CHD</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3 Quotation summary */}
              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">3. Save this quotation</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Guest reference</label>
                    <input placeholder="e.g. Pérez · 2 ADT" className="w-full h-10 mt-1 rounded-lg border border-border bg-background text-sm px-3" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Quotation ref.</label>
                    <input readOnly value="Q 129104" className="w-full h-10 mt-1 rounded-lg border border-border bg-secondary/60 text-sm px-3 font-medium text-navy" />
                  </div>
                </div>
                <button className="mt-5 h-11 px-6 rounded-xl gradient-brand text-white text-sm font-semibold inline-flex items-center gap-2 shadow-soft hover:shadow-elegant transition-premium">
                  <Save className="h-4 w-4" /> Save quotation
                </button>
              </section>
            </div>

            {/* Summary sidebar */}
            <aside className="premium-card p-6 xl:sticky xl:top-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Package detail</p>
              <h3 className="font-display text-lg font-bold text-navy mt-1 leading-tight">{pkg.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{pkg.packageDuration} · Cruise {pkg.cruiseDuration}</p>

              <div className="mt-4 space-y-2">
                {pkg.services.map((s, i) => {
                  const Icon = serviceIcon(s.type);
                  return (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <span className="h-6 w-6 shrink-0 rounded-lg bg-secondary grid place-items-center">
                        <Icon className="h-3 w-3 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-navy font-medium truncate">{s.service}</p>
                        <p className="text-[10px] text-muted-foreground">Day {s.day} · {s.type}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-border/60 space-y-1.5">
                {pkg.includes.map(i => (
                  <p key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                    <Check className="h-3 w-3 mt-0.5 text-primary shrink-0" /> {i}
                  </p>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border/60 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total ({pax} pax)</p>
                  <p className="font-display text-2xl font-bold text-navy">
                    ${(cabin.gross * pax * (1 - (cabin.discount ?? 0) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground">{cabin.name}</p>
              </div>
            </aside>
          </div>
        </>
      )}

      <ItineraryDialog
        itinerary={itinOpen?.itinerary ?? null}
        open={!!itinOpen}
        onOpenChange={v => !v && setItinOpen(null)}
      />
    </div>
  );
};

export default BestSellersBook;
