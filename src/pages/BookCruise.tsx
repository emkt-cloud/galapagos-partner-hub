import { Link } from "react-router-dom";
import { Mountain, Ship as ShipIcon, ArrowRight } from "lucide-react";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";

const choices = [
  {
    to: "/recursos/services/best-sellers",
    title: "Cruise Packages",
    desc: "Galapagos cruise + mainland combos. Highest converting journeys.",
    icon: ShipIcon,
    cover: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    to: "/recursos/services/mainland",
    title: "Mainland Tours",
    desc: "Half-day to multi-day excursions across Quito and Otavalo.",
    icon: Mountain,
    cover: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1600&q=80",
  },
];

const BookCruise = ({ landDefault = false }: { landDefault?: boolean }) => (
  <div className="space-y-6 max-w-[1400px]">
    <ResourceBreadcrumb items={[{ label: landDefault ? "Book Land Tours" : "Book a Cruise" }]} />
    <div>
      <h2 className="font-display text-2xl font-bold text-navy">{landDefault ? "Book Land Tours" : "Book a Cruise"}</h2>
      <p className="text-sm text-muted-foreground">
        {landDefault
          ? "Pick a mainland tour and start a quote — your client receives a Q-code instantly."
          : "Pick a cruise package and start a quote — your client receives a Q-code instantly."}
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {(landDefault ? [choices[1]] : choices).map(c => (
        <Link
          key={c.to}
          to={c.to}
          className="group relative overflow-hidden rounded-3xl h-72 shadow-soft hover:shadow-elegant transition-all duration-500"
        >
          <img src={c.cover} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/90 via-navy/50 to-transparent" />
          <div className="relative h-full p-7 flex flex-col justify-between text-white">
            <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center border border-white/25">
              <c.icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">{c.title}</h3>
              <p className="text-white/75 text-sm mt-2 max-w-md">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all">
                Browse <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export const BookCruisePage = () => <BookCruise />;
export const BookLandPage = () => <BookCruise landDefault />;
export default BookCruise;
