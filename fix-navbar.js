const fs = require('fs');
const p = 'components/public/layout/Navbar.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  'export default function Navbar({ settings }: { settings?: any }) {',
  'export default function Navbar({ settings, topBanners = [] }: { settings?: any, topBanners?: string[] }) {'
);

const oldBanners = `const bannerMessages = [
    "Welcome to Sky Crackers Up to 90%",
    "Minimum Tamilnadu Order Rs 3,000",
    "Minimum Other State Orders 5,000"
  ];`;
  
const newBanners = `const bannerMessages = topBanners && topBanners.length > 0 ? topBanners : [
    "Welcome to Sky Crackers Up to 90%",
    "Minimum Tamilnadu Order Rs 3,000",
    "Minimum Other State Orders 5,000"
  ];`;

c = c.replace(oldBanners, newBanners);
fs.writeFileSync(p, c);
console.log("Updated Navbar");
