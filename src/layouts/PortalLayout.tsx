import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarRange, Clock4, CheckCircle2, Tag, Package,
  FolderOpen, Sparkles, LifeBuoy, ChevronLeft, GraduationCap, Image as ImageIcon,
  Search, Bell, LogOut, UserCircle2, Ship, Compass, Command, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserById } from "@/data/users";

type NavGroup = { label?: string; items: { to: string; label: string; icon: any; badge?: string }[] };

const groups: NavGroup[] = [
  {
    items: [
      { to: "/dashboard", label: "Home / Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/reservas",       label: "Book a Cruise",  icon: Ship },
      { to: "/land-tours",     label: "Book Land Tours",icon: Compass },
      { to: "/disponibilidad", label: "Availability",   icon: CalendarRange },
      { to: "/holds",          label: "Holds",          icon: Clock4, badge: "3" },
      { to: "/confirmadas",    label: "Confirmed",      icon: CheckCircle2 },
    ],
  },
  {
    label: "Catalog",
    items: [
      { to: "/tarifas",          label: "Rates",     icon: Tag },
      { to: "/recursos/products",label: "Products",  icon: Package },
      { to: "/recursos",         label: "Resources", icon: FolderOpen },
      { to: "/recursos/gallery", label: "Gallery",   icon: ImageIcon },
    ],
  },
  {
    label: "Performance",
    items: [
      { to: "/millas",   label: "Miles",   icon: Sparkles },
      { to: "/soporte",  label: "Support", icon: LifeBuoy },
    ],
  },
  {
    items: [
      { to: "/academy",  label: "GO Academy", icon: GraduationCap },
    ],
  },
];

const allItems = groups.flatMap(g => g.items);

const PortalLayout = () => {
  const [open, setOpen] = useState(true);          // desktop collapsed/expanded
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer
  const location = useLocation();
  const navigate = useNavigate();
  const current = allItems.find(n => location.pathname.startsWith(n.to))?.label ?? "Portal";

  const userId = typeof window !== "undefined" ? sessionStorage.getItem("portal:userId") : null;
  const user = getUserById(userId);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const handleSignOut = () => {
    sessionStorage.removeItem("portal:userId");
    navigate("/select-user");
  };

  const SidebarInner = ({ isMobile = false }: { isMobile?: boolean }) => {
    const expanded = isMobile ? true : open;
    return (
      <>
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/5" />

        {/* Brand */}
        <div className="relative h-20 px-4 flex items-center gap-3 border-b border-white/5">
          <div className="h-10 w-10 shrink-0 rounded-xl gradient-brand grid place-items-center shadow-glow">
            <span className="font-display font-bold text-white">G</span>
          </div>
          <div className={cn("overflow-hidden transition-all duration-300 flex-1", expanded ? "opacity-100 w-auto" : "opacity-0 w-0")}>
            <p className="font-display font-bold text-white whitespace-nowrap leading-tight">GO Galápagos</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary-glow whitespace-nowrap">Partner Portal</p>
          </div>
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="h-9 w-9 rounded-lg grid place-items-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="relative flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
          {groups.map((g, gi) => (
            <div key={gi} className="space-y-0.5">
              {g.label && expanded && (
                <p className="px-3 pb-1.5 text-[10px] uppercase tracking-[0.22em] text-white/35 font-medium">{g.label}</p>
              )}
              {g.label && !expanded && gi > 0 && <div className="mx-3 my-2 h-px bg-white/5" />}
              {g.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/welcome"}
                  title={!expanded ? item.label : undefined}
                  className={({ isActive }) => cn(
                    "group relative flex items-center gap-3 h-10 rounded-xl px-3 text-[13px] transition-all duration-300",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2.5px] rounded-r-full bg-primary shadow-glow" />}
                      <item.icon className={cn("h-[17px] w-[17px] shrink-0 transition-colors", isActive && "text-primary-glow")} strokeWidth={1.5} />
                      <span className={cn("whitespace-nowrap transition-all duration-300 flex-1", expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden")}>
                        {item.label}
                      </span>
                      {item.badge && expanded && (
                        <span className="text-[10px] font-bold px-1.5 rounded-md bg-primary/20 text-primary-glow">{item.badge}</span>
                      )}
                      {item.badge && !expanded && (
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                      )}
                      {!expanded && !isMobile && (
                        <span className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-night text-white text-xs whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-elegant z-50 border border-white/10">
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Profile */}
        <div className="relative p-2.5 border-t border-white/5">
          <NavLink to="/perfil" className={({ isActive }) => cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.05] transition-colors",
            !expanded && "justify-center",
            isActive && "bg-white/[0.05]"
          )}>
            <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden ring-2 ring-white/10 shadow-glow">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <div className={cn("flex-1 min-w-0 transition-all", expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden")}>
              <p className="text-[13px] text-white truncate leading-tight">{user.name}</p>
              <p className="text-[11px] text-primary-glow/80 truncate">Andes Travel · {user.tier}</p>
            </div>
            {expanded && (
              <button
                onClick={(e) => { e.preventDefault(); handleSignOut(); }}
                className="text-white/40 hover:text-white shrink-0"
                title="Switch user"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "relative text-white transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 hidden md:flex flex-col shadow-navy",
          open ? "w-[252px]" : "w-[76px]"
        )}
        style={{ background: "var(--gradient-sidebar)" }}
      >
        <SidebarInner />

        {/* Collapse trigger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle sidebar"
          className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-white text-navy grid place-items-center shadow-elegant hover:scale-110 transition-transform z-20 border border-border/60"
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform duration-500", !open && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-night/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] text-white flex flex-col shadow-navy animate-slide-in-left"
            style={{ background: "var(--gradient-sidebar)" }}
          >
            <SidebarInner isMobile />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[64px] md:h-[72px] px-4 md:px-6 lg:px-10 flex items-center justify-between border-b border-border/60 bg-background/85 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden h-10 w-10 rounded-xl bg-secondary/60 hover:bg-secondary grid place-items-center transition-colors"
            >
              <Menu className="h-4.5 w-4.5 text-navy" />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground hidden sm:block">Partner Portal</p>
              <h1 className="font-display text-base md:text-lg font-semibold text-navy leading-tight">{current}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-2.5">
            <div className="hidden md:flex items-center gap-2 h-10 px-3.5 rounded-xl bg-secondary/60 w-[260px] lg:w-[320px] focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-soft transition-all">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground/70 min-w-0" placeholder="Bookings, GO codes, partners…" />
              <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5"><Command className="h-2.5 w-2.5" />K</kbd>
            </div>
            {/* Mobile search */}
            <button
              aria-label="Search"
              className="md:hidden h-10 w-10 rounded-xl bg-secondary/60 hover:bg-secondary grid place-items-center transition-colors"
            >
              <Search className="h-4 w-4 text-navy" />
            </button>
            <button className="relative h-10 w-10 rounded-xl bg-secondary/60 hover:bg-secondary grid place-items-center transition-colors">
              <Bell className="h-4 w-4 text-navy" strokeWidth={1.6} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            </button>
            <div className="h-10 px-3 rounded-xl bg-secondary/60 hidden lg:flex items-center gap-2.5">
              <UserCircle2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-[11px] leading-none text-muted-foreground">Andes Travel</p>
                <p className="text-[12px] leading-tight font-medium text-navy">{user.name}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-10 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
