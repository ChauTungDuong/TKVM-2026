import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { submitProduct, getSubmissions } from '../controllers/submissionController.js';
import { login, verifyToken, verifyAdmin, refreshToken, logOut } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 5*60*1000,
  max:5,
  message: {
    error: 'Too many login attempts. Please try again later.'
  }
})
// Setup uploads directory
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    if(file.mimetype === 'application/x-rar-compressed'){
      cb(null, true);
    }
    else{
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === '.rar') {
        cb(null, true);
      } else {
        cb(new Error('Error: Only .rar file is accepted.'));
      }
    }
  }
});

// Routes
router.post('/auth', loginLimiter, login);
router.post('/auth/refresh', refreshToken);
router.post('/logout', logOut);
router.post('/submissions', upload.single('file'), submitProduct);
router.get('/submissions', verifyToken, verifyAdmin,  getSubmissions);

export { router, uploadsDir };
