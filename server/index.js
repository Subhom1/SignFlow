import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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
app.post('/sign', upload.single('file'), async (req, res, next) => {
  try {
    const signerName = req.body.name || 'Anonymous';
    const originalFile = req.file?.originalname || 'dummy.pdf';
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Generate unique signed file name
    const uniqueId = Date.now();
    const signedFileName = `${uniqueId}-${originalFile.replace(/\.pdf$/i, '-signed.pdf')}`;

    // Paths
    const uploadedPath = path.join(UPLOAD_DIR, req.file.filename);
    const signedPath = path.join(SIGNED_DIR, signedFileName);

    // Load the uploaded PDF
    const existingPdfBytes = await fs.promises.readFile(uploadedPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Create watermark text
    const watermark = `${signerName}  ${timestamp}`;

    // Draw watermark on every page
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const { width } = page.getSize();
      page.drawText(watermark, {
        x: width - 250, // position near bottom right
        y: 30,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4),
        opacity: 0.6,
      });
    });

    // Save the new "signed" PDF
    const signedPdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(signedPath, signedPdfBytes);

    // Respond with signed file details
    res.json({
      fileName: signedFileName,
      url: `/signed/${encodeURIComponent(signedFileName)}`,
      signed: true,
      signer: signerName,
      tookMs: 1000,
      message: `Signed PDF created for ${signerName}`,
    });
  } catch (err) {
    next(err);
  }
});
app.use('/signed', express.static(SIGNED_DIR, { maxAge: 0 }));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
