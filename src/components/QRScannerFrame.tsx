import { QrCode, Scan, CheckCircle } from "lucide-react";

const QRScannerFrame = () => {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl animate-pulse-ring" />
      
      {/* Scanner frame */}
      <div className="relative w-full h-full rounded-3xl border-4 border-primary/50 bg-card/5 backdrop-blur-sm overflow-hidden">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
        
        {/* Scanning line */}
        <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line shadow-glow" />
        
        {/* Center QR icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30">
            <QrCode className="w-12 h-12 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScannerFrame;
