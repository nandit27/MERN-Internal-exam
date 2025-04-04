import { useState, useEffect } from 'react';
import { api } from '../utils/axios';

const QRHistory = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchQRCodes();
  }, [page]);

  const fetchQRCodes = async () => {
    try {
      const response = await api.get(`/qrcodes?page=${page}&limit=10`);
      setQrCodes(response.data.qrCodes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">QR Code History</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {qrCodes.map((qrCode) => (
          <div
            key={qrCode._id}
            className="p-4 bg-card rounded-lg border border-border"
          >
            <img
              src={qrCode.qrImageUrl}
              alt="QR Code"
              className="w-full aspect-square object-contain bg-white rounded-md mb-4"
            />
            <p className="text-sm text-muted-foreground truncate">{qrCode.text}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(qrCode.generatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {qrCodes.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No QR codes generated yet
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QRHistory; 