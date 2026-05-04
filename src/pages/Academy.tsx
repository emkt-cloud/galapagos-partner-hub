import { GraduationCap, PlayCircle, FileText, Gamepad2, BookOpen, Award, ArrowRight } from "lucide-react";

const tracks = [
  { icon: PlayCircle, title: "Brand Essentials", desc: "Who we are and what we stand for", lessons: 8, kind: "Video course" },
  { icon: BookOpen,   title: "Galapagos Legend Mastery", desc: "Decks, cabins, itineraries A/B/C", lessons: 12, kind: "Video + Docs" },
  { icon: BookOpen,   title: "Coral I & II Masterclass", desc: "Selling the boutique yacht experience", lessons: 9, kind: "Video + Docs" },
  { icon: FileText,   title: "Mainland Tours Playbook", desc: "Quito, Otavalo & combos", lessons: 6, kind: "Documents" },
  { icon: Gamepad2,   title: "Sales Simulator", desc: "Interactive client scenarios", lessons: 5, kind: "Interactive" },
  { icon: Award,      title: "Certification Exam", desc: "Earn your GO Galapagos Expert badge", lessons: 1, kind: "Exam" },
];

const Academy = () => (
  <div className="space-y-8 max-w-[1400px]">
    <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-12">
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
      <div className="relative flex items-start gap-5">
        <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur grid place-items-center border border-white/20">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary-glow">GO Academy</p>
          <h1 className="font-display text-3xl lg:text-4xl font-light leading-tight mt-1">
            Become a <span className="font-semibold">GO Galapagos Expert</span>
          </h1>
          <p className="text-white/75 mt-3 max-w-xl text-sm">
            Videos, documents, courses and interactive games to master our brand and products.
          </p>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tracks.map((t, i) => (
        <div key={t.title} className="premium-card p-6 group cursor-pointer hover:shadow-elegant transition-premium" style={{ animationDelay: `${i*60}ms` }}>
          <div className="flex items-start justify-between mb-4">
            <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center text-white shadow-glow">
              <t.icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-secondary text-muted-foreground">{t.kind}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-navy">{t.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{t.lessons} {t.lessons === 1 ? "module" : "lessons"}</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium group-hover:gap-3 transition-all">
              Start <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      ))}
    </section>
  </div>
);

export default Academy;
