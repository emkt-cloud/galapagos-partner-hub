import { Construction } from "lucide-react";

const Placeholder = ({ title }: { title: string }) => (
  <div className="max-w-2xl mx-auto text-center py-20 animate-fade-up">
    <div className="h-16 w-16 mx-auto rounded-2xl gradient-brand grid place-items-center text-white shadow-glow mb-6">
      <Construction className="h-6 w-6" />
    </div>
    <h2 className="font-display text-3xl font-semibold text-navy mb-3">{title}</h2>
    <p className="text-muted-foreground">This section will be available in the next iteration of the Partner Portal.</p>
  </div>
);

export default Placeholder;
