
const fs = require('fs');
let content = fs.readFileSync('app/(store)/product/[slug]/page.tsx', 'utf8');
content = content.replace(/title:.*\| Sky Crackers Premium\,/, 'title: \ | Sky Crackers Premium,');
fs.writeFileSync('app/(store)/product/[slug]/page.tsx', content);

