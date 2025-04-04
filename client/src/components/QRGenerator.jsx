import { useState } from 'react';
import QRCode from 'react-qr-code';
import { api } from '../utils/axios';
import { Copy, Download, Share, X, Loader2 } from 'lucide-react';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState('');

  const generateQR = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/qrcodes', { text });
      setQrCode(response.data);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    setSharing(true);
    setShareError('');

    try {
      await api.post('/qrcodes/share', {
        email: shareEmail,
        qrCodeId: qrCode._id
      });
      setShowShareModal(false);
      setShareEmail('');
    } catch (error) {
      setShareError(error.response?.data?.message || 'Failed to share QR code');
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Generate QR Code</h2>
        <p className="text-muted-foreground">
          Enter a URL or text to generate a QR code
        </p>
      </div>

      <form onSubmit={generateQR} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter URL or text"
            required
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate QR Code'}
        </button>
      </form>

      {text && (
        <div className="p-6 bg-card rounded-lg border border-border">
          <div className="aspect-square w-full max-w-sm mx-auto mb-6 bg-white p-4 rounded-lg">
            <QRCode
              id="qr-code"
              value={text}
              size={256}
              level="H"
              className="w-full h-full"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80"
            >
              <Share className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">Share QR Code</h3>
            
            {shareError && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {shareError}
              </div>
            )}

            <form onSubmit={handleShare} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 bg-secondary rounded-lg focus:ring-2 focus:ring-border outline-none"
                  placeholder="Enter recipient's email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sharing}
                className="w-full py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sharing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share className="w-4 h-4" />
                    Share QR Code
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRGenerator; 