import { CloudinaryStorageService } from './cloudinary-storage.service';
import { StorageService } from './storage.interface';

// Automatically use CloudinaryStorageService in production environments
export const storageService: StorageService = new CloudinaryStorageService();
