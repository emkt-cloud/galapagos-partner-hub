import { LifeBuoy, Phone, Mail, Clock, MessageSquare } from "lucide-react";

const Soporte = () => (
  <div className="space-y-8 max-w-[1100px]">
    <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-10 shadow-navy">
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-4">
          <LifeBuoy className="h-3.5 w-3.5 text-primary-glow" />
          <span className="text-xs uppercase tracking-wider">Support · 24/7</span>
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-light leading-tight">
          We're here, <span className="font-semibold">around the clock</span>.
        </h1>
        <p className="text-white/75 mt-3 max-w-md">Reach the GO Galapagos team any time, any day.</p>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <a href="tel:+593999456205" className="premium-card p-7 group hover:shadow-elegant transition-premium relative overflow-hidden">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-start gap-5">
          <div className="h-14 w-14 rounded-2xl gradient-brand grid place-items-center text-white shadow-glow">
            <Phone className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary">24/7 On-Tour Assistance</p>
            <p className="font-display text-2xl font-semibold text-navy mt-1.5">+593 99 945 6205</p>
            <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Available 24 hours · 7 days a week
            </p>
            <span className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-secondary text-navy text-sm font-medium group-hover:gradient-brand group-hover:text-white transition-premium">
              <Phone className="h-3.5 w-3.5" /> Call now
            </span>
          </div>
        </div>
      </a>

      <a href="mailto:sales2@gogalapagos.com" className="premium-card p-7 group hover:shadow-elegant transition-premium relative overflow-hidden">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-ocean/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-start gap-5">
          <div className="h-14 w-14 rounded-2xl bg-ocean grid place-items-center text-white shadow-glow">
            <Mail className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ocean">Email</p>
            <p className="font-display text-2xl font-semibold text-navy mt-1.5 break-all">sales2@gogalapagos.com</p>
            <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" /> Average reply under 12 minutes
            </p>
            <span className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-secondary text-navy text-sm font-medium group-hover:bg-ocean group-hover:text-white transition-premium">
              <Mail className="h-3.5 w-3.5" /> Compose email
            </span>
          </div>
        </div>
      </a>
    </section>
  </div>
);

export default Soporte;
