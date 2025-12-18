import { Button } from "@/components/ui/button";
import { QrCode, Smartphone } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
  onCancel?: () => void;
}

const HeroSection = ({ onStart, onCancel }: HeroSectionProps) => {
  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Cancel button */}
      {onCancel && (
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-muted-foreground">
            Annuler
          </Button>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Hero Card */}
          <div className="bg-card rounded-3xl shadow-card border border-border/30 p-8 md:p-10 text-center animate-fade-in-up">
            {/* Tagline */}
            <p className="text-muted-foreground text-sm md:text-base mb-8 leading-relaxed">
              Explorez notre stand, découvrez nos produits innovants
              <br />
              et tentez de remporter de superbes cadeaux !
            </p>

            {/* Logo/Brand Area */}
            <div className="mb-8 animate-float">
              <div className="relative inline-flex items-center justify-center gap-3">
                {/* SCAN Text */}
                <span className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
                  SCAN
                </span>
                
                {/* Arabic text */}
                <div className="flex flex-col items-start">
                  <span className="text-3xl md:text-4xl font-bold text-primary" dir="rtl">
                    واربح
                  </span>
                  <span className="text-sm font-semibold text-primary" dir="rtl">
                    مع Brandt
                  </span>
                </div>

                {/* Phone mockup with QR */}
                <div className="relative ml-2">
                  <div className="w-16 h-24 bg-foreground rounded-xl flex items-center justify-center p-1">
                    <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  {/* Phone notch */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-foreground rounded-full" />
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-foreground font-medium mb-6">
              Prêt à explorer le stand Brandt ?
            </p>

            {/* CTA Button */}
            <Button
              onClick={onStart}
              className="w-full sm:w-auto px-10 h-14 text-lg font-semibold gradient-primary hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-full shadow-glow"
            >
              Participez maintenant
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
