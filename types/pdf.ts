/** Metadata for any uploaded or signed PDF file. */
export interface PdfMeta {
  originalName: string;
  signedName: string;
  filePath: string;
  publicUrl: string;
  signer: string;
  signedAt: string;
  tookMs: number;
}
