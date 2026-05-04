import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import heroImg from "@/assets/login-hero.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/select-user"), 900);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Hero visual */}
      <div className="relative hidden lg:flex lg:w-[58%] overflow-hidden">
        <img src={heroImg} alt="Galapagos premium expedition yacht at sunset" className="absolute inset-0 h-full w-full object-cover scale-105 animate-[float_12s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-br from-night/80 via-navy/40 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-14 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center shadow-glow">
              <span className="font-display font-bold text-lg">G</span>
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold tracking-tight">GO Galapagos</p>
              <p className="text-xs text-white/60 uppercase tracking-[0.2em]">Partner Portal</p>
            </div>
          </div>

          <div className="max-w-md animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-glow mb-4">Luxury Expeditions</p>
            <h1 className="font-display text-5xl font-light leading-[1.1] mb-4">
              Where the ocean <span className="italic text-primary-glow">awakens</span> business.
            </h1>
            <p className="text-white/70 text-sm leading-relaxed">
              A space designed for our commercial partners. Availability, bookings and business intelligence — all in one place.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-white/50">
            <span>© {new Date().getFullYear()} GO Galapagos</span>
            <span>Galapagos Legend · Coral I · Coral II</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-40 pointer-events-none" />

        <div className="w-full max-w-md relative animate-fade-up">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center">
              <span className="text-white font-display font-bold">G</span>
            </div>
            <span className="font-display font-bold">GO Galapagos</span>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Partner Portal</p>
          <h2 className="font-display text-4xl font-semibold text-navy mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-10">Sign in with your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="text-xs font-medium text-navy/70 uppercase tracking-wider">Username</label>
              <div className="relative mt-2">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="text"
                  defaultValue="camila.rivas"
                  className="w-full h-14 pl-11 pr-4 rounded-xl bg-secondary/60 border border-transparent focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/10 outline-none transition-premium text-navy"
                  placeholder="your.username"
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-navy/70 uppercase tracking-wider">Password</label>
                <Link to="#" className="text-xs text-primary hover:text-ocean transition-colors">Forgot password</Link>
              </div>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type={show ? "text" : "password"}
                  defaultValue="••••••••••"
                  className="w-full h-14 pl-11 pr-12 rounded-xl bg-secondary/60 border border-transparent focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/10 outline-none transition-premium text-navy"
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-14 rounded-xl gradient-brand text-white font-medium overflow-hidden shadow-glow hover:shadow-elegant transition-premium disabled:opacity-70"
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {loading ? "Signing in…" : "Sign in"}
                {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>Exclusive access for partners</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              System operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
