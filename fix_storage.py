import os

file_path = 'lib/services/storage/index.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = """import { CloudinaryStorageService } from './cloudinary-storage.service';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.interface';

// Automatically use LocalStorageService if Cloudinary keys are missing
const useCloudinary = !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET;

export const storageService: StorageService = useCloudinary 
  ? new CloudinaryStorageService() 
  : new LocalStorageService();
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
