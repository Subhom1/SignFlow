import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, 'tmp', 'uploads');
const SIGNED_DIR = path.join(__dirname, 'tmp', 'signed');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(SIGNED_DIR, { recursive: true });

// --- Configure Multer upload middleware -------------------------------------
// Handles multipart/form-data and restricts to PDF files.
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Simple health check route
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/signed', express.static(SIGNED_DIR, { maxAge: 0 }));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
