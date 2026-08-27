import { v2 as cloudinary } from 'cloudinary';
import { StorageService, UploadResult } from './storage.interface';

export class CloudinaryStorageService implements StorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: Buffer, filename: string, mimeType: string): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'skycrackers/products',
          resource_type: mimeType === 'application/pdf' ? 'raw' : 'auto',
          // Optionally preserve original filename, though Cloudinary uses its own unique ID
          // filename_override: filename,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error);
          }
          if (!result) {
            return reject(new Error("Cloudinary returned no result"));
          }
          resolve({
            url: result.secure_url,
            id: result.public_id,
            size: result.bytes,
          });
        }
      );

      uploadStream.end(file);
    });
  }

  async delete(identifier: string): Promise<void> {
    try {
      let publicId = identifier;
      
      // If the identifier is a URL, attempt to extract the public_id
      // Cloudinary URLs typically look like:
      // https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/<folder>/<public_id>.<ext>
      if (identifier.startsWith('http')) {
        const parts = identifier.split('/');
        const filePart = parts.pop() || '';
        const folderPart = parts.pop() || '';
        
        // Remove file extension
        const publicIdWithoutExt = filePart.split('.')[0];
        
        // Reconstruct the typical folder structure "skycrackers/products/<id>"
        if (folderPart === 'products') {
           const parentFolder = parts.pop() || ''; // skycrackers
           publicId = `${parentFolder}/${folderPart}/${publicIdWithoutExt}`;
        } else {
           publicId = publicIdWithoutExt;
        }
      }

      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error(`Failed to delete file from Cloudinary ${identifier}:`, error);
    }
  }
}
