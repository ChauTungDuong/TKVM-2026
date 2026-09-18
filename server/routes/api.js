import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { submitProduct, getSubmissions, deleteSubmissions } from '../controllers/submissionController.js';
import { login, verifyToken, verifyAdmin, refreshToken, logOut } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many login attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false }
});

// Setup uploads directory
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    // Fix UTF-8 encoding issue if busboy/multer parsed filename as latin1
    let originalName = file.originalname;
    try {
      const decoded = Buffer.from(file.originalname, 'latin1').toString('utf8');
      if (!decoded.includes('\ufffd')) {
        originalName = decoded;
      }
    } catch (e) {}

    const ext = (path.extname(originalName) || path.extname(file.originalname) || '.rar').toLowerCase();
    const rawBaseName = path.basename(originalName, ext);

    // Sanitize base name: remove Vietnamese diacritics, keep only safe characters, max 50 chars to prevent ENAMETOOLONG
    const safeBaseName = rawBaseName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, (c) => c === 'đ' ? 'd' : 'D')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 50);

    const finalFileName = `${uniqueSuffix}-${safeBaseName || 'submission'}${ext}`;
    cb(null, finalFileName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    let originalName = file.originalname;
    try {
      const decoded = Buffer.from(file.originalname, 'latin1').toString('utf8');
      if (!decoded.includes('\ufffd')) {
        originalName = decoded;
      }
    } catch (e) {}

    const ext = (path.extname(originalName) || path.extname(file.originalname) || '').toLowerCase();
    const allowedExtensions = ['.rar', '.zip'];
    const allowedMimeTypes = [
      'application/x-rar-compressed',
      'application/x-rar',
      'application/vnd.rar',
      'application/rar',
      'application/zip',
      'application/x-zip-compressed',
      'application/octet-stream'
    ];

    if (allowedExtensions.includes(ext) || (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(ext))) {
      return cb(null, true);
    }

    if (allowedExtensions.includes(ext)) {
      return cb(null, true);
    }

    cb(new Error('Chỉ chấp nhận file nén định dạng .rar hoặc .zip.'));
  }
});

// Routes
router.post('/auth', loginLimiter, login);
router.post('/auth/refresh', refreshToken);
router.post('/logout', logOut);
router.post('/submissions', upload.single('file'), submitProduct);
router.get('/submissions', verifyToken, verifyAdmin,  getSubmissions);
router.delete('/submissions', verifyToken, verifyAdmin, deleteSubmissions);

export { router, uploadsDir };
