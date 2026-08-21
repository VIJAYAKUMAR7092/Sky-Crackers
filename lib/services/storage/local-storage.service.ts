import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { StorageService, UploadResult } from './storage.interface';

export class LocalStorageService implements StorageService {
  private uploadDir: string;

  constructor() {
    // Store in public/uploads/products
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async upload(file: Buffer, filename: string, mimeType: string): Promise<UploadResult> {
    await this.ensureDirectoryExists();

    const ext = path.extname(filename);
    const hash = crypto.randomBytes(16).toString('hex');
    const newFilename = `${hash}${ext}`;
    const filePath = path.join(this.uploadDir, newFilename);

    await fs.writeFile(filePath, file);

    const url = `/uploads/products/${newFilename}`;

    return {
      url,
      id: newFilename, // For local storage, id is the filename
      size: file.length,
    };
  }

  async delete(identifier: string): Promise<void> {
    try {
      let filename = identifier;
      
      // If identifier is a full URL, extract the filename
      if (identifier.startsWith('/uploads/products/')) {
        filename = identifier.split('/').pop() || identifier;
      }

      const filePath = path.join(this.uploadDir, filename);
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete file ${identifier}:`, error);
      // We might not want to throw if it's already deleted
    }
  }
}
