import { Button } from "./ui/button";
import { Trophy, RotateCcw, Share2, Star } from "lucide-react";

interface QuizResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const QuizResults = ({ score, total, onRestart }: QuizResultsProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return { title: "Perfect Score!", emoji: "🎉" };
    if (percentage >= 80) return { title: "Excellent!", emoji: "🌟" };
    if (percentage >= 60) return { title: "Good Job!", emoji: "👍" };
    if (percentage >= 40) return { title: "Keep Practicing!", emoji: "💪" };
    return { title: "Try Again!", emoji: "📚" };
  };

  const { title, emoji } = getMessage();

  return (
    <div className="w-full max-w-md mx-auto text-center animate-fade-in">
      <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
        {/* Trophy icon */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full gradient-primary flex items-center justify-center shadow-glow">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        
        <div className="text-5xl mb-4">{emoji}</div>
        
        <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
        
        <p className="text-muted-foreground mb-6">You completed the quiz!</p>
        
        {/* Score display */}
        <div className="bg-secondary rounded-2xl p-6 mb-6">
          <div className="text-5xl font-bold text-primary mb-2">
            {score}/{total}
          </div>
          <div className="flex items-center justify-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(percentage / 20) ? "fill-current" : "opacity-30"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{percentage}% Correct</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onRestart} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="hero" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
