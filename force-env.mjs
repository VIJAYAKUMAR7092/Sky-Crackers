import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Regex to replace ANY existing NEXTAUTH_URL
  envContent = envContent.replace(/NEXTAUTH_URL=.*$/m, 'NEXTAUTH_URL="https://skycrackers.in"');
  
  // If NEXTAUTH_URL was missing entirely, add it
  if (!envContent.includes('NEXTAUTH_URL=')) {
    envContent += '\nNEXTAUTH_URL="https://skycrackers.in"\n';
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ FORCED .env NEXTAUTH_URL to https://skycrackers.in');
} else {
  console.log('❌ .env file not found!');
}
