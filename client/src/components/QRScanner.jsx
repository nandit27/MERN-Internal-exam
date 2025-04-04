import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onResult }) => {
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    
    const startScanner = async () => {
      try {
        setError(null);
        setScanning(true);
        
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onResult(decodedText);
            html5QrCode.stop();
            setScanning(false);
          },
          (errorMessage) => {
            // Ignore frequent error messages
            if (!errorMessage.includes("No QR code found")) {
              console.warn(errorMessage);
            }
          }
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
        setError(getErrorMessage(err));
        setScanning(false);
      }
    };

    // Start scanning when component mounts
    startScanner();

    // Cleanup function
    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [onResult]);

  const getErrorMessage = (error) => {
    if (error.message?.includes("NotFoundError")) {
      return "Camera not found. Please connect a camera and try again.";
    } else if (error.message?.includes("NotAllowedError")) {
      return "Camera permission denied. Please allow camera access to scan QR codes.";
    } else if (error.message?.includes("NotReadableError")) {
      return "Cannot access camera. It may be in use by another application.";
    }
    return "Failed to start QR scanner. Please refresh and try again.";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Scan QR Code</h2>
        <p className="text-muted-foreground">
          Point your camera at a QR code to scan it
        </p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-card rounded-lg border border-border p-6">
        <div 
          id="qr-reader" 
          className="w-full max-w-md mx-auto"
          style={{ position: 'relative', minHeight: '300px' }}
        >
          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">
                Initializing camera...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center">
        <p>Make sure you have good lighting and hold the QR code steady</p>
      </div>
    </div>
  );
};

export default QRScanner; 