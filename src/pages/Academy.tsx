import { GraduationCap, PlayCircle, FileText, Trophy, Sparkles, Lock, Clock } from "lucide-react";

const tracks = [
  { title: "Brand Foundations",       lessons: 6, mins: 45, level: "Starter",      icon: Sparkles, color: "from-primary to-ocean" },
  { title: "Galapagos Legend Mastery", lessons: 8, mins: 90, level: "Intermediate", icon: PlayCircle, color: "from-ocean to-navy" },
  { title: "Coral Yachts Selling Skills", lessons: 5, mins: 60, level: "Intermediate", icon: PlayCircle, color: "from-primary-glow to-primary" },
  { title: "Mainland Tours & Karanki",   lessons: 7, mins: 70, level: "Advanced",     icon: FileText, color: "from-warning to-destructive" },
  { title: "Operations 101 (T- & Q- codes)", lessons: 4, mins: 30, level: "Starter", icon: FileText, color: "from-navy to-night" },
  { title: "Closing & Upselling",        lessons: 6, mins: 55, level: "Advanced",     icon: Trophy,    color: "from-success to-primary" },
];

const Academy = () => (
  <div className="space-y-8 max-w-[1400px]">
    {/* Hero */}
    <section className="relative overflow-hidden rounded-3xl gradient-ocean text-white p-8 lg:p-12 shadow-navy">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
      <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-3">
            <GraduationCap className="h-3.5 w-3.5 text-primary-glow" />
            <span className="text-[11px] uppercase tracking-[0.22em]">GO Academy</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-light leading-tight">
            Become a <span className="font-semibold">GO Galapagos expert</span>.
          </h1>
          <p className="text-white/75 text-sm mt-3 max-w-lg">
            Videos, documents, gamified quizzes and certifications — everything you need to sell our products with confidence.
          </p>
        </div>
        <div className="flex gap-2.5">
          <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center">
            <p className="text-[10px] uppercase tracking-wider opacity-70">Tracks</p>
            <p className="font-display text-2xl font-semibold">6</p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center">
            <p className="text-[10px] uppercase tracking-wider opacity-70">Lessons</p>
            <p className="font-display text-2xl font-semibold">36</p>
          </div>
        </div>
      </div>
    </section>

    {/* Tracks */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tracks.map((t, i) => (
        <div key={t.title} className="premium-card p-0 overflow-hidden group">
          <div className={`relative h-32 bg-gradient-to-br ${t.color}`}>
            <div className="absolute inset-0 grid place-items-center">
              <t.icon className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
            </div>
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-white font-semibold">
              {t.level}
            </span>
            {i > 2 && (
              <span className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/15 backdrop-blur grid place-items-center">
                <Lock className="h-3.5 w-3.5 text-white/80" />
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-base font-semibold text-navy">{t.title}</h3>
            <div className="mt-2 flex items-center gap-3 text-[11.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><PlayCircle className="h-3 w-3" /> {t.lessons} lessons</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {t.mins} min</span>
            </div>
            <button className="mt-4 w-full h-10 rounded-lg gradient-brand text-white text-[12.5px] font-medium hover:shadow-glow transition-premium">
              {i > 2 ? "Unlock track" : "Start learning"}
            </button>
          </div>
        </div>
      ))}
    </section>

    <section className="premium-card p-6 flex items-center gap-4">
      <Trophy className="h-10 w-10 text-warning" />
      <div className="flex-1">
        <p className="font-display font-semibold text-navy">Earn the GO Specialist badge</p>
        <p className="text-sm text-muted-foreground">Complete the 6 tracks and unlock a 2% bonus commission for the rest of the year.</p>
      </div>
    </section>
  </div>
);

export default Academy;
