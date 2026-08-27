const fs = require('fs');
let c = fs.readFileSync('lib/services/storage/cloudinary-storage.service.ts', 'utf8');

c = c.replace(
  `resource_type: 'auto',`,
  `resource_type: mimeType === 'application/pdf' ? 'raw' : 'auto',`
);

fs.writeFileSync('lib/services/storage/cloudinary-storage.service.ts', c);
console.log("Updated Cloudinary resource_type");
