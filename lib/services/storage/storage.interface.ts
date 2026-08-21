export interface UploadResult {
  url: string;
  id?: string;
  size?: number;
}

export interface StorageService {
  /**
   * Uploads a file and returns the public URL.
   */
  upload(file: Buffer, filename: string, mimeType: string): Promise<UploadResult>;

  /**
   * Deletes a file by its URL or ID.
   */
  delete(identifier: string): Promise<void>;
}
