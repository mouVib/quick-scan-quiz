import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanning = async () => {
    try {
      setError(null);
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          stopScanning();
          onScanSuccess(decodedText);
        },
        () => {
          // Ignore scan failures (happens on each frame without QR)
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError("Unable to access camera. Please grant camera permissions.");
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  useEffect(() => {
    startScanning();
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="min-h-screen gradient-scanner flex flex-col items-center justify-center p-6">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-primary-foreground hover:bg-primary/20"
        onClick={() => {
          stopScanning();
          onClose();
        }}
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-primary-foreground mb-2">
          Scan QR Code
        </h1>
        <p className="text-muted-foreground">
          Position the QR code within the frame
        </p>
      </div>

      {/* Scanner container */}
      <div className="relative w-full max-w-sm mx-auto" ref={containerRef}>
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl animate-pulse-ring" />

        {/* Scanner frame */}
        <div className="relative rounded-3xl border-4 border-primary/50 bg-card/5 backdrop-blur-sm overflow-hidden">
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg z-10" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg z-10" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg z-10" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg z-10" />

          {/* QR Reader element */}
          <div id="qr-reader" className="w-full" />

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 p-6">
              <CameraOff className="w-12 h-12 text-destructive mb-4" />
              <p className="text-destructive text-center text-sm mb-4">{error}</p>
              <Button variant="outline" onClick={startScanning}>
                <Camera className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>

      {isScanning && (
        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          Waiting for QR code...
        </p>
      )}

      {/* Instructions */}
      <div className="mt-8 text-center max-w-xs">
        <p className="text-xs text-muted-foreground">
          Make sure the QR code is well-lit and fully visible within the scanning area
        </p>
      </div>
    </div>
  );
};

export default QRScanner;
