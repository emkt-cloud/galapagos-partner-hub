import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, FileText, Languages } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ResourceDoc } from "@/data/resources";

type Props = {
  doc: ResourceDoc | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const langMeta = {
  es: { label: "Español", flag: "🇪🇸" },
  en: { label: "English", flag: "🇬🇧" },
} as const;

const DownloadDialog = ({ doc, open, onOpenChange }: Props) => {
  if (!doc) return null;

  const handleDownload = (lang: "es" | "en") => {
    const href = `${doc.file}-${lang}.pdf`;
    const a = document.createElement("a");
    a.href = href;
    a.download = `${doc.label.replace(/\s+/g, "_")}_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast({
      title: `Downloading · ${langMeta[lang].label}`,
      description: `${doc.label} (${doc.size})`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/60 rounded-2xl">
        <div className="relative h-24 gradient-ocean">
          <div className="absolute inset-0 bg-gradient-glow opacity-60" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur grid place-items-center border border-white/20">
              <FileText className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="px-6 pt-5 pb-6">
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="font-display text-navy text-xl">{doc.label}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-xs">
              <Languages className="h-3.5 w-3.5" />
              Choose your preferred language · <span className="font-medium text-navy">{doc.size}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 mt-5">
            {doc.langs.map(lang => (
              <button
                key={lang}
                onClick={() => handleDownload(lang)}
                className="group relative flex flex-col items-center gap-2 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-elegant transition-premium"
              >
                <span className="text-3xl">{langMeta[lang].flag}</span>
                <span className="font-medium text-navy text-sm">{langMeta[lang].label}</span>
                <span className="inline-flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
                  <Download className="h-3 w-3" /> PDF · {lang.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
