import { Phone, Mail, Clock, MessageSquare, Globe } from "lucide-react";

const Soporte = () => (
  <div className="space-y-6 max-w-[1100px]">
    {/* Hero */}
    <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-10 shadow-navy">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-3">
          <Clock className="h-3.5 w-3.5 text-primary-glow" />
          <span className="text-[11px] uppercase tracking-[0.22em]">24/7 On-Tour Assistance</span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-light leading-tight">
          We're here <span className="font-semibold">whenever you need us</span>.
        </h1>
        <p className="text-white/75 text-sm mt-3 max-w-lg">
          Direct line to GO Galapagos sales & operations team — for active bookings, on-tour incidents and partner support.
        </p>
      </div>
    </section>

    {/* Contact cards */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <a
        href="tel:+593999456205"
        className="premium-card p-7 group flex items-center gap-5"
      >
        <div className="h-14 w-14 rounded-2xl gradient-brand grid place-items-center text-white shadow-glow">
          <Phone className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary">24/7 Hotline</p>
          <p className="font-display text-xl font-semibold text-navy mt-1">+593 99 945 6205</p>
          <p className="text-sm text-muted-foreground mt-1">On-tour assistance · WhatsApp & calls</p>
        </div>
      </a>

      <a
        href="mailto:sales2@gogalapagos.com"
        className="premium-card p-7 group flex items-center gap-5"
      >
        <div className="h-14 w-14 rounded-2xl bg-accent grid place-items-center text-ocean">
          <Mail className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary">Sales & Reservations</p>
          <p className="font-display text-xl font-semibold text-navy mt-1">sales2@gogalapagos.com</p>
          <p className="text-sm text-muted-foreground mt-1">Quotes, modifications, group rates</p>
        </div>
      </a>
    </section>

    <section className="premium-card p-7">
      <h3 className="font-display text-lg font-semibold text-navy mb-4 inline-flex items-center gap-2">
        <Globe className="h-4 w-4 text-primary" /> Office hours · Quito (ECT, GMT-5)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-xl bg-secondary/40">
          <p className="font-medium text-navy">Mon – Fri</p>
          <p className="text-muted-foreground">08:00 – 18:00</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/40">
          <p className="font-medium text-navy">Saturday</p>
          <p className="text-muted-foreground">09:00 – 14:00</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/10">
          <p className="font-medium text-primary">On-Tour Hotline</p>
          <p className="text-primary/80">24 / 7 · Year-round</p>
        </div>
      </div>
    </section>
  </div>
);

export default Soporte;
