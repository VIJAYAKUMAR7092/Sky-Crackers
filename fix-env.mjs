import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('localhost:3000')) {
    envContent = envContent.replace(/http:\/\/localhost:3000/g, 'https://skycrackers.in');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env URL updated successfully to https://skycrackers.in');
  } else {
    console.log('ℹ️ No localhost URL found in .env (maybe it was already updated)');
  }
} else {
  console.log('❌ .env file not found!');
}
