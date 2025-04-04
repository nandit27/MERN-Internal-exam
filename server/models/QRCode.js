import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  // Additional useful fields
  qrImageUrl: {
    type: String,
    required: true
  },
  scannedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

qrCodeSchema.index({ userId: 1, generatedAt: -1 });
qrCodeSchema.index({ text: 'text' });

export default mongoose.model('QRCode', qrCodeSchema); 