import { Info, Sparkles, TrendingUp, Award } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { PortalUser } from "@/data/users";

const tierBenefits: Record<PortalUser["tier"], string[]> = {
  Elite:    ["14% commission", "Priority support 24/7", "VIP fam-trips", "1 mile = $1 redeemable"],
  Platinum: ["12% commission", "Priority support", "Annual fam-trip", "1 mile = $0.85 redeemable"],
  Gold:     ["10% commission", "Standard support", "Quarterly webinars", "1 mile = $0.70 redeemable"],
  Silver:   ["8% commission", "Standard support", "Onboarding kit", "1 mile = $0.50 redeemable"],
};

const TierInfo = ({ user, className = "" }: { user: PortalUser; className?: string }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        className={`inline-flex items-center gap-1.5 px-2 h-7 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors text-[11px] font-medium ${className}`}
        aria-label="Tier benefits info"
      >
        <Info className="h-3 w-3" /> {user.tier}
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-80 p-0 overflow-hidden border-border/60">
      <div className="relative h-20 gradient-ocean p-4 text-white">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="relative flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white/15 backdrop-blur grid place-items-center border border-white/20">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-primary-glow">Membership tier</p>
            <p className="font-display font-semibold leading-tight">{user.tier}</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" /> Miles
          </p>
          <p className="text-sm text-navy mt-1 leading-snug">
            Earn miles on every confirmed booking. Redeem them for commission boosts, fam-trip seats or
            client perks. You currently hold <span className="font-semibold">{user.miles.toLocaleString()}</span> miles.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-success" /> Tier benefits
          </p>
          <ul className="mt-1 space-y-1">
            {tierBenefits[user.tier].map(b => (
              <li key={b} className="text-[12.5px] text-navy/85 flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

export default TierInfo;
