import { CloudinaryStorageService } from './cloudinary-storage.service';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.interface';

// Automatically use LocalStorageService if Cloudinary keys are missing
const useCloudinary = !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET;

export const storageService: StorageService = useCloudinary 
  ? new CloudinaryStorageService() 
  : new LocalStorageService();
