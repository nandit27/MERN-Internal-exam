import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import qrCodeRoutes from './routes/qrcode.routes.js';
import authRoutes from './routes/auth.routes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Fix the typo in 'origin'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add these middleware before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/qrcodes', qrCodeRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'QR Code API is running' });
});

// MongoDB Connection with error handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start server only after successful DB connection
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});
