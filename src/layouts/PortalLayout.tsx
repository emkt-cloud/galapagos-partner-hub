import { useState } from "react";
import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarCheck, CalendarRange, Ship, Hotel, Package,
  Tag, FolderOpen, Sparkles, BarChart3, LifeBuoy, ChevronLeft, Search, Bell, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard",      label: "Dashboard",       icon: LayoutDashboard },
  { to: "/reservas",       label: "Reservas",        icon: CalendarCheck },
  { to: "/disponibilidad", label: "Disponibilidad",  icon: CalendarRange },
  { to: "/flota",          label: "Flota & Itinerarios", icon: Ship },
  { to: "/hotel",          label: "GO Quito Hotel",  icon: Hotel },
  { to: "/paquetes",       label: "Paquetes",        icon: Package },
  { to: "/tarifas",        label: "Tarifas",         icon: Tag },
  { to: "/recursos",       label: "Recursos",        icon: FolderOpen },
  { to: "/millas",         label: "Millas",          icon: Sparkles },
  { to: "/reportes",       label: "Reportes",        icon: BarChart3 },
  { to: "/soporte",        label: "Soporte",         icon: LifeBuoy },
];

const PortalLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const current = nav.find(n => location.pathname.startsWith(n.to))?.label ?? "Portal";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative bg-gradient-ocean text-white transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 flex flex-col shadow-navy",
          open ? "w-[260px]" : "w-[78px]"
        )}
        style={{ background: "var(--gradient-sidebar)" }}
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-60" />

        {/* Brand */}
        <div className="relative h-20 px-5 flex items-center gap-3 border-b border-white/5">
          <div className="h-10 w-10 shrink-0 rounded-xl gradient-brand grid place-items-center shadow-glow">
            <span className="font-display font-bold text-white">G</span>
          </div>
          <div className={cn("overflow-hidden transition-all duration-300", open ? "opacity-100 w-auto" : "opacity-0 w-0")}>
            <p className="font-display font-bold text-white whitespace-nowrap">GO Galápagos</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary-glow whitespace-nowrap">Partner Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 overflow-y-auto py-5 px-3 space-y-1">
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              title={!open ? item.label : undefined}
              className={({ isActive }) => cn(
                "group relative flex items-center gap-3 h-11 rounded-xl px-3 text-sm transition-all duration-300",
                isActive
                  ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-primary shadow-glow" />}
                  <item.icon className={cn("h-[18px] w-[18px] shrink-0 transition-colors", isActive && "text-primary-glow")} strokeWidth={1.6} />
                  <span className={cn("whitespace-nowrap transition-all duration-300", open ? "opacity-100" : "opacity-0 w-0 overflow-hidden")}>
                    {item.label}
                  </span>
                  {!open && (
                    <span className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-night text-white text-xs whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-elegant z-50">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile */}
        <div className="relative p-3 border-t border-white/5">
          <div className={cn("flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer", !open && "justify-center")}>
            <div className="h-9 w-9 shrink-0 rounded-full gradient-brand grid place-items-center text-white text-xs font-semibold">CR</div>
            <div className={cn("flex-1 min-w-0 transition-all", open ? "opacity-100" : "opacity-0 w-0 overflow-hidden")}>
              <p className="text-sm text-white truncate">Camila Rivas</p>
              <p className="text-[11px] text-white/50 truncate">Andes Travel</p>
            </div>
            {open && <Link to="/" className="text-white/40 hover:text-white"><LogOut className="h-4 w-4" /></Link>}
          </div>
        </div>

        {/* Collapse trigger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle sidebar"
          className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-white text-navy grid place-items-center shadow-elegant hover:scale-110 transition-transform z-20"
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform duration-500", !open && "rotate-180")} />
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-6 lg:px-10 flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Portal</p>
            <h1 className="font-display text-xl font-semibold text-navy">{current}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 h-11 px-4 rounded-xl bg-secondary/60 w-72 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 transition-premium">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input className="bg-transparent outline-none text-sm flex-1" placeholder="Buscar reservas, partners…" />
              <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
            <button className="relative h-11 w-11 rounded-xl bg-secondary/60 hover:bg-secondary grid place-items-center transition-colors">
              <Bell className="h-4 w-4 text-navy" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            </button>
            <div className="h-11 w-11 rounded-xl gradient-ocean grid place-items-center text-white text-xs font-semibold shadow-soft">CR</div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
