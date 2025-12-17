import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuizOptionProps {
  label: string;
  optionKey: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  onClick: () => void;
}

const QuizOption = ({ label, optionKey, isSelected, isCorrect, showResult, onClick }: QuizOptionProps) => {
  const getStyles = () => {
    if (showResult) {
      if (isCorrect) return "border-success bg-success/10 text-success";
      if (isSelected && !isCorrect) return "border-destructive bg-destructive/10 text-destructive";
    }
    if (isSelected) return "border-primary bg-primary/10 text-primary";
    return "border-border hover:border-primary/50 hover:bg-primary/5";
  };

  return (
    <button
      onClick={onClick}
      disabled={showResult}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4",
        getStyles(),
        !showResult && "hover:-translate-y-0.5 hover:shadow-md"
      )}
    >
      <span className={cn(
        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-colors",
        isSelected ? "border-current bg-current/10" : "border-muted-foreground/30"
      )}>
        {showResult && isCorrect ? (
          <Check className="w-5 h-5" />
        ) : (
          optionKey
        )}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default QuizOption;
