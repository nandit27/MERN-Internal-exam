import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onResult }) => {
  const [scannerInitialized, setScannerInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clean up any existing scanner instance
    const cleanupScanner = () => {
      const existingElement = document.getElementById('qr-reader');
      if (existingElement) {
        existingElement.innerHTML = '';
      }
    };

    if (!scannerInitialized) {
      cleanupScanner();

      const config = {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
      };

      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        config,
        /* verbose= */ false
      );

      const successCallback = (decodedText, decodedResult) => {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        onResult(decodedText);
        setError(null);
        
        // Optionally stop scanning after successful scan
        scanner.clear();
        setScannerInitialized(false);
      };

      const errorCallback = (errorMessage) => {
        console.warn(`QR Code scanning failed = ${errorMessage}`);
        if (errorMessage.includes('NotFoundError')) {
          setError('Camera not found. Please connect a camera and try again.');
        } else if (errorMessage.includes('NotAllowedError')) {
          setError('Camera permission denied. Please allow camera access to scan QR codes.');
        } else if (errorMessage.includes('NotReadableError')) {
          setError('Cannot access camera. It may be in use by another application.');
        } else {
          setError('Failed to scan QR code. Please try again.');
        }
      };

      scanner.render(successCallback, errorCallback)
        .then(() => {
          console.log('Scanner initialized successfully');
          setScannerInitialized(true);
        })
        .catch((err) => {
          console.error('Failed to initialize scanner:', err);
          setError('Failed to initialize QR scanner. Please refresh the page and try again.');
        });

      // Cleanup function
      return () => {
        console.log('Cleaning up scanner...');
        if (scanner) {
          scanner.clear()
            .then(() => console.log('Scanner cleared successfully'))
            .catch(console.error);
        }
        setScannerInitialized(false);
      };
    }
  }, [scannerInitialized, onResult]);

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
        <div id="qr-reader" className="w-full max-w-md mx-auto" />
      </div>

      <div className="text-sm text-muted-foreground text-center space-y-2">
        <p>Make sure you have good lighting and hold the QR code steady</p>
        {scannerInitialized && (
          <button
            onClick={() => setScannerInitialized(false)}
            className="text-primary hover:text-primary/80"
          >
            Reset Scanner
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner; 