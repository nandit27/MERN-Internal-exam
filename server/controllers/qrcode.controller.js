import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import { QRCode as QRCodeModel } from '../models/index.js';

export const generateQRCode = async (req, res) => {
  try {
    const { text } = req.body;
    
    // Generate QR code image
    const qrImageUrl = await QRCode.toDataURL(text);
    
    // Save to database
    const qrCode = await QRCodeModel.create({
      text,
      userId: req.userId,
      qrImageUrl
    });

    res.status(201).json(qrCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getQRCodes = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    
    // Build query
    const query = { userId: req.userId };
    if (startDate && endDate) {
      query.generatedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Execute query with pagination
    const qrCodes = await QRCodeModel.find(query)
      .sort({ generatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count
    const total = await QRCodeModel.countDocuments(query);

    res.json({
      qrCodes,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQRCode = async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const shareQRCode = async (req, res) => {
  try {
    const { email, qrCodeId } = req.body;

    if (!email || !qrCodeId) {
      return res.status(400).json({ message: 'Email and QR code ID are required' });
    }

    const qrCode = await QRCodeModel.findOne({
      _id: qrCodeId,
      userId: req.userId
    });

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Use App Password for Gmail
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Shared QR Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">QR Code Shared With You</h1>
          <p style="color: #666;">A QR code has been shared with you for: <strong>${qrCode.text}</strong></p>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${qrCode.qrImageUrl}" alt="QR Code" style="max-width: 300px; border: 1px solid #ddd; padding: 10px; border-radius: 8px;"/>
          </div>
          <p style="color: #888; text-align: center; font-size: 12px;">
            This QR code was shared via our QR Code Generator App
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ message: 'QR code shared successfully' });
  } catch (error) {
    console.error('Share QR Code Error:', error);
    res.status(500).json({ message: 'Failed to share QR code' });
  }
}; 