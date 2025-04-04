import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  generateQRCode,
  getQRCodes,
  deleteQRCode,
  shareQRCode
} from '../controllers/qrcode.controller.js';

const router = express.Router();

router.post('/', auth, generateQRCode);
router.get('/', auth, getQRCodes);
router.delete('/:id', auth, deleteQRCode);
router.post('/share', auth, shareQRCode);

export default router; 