import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, 'tmp', 'uploads');
const SIGNED_DIR = path.join(__dirname, 'tmp', 'signed');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(SIGNED_DIR, { recursive: true });
const PORT = process.env.PORT || 5050;
const HOST = '0.0.0.0'; // Listen on all network interfaces
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Configure Multer upload middleware
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

// Simple health check route
app.get('/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});
// PDF signing route
app.post('/sign', upload.single('file'), async (req, res, next) => {
  try {
    console.log('Received sign request');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

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
    const watermark = `${signerName} • ${timestamp}`;

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

    console.log('PDF signed successfully:', signedFileName);

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
    console.error('Error signing PDF:', err);
    res.status(500).json({ error: 'Failed to sign PDF' });
  }
});

// Serve signed PDFs
app.use('/signed', express.static(SIGNED_DIR, { maxAge: 0 }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Helper function to get local IP addresses
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }

  return addresses;
}

app.listen(PORT, HOST, () => {
  console.log(`\n Server running on:`);
  console.log(`Local:http://localhost:${PORT}`);

  const localIps = getLocalIpAddresses();
  localIps.forEach((ip) => {
    console.log(`Network: http://${ip}:${PORT}`);
  });
  console.log('');
});
