import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.interface';

// We can switch this to CloudinaryStorageService in the future based on env variables
export const storageService: StorageService = new LocalStorageService();
