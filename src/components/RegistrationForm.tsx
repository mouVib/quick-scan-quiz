import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, ArrowRight } from "lucide-react";

interface RegistrationFormProps {
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
  onCancel: () => void;
}

const RegistrationForm = ({ onSubmit, onCancel }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Inscrivez-vous</h2>
        <p className="text-muted-foreground text-sm">
          Remplissez vos informations pour participer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nom complet
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Téléphone <span className="text-muted-foreground">(optionnel)</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+213 XX XXX XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary"
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
          >
            Commencer le jeu
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
