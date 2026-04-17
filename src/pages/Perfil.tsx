import { Building2, Mail, Phone, MapPin, Globe, Shield, Bell, Key, LogOut, Trophy } from "lucide-react";

const stats = [
  { label: "Member since",  value: "2021" },
  { label: "Tier",          value: "Platinum" },
  { label: "Total miles",   value: "48,250" },
  { label: "Bookings",      value: "342" },
];

const settings = [
  { icon: Bell,   title: "Notifications",  desc: "Email and in-app preferences" },
  { icon: Key,    title: "Password",       desc: "Last changed 3 months ago" },
  { icon: Shield, title: "Two-factor auth", desc: "SMS + authenticator app", status: "Enabled" },
  { icon: Globe,  title: "Language",       desc: "English (US)" },
];

const Perfil = () => (
  <div className="space-y-6 max-w-[1200px]">
    {/* Header card */}
    <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 shadow-navy">
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-primary-glow/20 blur-[60px] animate-float" />
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="h-24 w-24 rounded-3xl gradient-brand grid place-items-center font-display text-3xl font-bold shadow-glow">CV</div>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-2">
            <Trophy className="h-3 w-3 text-primary-glow" />
            <span className="text-[10px] uppercase tracking-wider">Platinum partner</span>
          </div>
          <h1 className="font-display text-4xl font-semibold">Camila Vinueza</h1>
          <p className="text-white/70 mt-1">Senior Sales Executive · Andean Travel Co.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> camila@andeantravel.com</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +593 99 234 5678</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Quito, Ecuador</span>
          </div>
        </div>
        <button className="h-10 px-5 rounded-xl bg-white/10 backdrop-blur border border-white/15 text-sm font-medium hover:bg-white/20 transition-colors">
          Edit profile
        </button>
      </div>
    </section>

    {/* Stats */}
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="premium-card p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          <p className="font-display text-2xl font-semibold text-navy mt-1">{s.value}</p>
        </div>
      ))}
    </section>

    {/* Agency + Settings */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="premium-card p-6">
        <h3 className="font-display text-lg font-semibold text-navy mb-5 inline-flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" /> Agency
        </h3>
        <dl className="space-y-3 text-sm">
          {[
            ["Company name", "Andean Travel Co."],
            ["Tax ID",       "1791234567001"],
            ["IATA",         "12345678"],
            ["Country",      "Ecuador"],
            ["Address",      "Av. Amazonas N34-451 · Quito"],
            ["Currency",     "USD"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 border-b border-border last:border-0">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="premium-card p-6">
        <h3 className="font-display text-lg font-semibold text-navy mb-5">Account settings</h3>
        <div className="divide-y divide-border">
          {settings.map(s => (
            <button key={s.title} className="w-full py-3.5 flex items-center gap-4 group text-left">
              <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy group-hover:text-primary transition-colors">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              {s.status && <span className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">{s.status}</span>}
            </button>
          ))}
        </div>
        <button className="mt-5 w-full h-10 rounded-lg border border-destructive/20 text-destructive text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-premium">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </section>
  </div>
);

export default Perfil;
