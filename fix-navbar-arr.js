const fs = require('fs');
const p = 'components/public/layout/Navbar.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/const bannerMessages = \[\s*"Welcome to Sky Crackers Up to 90%",\s*"Minimum Tamilnadu Order Rs 3,000",\s*"Minimum Other State Orders 5,000"\s*\];/, 'const bannerMessages = topBanners && topBanners.length > 0 ? topBanners : ["Welcome to Sky Crackers Up to 90%", "Minimum Tamilnadu Order Rs 3,000", "Minimum Other State Orders 5,000"];');

fs.writeFileSync(p, c);
console.log("Updated Navbar Array");
