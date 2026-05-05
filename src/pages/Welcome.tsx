import { Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarCheck, Image as ImageIcon, FolderOpen,
  ArrowUpRight, TrendingUp, Info, Home as HomeIcon
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import wildlifeBooby from "@/assets/wildlife-booby.jpg";
import shipLegend from "@/assets/ship-legend.jpg";
import { getUserById } from "@/data/users";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

const tiles = [
  { to: "/dashboard",          icon: LayoutDashboard, title: "Dashboard",   desc: "Operations hub & KPIs",        featured: true, image: dashboardHero },
  { to: "/book/cruise",        icon: CalendarCheck,   title: "Book Now",    desc: "Cruises & land tours" },
  { to: "/recursos/gallery",   icon: ImageIcon,       title: "Gallery",     desc: "HD photos & video",            image: wildlifeBooby },
  { to: "/recursos",           icon: FolderOpen,      title: "Resources",   desc: "Rates · Products · Services",  image: shipLegend },
];

const tierExplain: Record<string, { from: string; perks: string }> = {
  Elite:    { from: "40,000 miles",  perks: "12% extra commission · priority allotments · free FAM trips · dedicated account manager"  },
  Platinum: { from: "25,000 miles",  perks: "9% extra commission · early bird access · 2 free FAM nights / year"                       },
  Gold:     { from: "12,000 miles",  perks: "6% extra commission · exclusive promos · birthday upgrade for clients"                    },
  Silver:   { from: "0 miles",       perks: "Standard commission · access to all marketing assets and trainings"                       },
};

const Welcome = () => {
  const userId = typeof window !== "undefined" ? sessionStorage.getItem("portal:userId") : null;
  const user = getUserById(userId);
  const tierInfo = tierExplain[user.tier];

  return (
    <div className="relative">
      {/* Greeting + profile card */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-start mb-10 animate-fade-up">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4 inline-flex items-center gap-2">
            <span className="h-px w-10 bg-primary" /> Welcome Hub
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light text-navy leading-[1.05] mb-4 tracking-tight">
            Welcome, <span className="font-semibold text-gradient-brand">{user.name.split(" ")[0]}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Your GO Galapagos operations hub. Access bookings, availability and commercial tools — all in one place.
          </p>
        </div>

        {/* Profile chip */}
        <div className="premium-card p-5 lg:min-w-[300px] animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-primary/20 shadow-soft shrink-0">
              <img src={user.avatar} alt={user.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-navy truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.role} · Andes Travel</p>
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="mt-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-primary font-semibold hover:text-ocean transition-colors">
                      <span className="h-1 w-1 rounded-full bg-primary" /> {user.tier}
                      <Info className="h-3 w-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[260px] p-3 bg-navy text-white border-navy">
                    <p className="font-display text-[13px] font-semibold mb-1">{user.tier} tier</p>
                    <p className="text-[11px] text-white/80 mb-1.5">From <span className="text-primary-glow font-semibold">{tierInfo.from}</span> accumulated.</p>
                    <p className="text-[11px] leading-snug text-white/75">{tierInfo.perks}</p>
                    <p className="text-[10px] text-primary-glow mt-2 inline-flex items-center gap-1">
                      Current balance: {user.miles.toLocaleString()} miles
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Commission</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="font-display text-2xl font-semibold text-navy">{user.commission}%</p>
                <TrendingUp className="h-3.5 w-3.5 text-success" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Bookings</p>
              <p className="font-display text-2xl font-semibold text-navy mt-0.5">{user.bookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick metric strip — sin revenue */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 animate-fade-up" style={{ animationDelay: "180ms" }}>
        {[
          ["Active bookings", String(user.bookings), "+12.4%"],
          ["Open holds", "3", "1 expires today"],
          ["Available miles", user.miles.toLocaleString(), user.tier],
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

      {/* Quick access tiles — 4 botones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((t, i) => (
          <Link
            key={t.to}
            to={t.to}
            style={{ animationDelay: `${220 + i * 50}ms` }}
            className={`group relative premium-card p-0 overflow-hidden animate-fade-up ${t.featured ? "lg:col-span-2" : ""}`}
          >
            {t.image && (
              <div className={`relative overflow-hidden ${t.featured ? "h-40 md:h-44" : "h-28"}`}>
                <img
                  src={t.image}
                  alt=""
                  loading="lazy"
                  width={800}
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              </div>
            )}

            <div className="relative p-5 md:p-6">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.06), hsl(var(--ocean)/0.06))" }} />
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center text-ocean group-hover:gradient-brand group-hover:text-white transition-all duration-500 shadow-soft">
                  <t.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="relative">
                <h3 className="font-display text-[17px] font-semibold text-navy mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between text-xs text-muted-foreground animate-fade-in">
        <span>Secure session · Last activity {user.lastActive}</span>
        <span className="hidden md:inline">v2026.05 · Premium experience</span>
      </div>
    </div>
  );
};

export default Welcome;
