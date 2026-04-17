import { Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarCheck, CalendarRange, FolderOpen,
  Sparkles, Tag, Ship, Hotel, LifeBuoy, ArrowUpRight
} from "lucide-react";
import welcomeBg from "@/assets/welcome-bg.jpg";

const tiles = [
  { to: "/dashboard",     icon: LayoutDashboard, title: "Dashboard",        desc: "Resumen comercial en tiempo real" },
  { to: "/reservas",      icon: CalendarCheck,   title: "Reservas",         desc: "Crea, confirma y gestiona holds" },
  { to: "/disponibilidad",icon: CalendarRange,   title: "Disponibilidad",   desc: "Cabinas y salidas en vivo" },
  { to: "/recursos",      icon: FolderOpen,      title: "Recursos",         desc: "Brochures, fotos y deck de ventas" },
  { to: "/millas",        icon: Sparkles,        title: "Millas e Incentivos", desc: "Tu nivel y beneficios exclusivos" },
  { to: "/tarifas",       icon: Tag,             title: "Tarifas & Promos", desc: "Vigencias y campañas activas" },
  { to: "/flota",         icon: Ship,            title: "Flota & Itinerarios", desc: "Legend, Coral I y Coral II" },
  { to: "/hotel",         icon: Hotel,           title: "GO Quito Hotel",   desc: "Pre y post crucero" },
  { to: "/soporte",       icon: LifeBuoy,        title: "Soporte",          desc: "Tu equipo dedicado, siempre" },
];

const Welcome = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <img src={welcomeBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background to-background" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-ocean/20 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-16 lg:mb-20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center shadow-glow">
              <span className="text-white font-display font-bold">G</span>
            </div>
            <div>
              <p className="font-display font-bold text-navy">GO Galápagos</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Partner Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-sm text-muted-foreground">Andes Travel · Premium Partner</span>
            <div className="h-10 w-10 rounded-full gradient-ocean grid place-items-center text-white text-sm font-semibold shadow-soft">CR</div>
          </div>
        </header>

        {/* Greeting */}
        <div className="max-w-3xl mb-12 lg:mb-16 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-primary mb-5 inline-flex items-center gap-2">
            <span className="h-px w-10 bg-primary" /> Welcome Hub
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-navy leading-[1.05] mb-6">
            Bienvenida, <span className="font-semibold text-gradient-brand">Camila</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Tu espacio para gestionar reservas, disponibilidad y herramientas comerciales de GO Galápagos.
          </p>
        </div>

        {/* Quick access tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiles.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative premium-card p-7 overflow-hidden animate-fade-up"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-ocean/5 transition-all duration-500" />
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-accent grid place-items-center text-ocean group-hover:gradient-brand group-hover:text-white transition-all duration-500">
                  <t.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="relative">
                <h3 className="font-display text-lg font-semibold text-navy mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center text-xs text-muted-foreground animate-fade-in">
          Sesión segura · Última actividad hoy a las 09:42
        </div>
      </div>
    </div>
  );
};

export default Welcome;
