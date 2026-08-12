import { useMemo, useState } from "react";
import {
  Map, ArrowRight, ArrowLeft, CalendarRange, Users, Ship as ShipIcon,
  Search, Clock, Tag, Check, UserCheck, Star, Save, Plane, Hotel, Bus,
  AlertCircle, CheckCircle2, FileText, Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  bestSellerPackages, departuresFor, packageFamilies,
  type BestSellerPackage, type PackageDeparture, type CabinOption,
} from "@/data/packages";
import ItineraryDialog from "@/components/booking/ItineraryDialog";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

type Step = "grid" | "search" | "departures" | "config" | "confirmation";

const STEPS: { id: Step; label: string }[] = [
  { id: "grid", label: "Package" },
  { id: "search", label: "Dates" },
  { id: "departures", label: "Departure" },
  { id: "config", label: "Cabins & quotation" },
  { id: "confirmation", label: "Confirmation" },
];

const serviceIcon = (type: string) =>
  type === "Transfer" ? Bus : type === "Hotel" ? Hotel : type === "Galapagos Cruise" ? ShipIcon : Plane;

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

type CabinRow = { occupancy: string; pax: string };
type Errors = Record<string, string>;

const inputCls = (bad?: boolean) =>
  cn(
    "w-full rounded-lg border bg-background text-sm px-3 transition-premium outline-none",
    bad ? "border-destructive focus:border-destructive" : "border-border focus:border-primary",
  );

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="mt-1 text-[11px] text-destructive inline-flex items-center gap-1">
      <AlertCircle className="h-3 w-3 shrink-0" /> {msg}
    </p>
  ) : null;

