import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { router as apiRoutes, uploadsDir } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for reverse proxy / Docker / Cloud environments
app.set('trust proxy', 1);

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/api/uploads', express.static(uploadsDir));

// Use API Routes
app.use('/api', apiRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  // Handle invalid JSON body syntax errors from express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Dữ liệu JSON gửi lên không đúng định dạng.' });
  }

  // Handle Multer upload errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Dung lượng file vượt quá giới hạn cho phép (tối đa 500MB).' });
    }
    return res.status(400).json({ error: `Lỗi tải file: ${err.message}` });
  }

  // Handle custom validation or fileFilter errors
  if (err && err.message) {
    return res.status(400).json({ error: err.message });
  }

  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Đã xảy ra lỗi máy chủ nội bộ.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

