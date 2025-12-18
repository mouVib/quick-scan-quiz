import { Button } from "@/components/ui/button";
import { CheckCircle, Download, RotateCcw, Trophy } from "lucide-react";

interface SuccessScreenProps {
  userName: string;
  score: number;
  total: number;
  onRestart: () => void;
}

const SuccessScreen = ({ userName, score, total, onRestart }: SuccessScreenProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const handleDownload = () => {
    // Create a simple confirmation text
    const confirmation = `
╔══════════════════════════════════════╗
║     CONFIRMATION DE PARTICIPATION     ║
╠══════════════════════════════════════╣
║                                      ║
║  Participant: ${userName.padEnd(22)}║
║  Score: ${score}/${total} (${percentage}%)                    ║
║  Date: ${new Date().toLocaleDateString('fr-FR').padEnd(23)}║
║                                      ║
║  Présentez cette confirmation        ║
║  à l'équipe pour participer          ║
║  à la tombola.                       ║
║                                      ║
║  قدّم هذه الوثيقة إلى الفريق         ║
║  للمشاركة في السحب                   ║
║                                      ║
╚══════════════════════════════════════╝
    `.trim();

    const blob = new Blob([confirmation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confirmation-${userName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center animate-scale-in">
      {/* Success Icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center animate-bounce-subtle">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
        </div>
        <div className="absolute -top-2 -right-2 left-0 right-0 mx-auto w-fit">
          <Trophy className="w-8 h-8 text-warning animate-float" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Bravo {userName.split(' ')[0]} !
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        Vous avez terminé le jeu
      </p>

      {/* Score Card */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
        <div className="text-5xl font-bold text-gradient mb-2">
          {score}/{total}
        </div>
        <p className="text-muted-foreground">
          {percentage >= 80 ? "Excellent !" : percentage >= 60 ? "Très bien !" : "Bon effort !"}
        </p>
        
        {/* Progress bar */}
        <div className="mt-4 h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
        <p className="text-sm text-foreground mb-2">
          Présentez cette confirmation à l'équipe pour participer à la tombola.
        </p>
        <p className="text-sm text-muted-foreground" dir="rtl">
          قدّم هذه الوثيقة إلى الفريق للمشاركة في السحب
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={handleDownload}
          className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5 mr-2" />
          Télécharger la confirmation
        </Button>
        
        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full h-12 text-base"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Rejouer
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
