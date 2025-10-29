export interface SignPdfRequest {
  file: File | Blob;
  name: string;
}
/**
 * Response returned by POST /sign
 */
export interface SignPdfResponse {
  fileName: string;
  url: string;
  signed: boolean;
  signer: string;
  tookMs: number;
  message: string;
}
