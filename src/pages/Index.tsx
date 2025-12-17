import { useState } from "react";
import { Button } from "@/components/ui/button";
import QRScannerFrame from "@/components/QRScannerFrame";
import QuizContainer from "@/components/QuizContainer";
import QuizResults from "@/components/QuizResults";
import { QrCode, Scan, BookOpen, Zap, Users } from "lucide-react";

type ViewState = "landing" | "scanning" | "quiz" | "results";

const Index = () => {
  const [view, setView] = useState<ViewState>("landing");
  const [quizResults, setQuizResults] = useState({ score: 0, total: 0 });

  const handleStartScan = () => {
    setView("scanning");
    // Simulate scanning process
    setTimeout(() => {
      setView("quiz");
    }, 2500);
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizResults({ score, total });
    setView("results");
  };

  const handleRestart = () => {
    setView("landing");
    setQuizResults({ score: 0, total: 0 });
  };

  if (view === "scanning") {
    return (
      <div className="min-h-screen gradient-scanner flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">
            Scanning QR Code...
          </h1>
          <p className="text-muted-foreground">
            Position the QR code within the frame
          </p>
        </div>
        
        <QRScannerFrame />
        
        <p className="mt-8 text-sm text-muted-foreground animate-pulse">
          Loading quiz...
        </p>
      </div>
    );
  }

  if (view === "quiz") {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              QR Code Knowledge Quiz
            </div>
          </header>
          
          <QuizContainer 
            onComplete={handleQuizComplete}
            onBack={handleRestart}
          />
        </div>
      </div>
    );
  }

  if (view === "results") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
        <QuizResults 
          score={quizResults.score}
          total={quizResults.total}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">QuizScan</span>
          </div>
          <Button variant="ghost" size="sm">
            About
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            Instant Quiz Access
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Scan, Learn, 
            <span className="text-gradient"> Succeed</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Transform any QR code into an interactive quiz experience. Perfect for classrooms, events, and self-learning.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" onClick={handleStartScan}>
              <Scan className="w-5 h-5 mr-2" />
              Start Scanning
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>

          {/* QR Scanner Preview */}
          <div className="relative max-w-sm mx-auto animate-float">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-3xl p-8 shadow-lg border border-border">
              <div className="w-48 h-48 mx-auto rounded-2xl bg-secondary flex items-center justify-center border-2 border-dashed border-primary/30">
                <QrCode className="w-20 h-20 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Point your camera at any quiz QR code
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="max-w-5xl mx-auto mt-24 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Scan,
              title: "Instant Scan",
              description: "Scan any QR code and instantly access interactive quizzes.",
            },
            {
              icon: BookOpen,
              title: "Learn Anywhere",
              description: "Perfect for classrooms, museums, events, or self-study.",
            },
            {
              icon: Users,
              title: "Track Progress",
              description: "Monitor your scores and compete with friends.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 QuizScan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
