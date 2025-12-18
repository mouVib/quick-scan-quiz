import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import QRScanner from "@/components/QRScanner";
import QuizContainer from "@/components/QuizContainer";
import SuccessScreen from "@/components/SuccessScreen";
import { toast } from "sonner";

type ViewState = "landing" | "register" | "scanning" | "quiz" | "results";

interface UserData {
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const [view, setView] = useState<ViewState>("landing");
  const [userData, setUserData] = useState<UserData>({ name: "", email: "", phone: "" });
  const [quizResults, setQuizResults] = useState({ score: 0, total: 0 });

  const handleStartClick = () => {
    setView("register");
  };

  const handleRegistration = (data: UserData) => {
    setUserData(data);
    toast.success(`Bienvenue ${data.name.split(' ')[0]} !`);
    setView("scanning");
  };

  const handleScanSuccess = (decodedText: string) => {
    toast.success("QR Code scanné avec succès !");
    console.log("Scanned QR Code:", decodedText);
    setView("quiz");
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizResults({ score, total });
    setView("results");
  };

  const handleRestart = () => {
    setView("landing");
    setUserData({ name: "", email: "", phone: "" });
    setQuizResults({ score: 0, total: 0 });
  };

  if (view === "register") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-card rounded-3xl shadow-card border border-border/30 p-8">
          <RegistrationForm
            onSubmit={handleRegistration}
            onCancel={handleRestart}
          />
        </div>
      </div>
    );
  }

  if (view === "scanning") {
    return (
      <QRScanner 
        onScanSuccess={handleScanSuccess}
        onClose={handleRestart}
      />
    );
  }

  if (view === "quiz") {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Suivez les indices et explorez le stand !
            </p>
            <h1 className="text-xl font-bold text-foreground">
              Quiz Brandt
            </h1>
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
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-card rounded-3xl shadow-card border border-border/30 p-8">
          <SuccessScreen 
            userName={userData.name || "Participant"}
            score={quizResults.score}
            total={quizResults.total}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  // Landing page
  return <HeroSection onStart={handleStartClick} />;
};

export default Index;
