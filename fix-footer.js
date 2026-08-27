const fs = require('fs');
let c = fs.readFileSync('components/public/layout/Footer.tsx', 'utf8');
c = c.replace('Designed for joyful celebrations.', 'Designed by Launch Forge.');
fs.writeFileSync('components/public/layout/Footer.tsx', c);
console.log("Updated footer text");
