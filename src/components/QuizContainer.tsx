import { useState } from "react";
import ProgressBar from "./ProgressBar";
import QuizOption from "./QuizOption";
import { Button } from "./ui/button";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: { key: string; label: string }[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does QR stand for in QR Code?",
    options: [
      { key: "A", label: "Quick Response" },
      { key: "B", label: "Quality Recognition" },
      { key: "C", label: "Query Request" },
      { key: "D", label: "Quantum Reader" },
    ],
    correctAnswer: "A",
  },
  {
    id: 2,
    question: "In which year were QR codes invented?",
    options: [
      { key: "A", label: "1984" },
      { key: "B", label: "1994" },
      { key: "C", label: "2004" },
      { key: "D", label: "2014" },
    ],
    correctAnswer: "B",
  },
  {
    id: 3,
    question: "Which company originally developed QR codes?",
    options: [
      { key: "A", label: "Google" },
      { key: "B", label: "Sony" },
      { key: "C", label: "Denso Wave" },
      { key: "D", label: "Microsoft" },
    ],
    correctAnswer: "C",
  },
  {
    id: 4,
    question: "How much data can a QR code typically store?",
    options: [
      { key: "A", label: "Up to 100 characters" },
      { key: "B", label: "Up to 3,000 characters" },
      { key: "C", label: "Up to 10,000 characters" },
      { key: "D", label: "Unlimited" },
    ],
    correctAnswer: "B",
  },
  {
    id: 5,
    question: "What is the primary advantage of QR codes over traditional barcodes?",
    options: [
      { key: "A", label: "Smaller size" },
      { key: "B", label: "Store more information" },
      { key: "C", label: "Lower cost to produce" },
      { key: "D", label: "Easier to print" },
    ],
    correctAnswer: "B",
  },
];

interface QuizContainerProps {
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}

const QuizContainer = ({ onComplete, onBack }: QuizContainerProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (key: string) => {
    if (showResult) return;
    setSelectedAnswer(key);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    if (!showResult) {
      setShowResult(true);
      if (selectedAnswer === question.correctAnswer) {
        setScore(score + 1);
      }
    } else {
      if (isLastQuestion) {
        const finalScore = selectedAnswer === question.correctAnswer ? score : score;
        onComplete(finalScore, questions.length);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <ProgressBar 
        current={currentQuestion + 1} 
        total={questions.length} 
        className="mb-8"
      />
      
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          {question.question}
        </h2>
        
        <div className="space-y-3 mb-8">
          {question.options.map((option) => (
            <QuizOption
              key={option.key}
              optionKey={option.key}
              label={option.label}
              isSelected={selectedAnswer === option.key}
              isCorrect={option.key === question.correctAnswer}
              showResult={showResult}
              onClick={() => handleSelectAnswer(option.key)}
            />
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button 
            variant={showResult ? "success" : "hero"}
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="flex-1"
          >
            {showResult ? (
              isLastQuestion ? (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  See Results
                </>
              ) : (
                <>
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )
            ) : (
              "Check Answer"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
