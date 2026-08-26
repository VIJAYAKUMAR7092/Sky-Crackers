const fs = require('fs');
let content = fs.readFileSync('components/public/layout/Footer.tsx', 'utf8');
content = content.replace(/\+9163835 11818/g, '+916383511818');
fs.writeFileSync('components/public/layout/Footer.tsx', content);

content = fs.readFileSync('components/public/layout/Navbar.tsx', 'utf8');
content = content.replace(/\+9163835 11818/g, '+916383511818');
fs.writeFileSync('components/public/layout/Navbar.tsx', content);
