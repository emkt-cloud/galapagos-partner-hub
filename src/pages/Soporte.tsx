import { LifeBuoy, MessageSquare, Phone, Mail, ChevronDown, Send, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const channels = [
  { icon: MessageSquare, title: "Live chat",    desc: "Mon–Sun · 06:00–22:00 ECT", action: "Start chat",  highlight: true },
  { icon: Phone,         title: "Phone",        desc: "+593 2 256 7000 · 24/7",     action: "Call now" },
  { icon: Mail,          title: "Email",        desc: "partners@gogalapagos.com",   action: "Compose" },
];

const faqs = [
  { q: "How long does a hold last?",                       a: "Holds expire automatically after 24 hours. You'll receive an email reminder 4 hours before expiry. Extensions can be requested through your account manager." },
  { q: "What is the cancellation policy?",                 a: "Free cancellation up to 90 days before departure. From 89 to 60 days, 25% penalty. From 59 to 30 days, 50%. Less than 30 days, no refund." },
  { q: "How do I earn miles for my bookings?",             a: "All confirmed and paid bookings automatically earn miles based on cabin type and itinerary. Promotional bonuses apply on top." },
  { q: "Can I combine cruise with hotel?",                 a: "Yes. The Quito + Cruise + Quito combo offers up to 25% off when booking both. See Products for details." },
  { q: "Where do I get marketing assets?",                 a: "All brochures, photography, video and sales decks are in the Resources section, organized by category and language." },
];

const tickets = [
  { id: "TK-2031", subject: "Special meal request · BK-9821", status: "Open",     when: "2h ago" },
  { id: "TK-2028", subject: "Voucher correction · BK-9803",   status: "Resolved", when: "Yesterday" },
  { id: "TK-2014", subject: "Group rate · 24 pax · Coral I",  status: "Resolved", when: "Apr 8" },
];

const Soporte = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-10 shadow-navy">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-4">
              <LifeBuoy className="h-3.5 w-3.5 text-primary-glow" />
              <span className="text-xs uppercase tracking-wider">Support · 24/7</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-light leading-tight">
              How can we <span className="font-semibold">help you?</span>
            </h1>
            <p className="text-white/70 mt-3 max-w-md">Your dedicated partner team is one click away — average reply under 12 minutes.</p>
          </div>
          <div className="hidden lg:flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
            <div className="h-12 w-12 rounded-full gradient-brand grid place-items-center font-display font-bold">CV</div>
            <div>
              <p className="text-xs text-white/60">Your account manager</p>
              <p className="font-medium">Carolina Vinueza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {channels.map(c => (
          <div key={c.title} className={`premium-card p-6 group ${c.highlight ? "ring-2 ring-primary/30" : ""}`}>
            <div className={`h-12 w-12 rounded-xl grid place-items-center mb-4 ${c.highlight ? "gradient-brand text-white shadow-glow" : "bg-accent text-primary"}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-navy">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            <button className={`mt-5 w-full h-10 rounded-lg text-sm font-medium transition-premium ${c.highlight ? "gradient-brand text-white hover:shadow-glow" : "bg-secondary text-navy hover:gradient-brand hover:text-white"}`}>
              {c.action}
            </button>
          </div>
        ))}
      </section>

      {/* FAQ + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 premium-card p-6">
          <h3 className="font-display text-xl font-semibold text-navy mb-4">Frequently asked</h3>
          <div className="divide-y divide-border">
            {faqs.map((f, i) => (
              <button
                key={f.q}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left py-4 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-navy group-hover:text-primary transition-colors">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
                </div>
                {openIdx === i && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed animate-fade-up">{f.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="font-display text-lg font-semibold text-navy mb-4">Open a ticket</h3>
          <div className="space-y-3">
            <input className="w-full h-10 px-4 rounded-lg bg-secondary border border-transparent focus:border-primary/40 outline-none text-sm" placeholder="Subject" />
            <select className="w-full h-10 px-4 rounded-lg bg-secondary border border-transparent focus:border-primary/40 outline-none text-sm text-navy">
              <option>Booking issue</option>
              <option>Rates</option>
              <option>Marketing assets</option>
              <option>Other</option>
            </select>
            <textarea rows={4} className="w-full p-4 rounded-lg bg-secondary border border-transparent focus:border-primary/40 outline-none text-sm resize-none" placeholder="Describe your request..." />
            <button className="w-full h-10 rounded-lg gradient-brand text-white text-sm font-medium inline-flex items-center justify-center gap-2 hover:shadow-glow transition-premium">
              <Send className="h-3.5 w-3.5" /> Submit ticket
            </button>
          </div>
        </div>
      </section>

      {/* Recent tickets */}
      <section className="premium-card p-6">
        <h3 className="font-display text-lg font-semibold text-navy mb-5">Recent tickets</h3>
        <div className="divide-y divide-border">
          {tickets.map(t => (
            <div key={t.id} className="py-3.5 flex items-center gap-4">
              <div className={`h-9 w-9 rounded-lg grid place-items-center ${t.status === "Open" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                {t.status === "Open" ? <Clock className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.id} · {t.when}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.status === "Open" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Soporte;
