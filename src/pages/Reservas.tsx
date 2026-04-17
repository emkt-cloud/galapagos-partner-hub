import { useState } from "react";
import { Ship, Calendar, Users, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  { id: "legend", name: "Galapagos Legend", desc: "100 pax · 5 cubiertas",  price: "$3,890" },
  { id: "coral1", name: "Coral I",          desc: "36 pax · íntimo",         price: "$3,240" },
  { id: "coral2", name: "Coral II",         desc: "20 pax · exclusivo",      price: "$3,540" },
  { id: "hotel",  name: "GO Quito Hotel",   desc: "Pre/post crucero",        price: "$280" },
];

const cabins = [
  { name: "Suite Premium",   feat: "Balcón privado · 28m²", price: "$4,890", left: 2 },
  { name: "Junior Suite",    feat: "Vista panorámica · 22m²", price: "$3,890", left: 6 },
  { name: "Cabina Standard", feat: "Confort completo · 18m²", price: "$3,290", left: 12 },
];

const Reservas = () => {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState("legend");
  const [cabin, setCabin] = useState("");

  return (
    <div className="max-w-5xl space-y-8">
      {/* Stepper */}
      <div className="flex items-center gap-3">
        {[1,2,3].map(n => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <div className={cn("h-9 w-9 rounded-full grid place-items-center text-sm font-medium transition-all",
              n < step ? "gradient-brand text-white" : n === step ? "bg-navy text-white shadow-glow" : "bg-secondary text-muted-foreground"
            )}>
              {n < step ? <Check className="h-4 w-4" /> : n}
            </div>
            <div className="flex-1">
              <p className={cn("text-sm font-medium", n <= step ? "text-navy" : "text-muted-foreground")}>
                {["Producto & fecha","Cabina & pasajeros","Confirmar"][n-1]}
              </p>
            </div>
            {n < 3 && <div className={cn("h-px flex-1", n < step ? "bg-primary" : "bg-border")} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="premium-card p-8 animate-fade-up">
          <h2 className="font-display text-2xl font-semibold text-navy mb-2">Selecciona el producto</h2>
          <p className="text-muted-foreground mb-6">Elige la experiencia que tu cliente desea vivir.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setProduct(p.id)}
                className={cn(
                  "text-left p-5 rounded-2xl border-2 transition-premium relative overflow-hidden",
                  product === p.id ? "border-primary bg-accent shadow-glow" : "border-border bg-card hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-white grid place-items-center text-ocean shadow-soft">
                    <Ship className="h-4 w-4" />
                  </div>
                  {product === p.id && <span className="h-6 w-6 rounded-full gradient-brand grid place-items-center"><Check className="h-3 w-3 text-white" /></span>}
                </div>
                <p className="font-display font-semibold text-navy">{p.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{p.desc}</p>
                <p className="text-sm text-primary font-medium">desde {p.price}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-navy/70 font-medium">Fecha de salida</label>
              <div className="relative mt-2">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="date" defaultValue="2025-04-22" className="w-full h-13 py-3.5 pl-11 pr-4 rounded-xl bg-secondary/60 border border-transparent focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/10 outline-none transition-premium text-navy" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-navy/70 font-medium">Duración</label>
              <select className="w-full h-[52px] mt-2 px-4 rounded-xl bg-secondary/60 border border-transparent focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/10 outline-none transition-premium text-navy">
                <option>5 noches · Itinerario A</option>
                <option>4 noches · Itinerario B</option>
                <option>7 noches · Combinado</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button onClick={() => setStep(2)} className="h-12 px-6 rounded-xl gradient-brand text-white font-medium inline-flex items-center gap-2 shadow-glow hover:shadow-elegant transition-premium">
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="premium-card p-8 animate-fade-up">
          <h2 className="font-display text-2xl font-semibold text-navy mb-2">Cabina y pasajeros</h2>
          <p className="text-muted-foreground mb-6">Selecciona la categoría y el número de huéspedes.</p>

          <div className="space-y-3 mb-8">
            {cabins.map(c => (
              <button key={c.name} onClick={() => setCabin(c.name)} className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-premium text-left",
                cabin === c.name ? "border-primary bg-accent" : "border-border bg-card hover:border-primary/40"
              )}>
                <div className="h-12 w-12 rounded-xl gradient-ocean grid place-items-center text-white shadow-soft"><Ship className="h-5 w-5" /></div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-navy">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.feat}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-semibold text-navy">{c.price}</p>
                  <p className={cn("text-xs", c.left <= 3 ? "text-destructive" : c.left <= 6 ? "text-warning" : "text-success")}>{c.left} disponibles</p>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Adultos","Niños","Infantes"].map((l,i) => (
              <div key={l}>
                <label className="text-xs uppercase tracking-wider text-navy/70 font-medium">{l}</label>
                <div className="relative mt-2">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="number" defaultValue={i===0?2:0} className="w-full h-[52px] pl-11 pr-4 rounded-xl bg-secondary/60 border border-transparent focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/10 outline-none transition-premium text-navy" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(1)} className="h-12 px-5 rounded-xl text-navy hover:bg-secondary inline-flex items-center gap-2 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>
            <button onClick={() => setStep(3)} className="h-12 px-6 rounded-xl gradient-brand text-white font-medium inline-flex items-center gap-2 shadow-glow transition-premium">
              Cotizar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-up">
          <div className="lg:col-span-2 premium-card p-8">
            <h2 className="font-display text-2xl font-semibold text-navy mb-6">Confirmar reserva</h2>
            <dl className="divide-y divide-border/60">
              {[
                ["Producto", "Galapagos Legend"],
                ["Itinerario", "Itinerario A · 5 noches"],
                ["Salida", "22 Abril 2025"],
                ["Cabina", cabin || "Suite Premium"],
                ["Pasajeros", "2 adultos"],
                ["Cliente", "—"],
              ].map(([k,v]) => (
                <div key={k} className="py-3 flex justify-between">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-medium text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="premium-card p-8 h-fit">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Total</p>
            <p className="font-display text-4xl font-semibold text-gradient-brand mt-1">$9,780</p>
            <p className="text-xs text-muted-foreground mt-1">Comisión partner: $1,467</p>
            <div className="mt-6 space-y-2">
              <button className="w-full h-12 rounded-xl gradient-brand text-white font-medium shadow-glow hover:shadow-elegant transition-premium">Confirmar reserva</button>
              <button className="w-full h-12 rounded-xl border border-border text-navy hover:bg-secondary transition-colors">Dejar en hold 24h</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
