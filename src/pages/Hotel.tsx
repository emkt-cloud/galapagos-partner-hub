import { Wifi, Coffee, Car, Dumbbell, Utensils, Waves, MapPin, Star, ArrowRight } from "lucide-react";
import suite from "@/assets/hotel-suite.jpg";
import pool from "@/assets/hotel-pool.jpg";
import dining from "@/assets/hotel-dining.jpg";
import quito from "@/assets/quito-hotel.jpg";

const rooms = [
  { name: "Deluxe King",   img: suite,  size: "32 m²", view: "Andes",   rate: 189, partner: 142 },
  { name: "Junior Suite",  img: pool,   size: "48 m²", view: "City",    rate: 249, partner: 187 },
  { name: "Presidential",  img: quito,  size: "85 m²", view: "Pichincha", rate: 489, partner: 367 },
];

const amenities = [
  { icon: Wifi,     label: "High-speed WiFi" },
  { icon: Coffee,   label: "Premium coffee bar" },
  { icon: Utensils, label: "Andean restaurant" },
  { icon: Waves,    label: "Rooftop pool" },
  { icon: Dumbbell, label: "24/7 fitness" },
  { icon: Car,      label: "Airport transfer" },
];

const packages = [
  { title: "Pre-Cruise · 2 nights", desc: "Acclimatize in Quito before sailing", saving: "−18%" },
  { title: "Post-Cruise · 1 night", desc: "Decompress after the islands",         saving: "−12%" },
  { title: "City + Cruise + City",  desc: "Full Ecuador experience",              saving: "−25%" },
];

const Hotel = () => (
  <div className="space-y-8 max-w-[1400px]">
    {/* Hero */}
    <section className="relative overflow-hidden rounded-3xl shadow-navy h-[420px]">
      <img src={quito} alt="GO Quito Hotel" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 text-white max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-4 w-fit">
          <MapPin className="h-3.5 w-3.5 text-primary-glow" />
          <span className="text-xs uppercase tracking-wider">Quito, Ecuador · 2,850 m</span>
        </div>
        <h1 className="font-display text-5xl lg:text-6xl font-light leading-tight">
          GO Quito <span className="font-semibold text-gradient-brand">Hotel</span>
        </h1>
        <p className="text-white/80 mt-3 max-w-lg">An urban sanctuary where the Andes meet contemporary luxury. The perfect prologue or epilogue to your Galápagos journey.</p>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-1 text-warning">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <span className="text-sm text-white/70">128 partner reviews</span>
        </div>
      </div>
    </section>

    {/* Amenities */}
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {amenities.map(a => (
        <div key={a.label} className="premium-card p-4 text-center hover:shadow-glow transition-premium">
          <a.icon className="h-5 w-5 mx-auto text-primary mb-2" strokeWidth={1.5} />
          <p className="text-xs text-navy font-medium">{a.label}</p>
        </div>
      ))}
    </section>

    {/* Rooms */}
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy">Rooms & Rates</h2>
          <p className="text-sm text-muted-foreground">Partner net rates · per room / night</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {rooms.map(r => (
          <div key={r.name} className="premium-card overflow-hidden group">
            <div className="relative h-52 overflow-hidden">
              <img src={r.img} alt={r.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-display text-lg font-semibold">{r.name}</h3>
                <p className="text-xs text-white/80">{r.size} · {r.view} view</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Public</p>
                  <p className="text-sm text-muted-foreground line-through">${r.rate}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Partner net</p>
                  <p className="font-display text-2xl font-semibold text-navy">${r.partner}</p>
                </div>
              </div>
              <button className="w-full h-10 rounded-lg bg-navy text-white text-sm font-medium hover:gradient-brand hover:shadow-glow transition-premium inline-flex items-center justify-center gap-2">
                Add to booking <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Packages */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {packages.map(p => (
        <div key={p.title} className="premium-card p-6 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">{p.saving}</span>
            <h3 className="font-display text-lg font-semibold text-navy mt-3">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            <button className="mt-4 text-xs text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
              See details <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </section>

    {/* Dining strip */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="relative overflow-hidden rounded-3xl h-72 group">
        <img src={dining} alt="Fine dining" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-glow">Gastronomy</p>
          <h3 className="font-display text-2xl font-semibold mt-1">Andean fine dining</h3>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl h-72 group">
        <img src={pool} alt="Rooftop pool" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-glow">Wellness</p>
          <h3 className="font-display text-2xl font-semibold mt-1">Rooftop infinity pool</h3>
        </div>
      </div>
    </section>
  </div>
);

export default Hotel;
