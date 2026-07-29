import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as apiRoutes, uploadsDir } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/api/uploads', express.static(uploadsDir));

// Use API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
