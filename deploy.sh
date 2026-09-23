#!/bin/bash
echo "Starting full deployment..."

# 1. Update code
git reset --hard
git pull origin master

# 2. Fix Environment Variables
node force-env.mjs

# 3. Clear Next.js Cache completely
echo "Clearing cache..."
rm -rf .next

# 4. Rebuild the application
echo "Building Next.js app (this will take 2 minutes)..."
npm run build

# 5. Restart PM2 with fresh environment
echo "Restarting server..."
pm2 reload skycrackers --update-env || pm2 restart skycrackers --update-env

echo "✅ Deployment complete! Website and Admin panel are fully updated."
