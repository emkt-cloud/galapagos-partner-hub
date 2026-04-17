import { Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarCheck, CalendarRange, FolderOpen,
  Sparkles, Tag, LifeBuoy, ArrowUpRight, UserCircle2
} from "lucide-react";
import welcomeBg from "@/assets/welcome-bg.jpg";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import wildlifeBooby from "@/assets/wildlife-booby.jpg";

const tiles = [
  { to: "/dashboard",     icon: LayoutDashboard, title: "Dashboard",      desc: "Operations hub & KPIs",          featured: true, image: dashboardHero },
  { to: "/reservas",      icon: CalendarCheck,   title: "New Booking",    desc: "Quote, hold or confirm" },
  { to: "/disponibilidad",icon: CalendarRange,   title: "Availability",   desc: "Live cabins & departures" },
  { to: "/recursos",      icon: FolderOpen,      title: "Resources",      desc: "Brochures, photos, video", image: wildlifeBooby },
  { to: "/millas",        icon: Sparkles,        title: "Miles",          desc: "Your tier & rewards" },
  { to: "/tarifas",       icon: Tag,             title: "Rates",          desc: "Net, gross & promos" },
  { to: "/soporte",       icon: LifeBuoy,        title: "Support",        desc: "Your dedicated team" },
  { to: "/perfil",        icon: UserCircle2,     title: "My Profile",     desc: "Agency, team & data" },
];

const Welcome = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <img src={welcomeBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background to-background" />
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-ocean/25 blur-[150px]" />
        <div className="absolute inset-0 grid-luxe opacity-[0.35]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-14 lg:mb-20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center shadow-glow">
              <span className="text-white font-display font-bold">G</span>
            </div>
            <div>
              <p className="font-display font-bold text-navy leading-tight">GO Galápagos</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Partner Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-muted-foreground">Andes Travel · </span>
              <span className="text-primary font-semibold">Elite Partner</span>
            </span>
            <div className="h-10 w-10 rounded-full gradient-ocean grid place-items-center text-white text-sm font-semibold shadow-soft">CR</div>
          </div>
        </header>

        {/* Greeting */}
        <div className="max-w-3xl mb-10 lg:mb-14 animate-fade-up">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-5 inline-flex items-center gap-2">
            <span className="h-px w-10 bg-primary" /> Welcome Hub · April 2025
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[88px] font-light text-navy leading-[1.02] mb-6 tracking-tight">
            Welcome, <span className="font-semibold text-gradient-brand">Camila</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Your GO Galápagos operations hub. Access bookings, availability and commercial tools — all in one place.
          </p>
        </div>

        {/* Quick metric strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
          {[
            ["Active bookings", "182", "+12.4%"],
            ["Open holds", "3", "expires today"],
            ["Revenue MTD", "$284K", "+8.2%"],
            ["Available miles", "48,250", "Platinum"],
          ].map(([l,v,d]) => (
            <div key={l} className="px-4 py-3 rounded-2xl bg-card/70 backdrop-blur-md border border-border/60">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{l}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="font-display text-xl font-semibold text-navy">{v}</p>
                <p className="text-[11px] text-primary font-medium">{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick access tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              style={{ animationDelay: `${180 + i * 50}ms` }}
              className={`group relative premium-card p-6 overflow-hidden animate-fade-up ${t.featured ? "lg:col-span-2 lg:row-span-1" : ""}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.06), hsl(var(--ocean)/0.06))" }} />
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start justify-between mb-6">
                <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center text-ocean group-hover:gradient-brand group-hover:text-white transition-all duration-500 shadow-soft">
                  <t.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="relative">
                <h3 className="font-display text-[17px] font-semibold text-navy mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between text-xs text-muted-foreground animate-fade-in">
          <span>Secure session · Last activity today 09:42</span>
          <span className="hidden md:inline">v2026.04 · Premium experience</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
