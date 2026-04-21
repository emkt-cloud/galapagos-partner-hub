import { useNavigate } from "react-router-dom";
import { ArrowRight, UserPlus } from "lucide-react";
import { users, type PortalUser } from "@/data/users";
import welcomeBg from "@/assets/welcome-bg.jpg";

const tierStyles: Record<PortalUser["tier"], string> = {
  Elite: "bg-primary/10 text-primary border-primary/20",
  Platinum: "bg-ocean/10 text-ocean border-ocean/20",
  Gold: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Silver: "bg-muted text-muted-foreground border-border",
};

const SelectUser = () => {
  const navigate = useNavigate();

  const choose = (id: string) => {
    sessionStorage.setItem("portal:userId", id);
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <img src={welcomeBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-ocean/25 blur-[150px]" />
        <div className="absolute inset-0 grid-luxe opacity-[0.3]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        {/* Header */}
        <header className="flex items-center justify-between mb-14 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center shadow-glow">
              <span className="text-white font-display font-bold">G</span>
            </div>
            <div>
              <p className="font-display font-bold text-navy leading-tight">GO Galápagos</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Partner Portal</p>
            </div>
          </div>
          <span className="hidden md:inline-flex items-center gap-2 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Andes Travel · </span>
            <span className="text-primary font-semibold">Elite Partner</span>
          </span>
        </header>

        {/* Greeting */}
        <div className="max-w-3xl mb-12 animate-fade-up">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-5 inline-flex items-center gap-2">
            <span className="h-px w-10 bg-primary" /> Choose your profile
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-navy leading-[1.05] mb-5 tracking-tight">
            Who's <span className="font-semibold text-gradient-brand">signing in</span>?
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Select your team profile to access your personalized dashboard, commissions and tools.
          </p>
        </div>

        {/* User grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {users.map((u, i) => (
            <button
              key={u.id}
              onClick={() => choose(u.id)}
              style={{ animationDelay: `${120 + i * 70}ms` }}
              className="group relative premium-card p-0 overflow-hidden text-left animate-fade-up hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={u.avatar}
                  alt={u.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-md ${tierStyles[u.tier]}`}>
                  {u.tier}
                </span>
              </div>

              <div className="relative p-5">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="font-display text-lg font-semibold text-navy mb-0.5 leading-tight">
                  {u.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">{u.role}</p>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Commission</p>
                    <p className="font-display text-lg font-semibold text-navy mt-0.5">{u.commission}%</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    <span className="text-[11px] font-medium">Enter</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Add user tile */}
          <button
            style={{ animationDelay: `${120 + users.length * 70}ms` }}
            className="group relative rounded-2xl border-2 border-dashed border-border/80 hover:border-primary/40 p-6 grid place-items-center min-h-[280px] animate-fade-up transition-colors"
          >
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-xl bg-accent grid place-items-center text-ocean mb-4 group-hover:gradient-brand group-hover:text-white transition-all">
                <UserPlus className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <p className="font-display font-semibold text-navy text-sm">Add team member</p>
              <p className="text-xs text-muted-foreground mt-1">Invite a colleague</p>
            </div>
          </button>
        </div>

        <div className="mt-12 flex items-center justify-between text-xs text-muted-foreground animate-fade-in">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
            ← Sign out
          </button>
          <span className="hidden md:inline">v2026.04 · Premium experience</span>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;