const BestSellersBook = () => {
  const [step, setStep] = useState<Step>("grid");
  const [pkg, setPkg] = useState<BestSellerPackage | null>(null);
  const [departure, setDeparture] = useState<PackageDeparture | null>(null);
  const [cabin, setCabin] = useState<CabinOption | null>(null);
  const [itinOpen, setItinOpen] = useState<BestSellerPackage | null>(null);
  const [family, setFamily] = useState<string>("All");

  // search form
  const [dates, setDates] = useState("2026-08-01");
  const [pax, setPax] = useState(2);
  const [ship, setShip] = useState("All ships");
  const [searchErrors, setSearchErrors] = useState<Errors>({});

  // quotation form
  const [cabinRows, setCabinRows] = useState<CabinRow[]>([]);
  const [guestRef, setGuestRef] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [configErrors, setConfigErrors] = useState<Errors>({});
  const [quotationRef, setQuotationRef] = useState("");

  const departures = pkg ? departuresFor(pkg) : [];
  const visible = useMemo(
    () => (family === "All" ? bestSellerPackages : bestSellerPackages.filter(p => p.family === family)),
    [family],
  );

  const cabinCount = Math.max(1, Math.ceil(pax / 2));
  const total = cabin ? cabin.gross * pax * (1 - (cabin.discount ?? 0) / 100) : 0;

  const openItinerary = (p: BestSellerPackage) => setItinOpen(p);

  const stepIndex = STEPS.findIndex(s => s.id === step);
  const canGoTo = (i: number) =>
    i <= stepIndex ||
    (i === 1 && !!pkg) ||
    (i === 2 && !!pkg) ||
    (i === 3 && !!departure && !!cabin);

  const goTo = (id: Step) => {
    const i = STEPS.findIndex(s => s.id === id);
    if (canGoTo(i)) setStep(id);
  };

  // ── validations ────────────────────────────────────
  const validateSearch = () => {
    const e: Errors = {};
    if (!dates) e.dates = "Select a cruise start date.";
    else if (new Date(dates) < new Date("2026-01-01")) e.dates = "Departures are available from Jan 2026.";
    if (!pax || pax < 1) e.pax = "At least 1 passenger is required.";
    if (pax > 20) e.pax = "For groups over 20 pax please contact your sales rep.";
    setSearchErrors(e);
    if (Object.keys(e).length) return;
    setStep("departures");
  };

  const startConfig = (d: PackageDeparture, c: CabinOption) => {
    setDeparture(d);
    setCabin(c);
    setCabinRows(
      Array.from({ length: Math.max(1, Math.ceil(pax / 2)) }, (_, i) => ({
        occupancy: "",
        pax: i === 0 ? "2 ADT" : "",
      })),
    );
    setConfigErrors({});
    setStep("config");
  };

  const updateRow = (i: number, patch: Partial<CabinRow>) =>
    setCabinRows(rows => rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const validateConfig = () => {
    const e: Errors = {};
    if (guestRef.trim().length < 3) e.guestRef = "Enter a guest reference (min. 3 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Enter a valid contact email.";
    cabinRows.forEach((r, i) => {
      if (!r.occupancy) e[`occ-${i}`] = "Select an occupancy.";
      if (!r.pax) e[`pax-${i}`] = "Select the passenger mix.";
    });
    if (departure && cabinRows.length > departure.maxCabins)
      e.cabins = `Only ${departure.maxCabins} cabins are available on this departure.`;
    setConfigErrors(e);
    if (Object.keys(e).length) return;
    setQuotationRef(`Q ${129000 + Math.floor(Math.random() * 900) + 100}`);
    setStep("confirmation");
  };

  const resetAll = () => {
    setStep("grid");
    setPkg(null); setDeparture(null); setCabin(null);
    setGuestRef(""); setEmail(""); setNotes(""); setCabinRows([]);
    setConfigErrors({}); setSearchErrors({}); setQuotationRef("");
  };

  return (
    <div className="space-y-6 max-w-[1480px]">
      <ResourceBreadcrumb
        items={[
          { label: "Best Sellers" },
          ...(step !== "grid" && pkg ? [{ label: pkg.title }] : []),
        ]}
      />

      {/* ── STEPPER ───────────────────────────────────── */}
      {step !== "grid" && (
        <nav aria-label="Booking steps" className="premium-card p-3 sm:p-4 overflow-x-auto">
          <ol className="flex items-center gap-2 min-w-max">
            {STEPS.map((s, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              const clickable = canGoTo(i) && !active;
              return (
                <li key={s.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!clickable}
                    onClick={() => goTo(s.id)}
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 h-9 px-3 rounded-full text-xs font-medium transition-premium",
                      active && "gradient-brand text-white shadow-soft",
                      !active && done && "bg-secondary text-navy hover:bg-secondary/80",
                      !active && !done && "text-muted-foreground",
                      !clickable && !active && "cursor-default",
                    )}
                  >
                    <span
                      className={cn(
                        "h-5 w-5 grid place-items-center rounded-full text-[10px] font-bold",
                        active ? "bg-white/25" : done ? "bg-primary text-white" : "bg-secondary",
                      )}
                    >
                      {done ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 && <span className="h-px w-4 sm:w-8 bg-border" />}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* ── STEP 1 · GRID ─────────────────────────────── */}
      {step === "grid" && (
        <>
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Best Sellers</h2>
            <p className="text-sm text-muted-foreground">
              {bestSellerPackages.length} signature packages across Quito, the Andes, the Amazon, Peru and the Galápagos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...packageFamilies].map(f => (
              <button
                key={f}
                onClick={() => setFamily(f)}
                className={cn(
                  "h-8 px-3 rounded-full text-xs font-medium border transition-premium",
                  family === f
                    ? "gradient-brand text-white border-transparent shadow-soft"
                    : "border-border text-muted-foreground hover:text-navy hover:border-primary/40",
                )}
              >
                {f === "All" ? "All packages" : f.split(":")[0]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(p => (
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
                    <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3 text-primary" /> From {money(p.fromUSD)}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => openItinerary(p)}
                      className="h-10 px-3 rounded-xl border border-border text-xs text-muted-foreground hover:text-navy hover:border-primary/40 inline-flex items-center gap-1.5 transition-premium"
                    >
                      <Map className="h-3.5 w-3.5" /> Itinerary
                    </button>
                    <button
                      onClick={() => { setPkg(p); setSearchErrors({}); setStep("search"); }}
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
                <div className={cn("rounded-2xl bg-white/10 backdrop-blur border p-3", searchErrors.dates ? "border-destructive" : "border-white/20")}>
                  <label className="text-[10px] uppercase tracking-wider text-white/60 inline-flex items-center gap-1.5"><CalendarRange className="h-3 w-3" /> Cruise date</label>
                  <input type="date" value={dates} onChange={e => { setDates(e.target.value); setSearchErrors(s => ({ ...s, dates: "" })); }}
                    className="w-full bg-transparent text-sm mt-1 outline-none [color-scheme:dark]" />
                  {searchErrors.dates && <p className="mt-1 text-[11px] text-red-300 inline-flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {searchErrors.dates}</p>}
                </div>
                <div className={cn("rounded-2xl bg-white/10 backdrop-blur border p-3", searchErrors.pax ? "border-destructive" : "border-white/20")}>
                  <label className="text-[10px] uppercase tracking-wider text-white/60 inline-flex items-center gap-1.5"><Users className="h-3 w-3" /> Passengers</label>
                  <input type="number" min={1} max={20} value={pax} onChange={e => { setPax(+e.target.value); setSearchErrors(s => ({ ...s, pax: "" })); }}
                    className="w-full bg-transparent text-sm mt-1 outline-none" />
                  {searchErrors.pax && <p className="mt-1 text-[11px] text-red-300 inline-flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {searchErrors.pax}</p>}
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
                <button onClick={validateSearch}
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
                          onClick={() => startConfig(d, c)}
                          className={cn(
                            "text-left rounded-xl border p-3 transition-premium",
                            c.available
                              ? "border-border hover:border-primary hover:shadow-soft"
                              : "border-dashed border-border/60 opacity-50 cursor-not-allowed"
                          )}
                        >
                          <p className="text-xs font-medium text-navy">{c.name}</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="font-display text-lg font-bold text-navy">{money(c.gross)}</span>
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
          <div className="relative mx-auto w-full max-w-3xl space-y-5">
            <button onClick={() => setStep("departures")} className="text-xs text-muted-foreground inline-flex items-center gap-1.5 hover:text-navy">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to departures
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-navy">Cabin configuration & save quotation</h2>
                <p className="text-sm text-muted-foreground">{pkg.title} · {departure.ship}</p>
              </div>
              <div className="hidden sm:block shrink-0 sticky top-6 z-20">
                <QuotationSummarySheet pkg={pkg} departure={departure} total={total} pax={pax} cabinName={cabin.name} />
              </div>
            </div>

            <div className="sm:hidden">
              <QuotationSummarySheet pkg={pkg} departure={departure} total={total} pax={pax} cabinName={cabin.name} />
            </div>

            {Object.keys(configErrors).length > 0 && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Please complete the highlighted fields</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {Object.keys(configErrors).length} field(s) need your attention before the quotation can be generated.
                  </p>
                </div>
              </div>
            )}

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
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-navy">2. Cabins and accommodation</h3>
                  <span className="text-[11px] text-muted-foreground">{cabinCount} cabin(s) · {pax} pax</span>
                </div>
                <FieldError msg={configErrors.cabins} />
                <div className="mt-4 space-y-3">
                  {cabinRows.map((row, i) => (
                    <div key={i} className="rounded-xl border border-border p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cabin {i + 1}</p>
                        <p className="text-sm font-semibold text-navy">{cabin.name}</p>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Occupancy *</label>
                        <select
                          value={row.occupancy}
                          onChange={e => { updateRow(i, { occupancy: e.target.value }); setConfigErrors(s => ({ ...s, [`occ-${i}`]: "" })); }}
                          className={cn(inputCls(!!configErrors[`occ-${i}`]), "h-9 mt-1 px-2")}
                        >
                          <option value="">Select…</option>
                          <option>Double</option><option>Twin</option><option>Single</option><option>Triple</option>
                        </select>
                        <FieldError msg={configErrors[`occ-${i}`]} />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Passengers *</label>
                        <select
                          value={row.pax}
                          onChange={e => { updateRow(i, { pax: e.target.value }); setConfigErrors(s => ({ ...s, [`pax-${i}`]: "" })); }}
                          className={cn(inputCls(!!configErrors[`pax-${i}`]), "h-9 mt-1 px-2")}
                        >
                          <option value="">Select…</option>
                          <option>2 ADT</option><option>1 ADT</option><option>1 ADT + 1 CHD</option><option>3 ADT</option>
                        </select>
                        <FieldError msg={configErrors[`pax-${i}`]} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3 Save quotation */}
              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">3. Save this quotation</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Guest reference *</label>
                    <input
                      value={guestRef}
                      onChange={e => { setGuestRef(e.target.value); setConfigErrors(s => ({ ...s, guestRef: "" })); }}
                      placeholder="e.g. Pérez · 2 ADT"
                      className={cn(inputCls(!!configErrors.guestRef), "h-10 mt-1")}
                    />
                    <FieldError msg={configErrors.guestRef} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Contact email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setConfigErrors(s => ({ ...s, email: "" })); }}
                      placeholder="agent@agency.com"
                      className={cn(inputCls(!!configErrors.email), "h-10 mt-1")}
                    />
                    <FieldError msg={configErrors.email} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Observations</label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Dietary needs, flight details, celebrations…"
                      className={cn(inputCls(false), "mt-1 py-2 resize-none")}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button onClick={() => setStep("departures")}
                    className="h-11 px-5 rounded-xl border border-border text-sm text-muted-foreground hover:text-navy hover:border-primary/40 inline-flex items-center gap-2 transition-premium">
                    <ArrowLeft className="h-4 w-4" /> Previous step
                  </button>
                  <button onClick={validateConfig}
                    className="h-11 px-6 rounded-xl gradient-brand text-white text-sm font-semibold inline-flex items-center gap-2 shadow-soft hover:shadow-elegant transition-premium">
                    <Save className="h-4 w-4" /> Save & review quotation
                  </button>
                </div>
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
                  <p className="font-display text-2xl font-bold text-navy">{money(total)}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">{cabin.name}</p>
              </div>
            </aside>
          </div>
        </>
      )}

      {/* ── STEP 5 · CONFIRMATION ─────────────────────── */}
      {step === "confirmation" && pkg && departure && cabin && (
        <>
          <section className="premium-card p-6 lg:p-8 border-primary/30">
            <div className="flex items-start gap-4">
              <span className="h-11 w-11 rounded-2xl bg-primary/10 grid place-items-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-navy">Quotation saved</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Reference <span className="font-semibold text-navy">{quotationRef}</span> · held for 72 hours ·
                  guest <span className="font-semibold text-navy">{guestRef}</span> · {email}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.85fr] gap-6 items-start">
            <div className="space-y-5">
              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">Selected package</h3>
                <div className="mt-4 flex items-start gap-4">
                  <img src={pkg.cover} alt="" className="h-20 w-28 rounded-xl object-cover shadow-soft" />
                  <div>
                    <p className="font-semibold text-navy">{pkg.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pkg.subtitle}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="pill bg-secondary text-navy text-[11px]">{pkg.packageDuration}</span>
                      <span className="pill bg-primary/10 text-primary text-[11px]">Cruise {pkg.cruiseDuration}</span>
                      <span className="pill bg-secondary text-navy text-[11px]">{pkg.itinerary.code}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">Cruise & package dates</h3>
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    ["Ship", departure.ship],
                    ["Guides", departure.langs.join(" / ")],
                    ["Package dates", `${departure.packageStart} → ${departure.packageEnd}`],
                    ["Cruise dates", `${departure.cruiseStart} → ${departure.cruiseEnd}`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-secondary/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
                      <p className="text-sm font-semibold text-navy mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => openItinerary(pkg)}
                  className="mt-4 h-9 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:text-navy hover:border-primary/40 inline-flex items-center gap-1.5 transition-premium">
                  <Map className="h-3.5 w-3.5" /> View {pkg.itinerary.code}
                </button>
              </section>

              <section className="premium-card p-6">
                <h3 className="font-display text-lg font-bold text-navy">Cabin configuration</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-wider text-muted-foreground text-left">
                        <th className="pb-2 font-medium">Cabin</th>
                        <th className="pb-2 font-medium">Category</th>
                        <th className="pb-2 font-medium">Occupancy</th>
                        <th className="pb-2 font-medium">Passengers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cabinRows.map((r, i) => (
                        <tr key={i} className="border-t border-border/60">
                          <td className="py-2.5 text-navy font-medium">Cabin {i + 1}</td>
                          <td className="py-2.5 text-muted-foreground">{cabin.name}</td>
                          <td className="py-2.5 text-muted-foreground">{r.occupancy}</td>
                          <td className="py-2.5 text-muted-foreground">{r.pax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {notes && (
                  <div className="mt-4 rounded-xl bg-secondary/60 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Observations</p>
                    <p className="text-sm text-navy mt-0.5">{notes}</p>
                  </div>
                )}
              </section>
            </div>

            {/* Quotation preview */}
            <aside className="premium-card p-6 xl:sticky xl:top-6">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Quotation preview</p>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mt-2">{quotationRef}</h3>
              <p className="text-xs text-muted-foreground">GO Galapagos by KleinTours · Status: Quote</p>

              <div className="mt-4 space-y-1.5 text-xs">
                {[
                  ["Package", `${pkg.code} · ${pkg.packageDuration}`],
                  ["Ship", departure.ship],
                  ["Cabin category", cabin.name],
                  ["Cabins", String(cabinRows.length)],
                  ["Passengers", `${pax} pax`],
                  ["Gross per pax", money(cabin.gross)],
                  ["Discount", cabin.discount ? `-${cabin.discount}%` : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-navy font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/60 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total quotation</p>
                  <p className="font-display text-2xl font-bold text-navy">{money(total)}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">USD · net of taxes</p>
              </div>

              <div className="mt-5 space-y-2">
                <button className="w-full h-11 rounded-xl gradient-brand text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant transition-premium">
                  <Printer className="h-4 w-4" /> Download quotation
                </button>
                <button onClick={() => setStep("config")}
                  className="w-full h-11 rounded-xl border border-border text-sm text-muted-foreground hover:text-navy hover:border-primary/40 inline-flex items-center justify-center gap-2 transition-premium">
                  <ArrowLeft className="h-4 w-4" /> Edit configuration
                </button>
                <button onClick={resetAll}
                  className="w-full h-11 rounded-xl bg-secondary text-navy text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-secondary/80 transition-premium">
                  New quotation
                </button>
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
