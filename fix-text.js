const fs = require('fs');
let c = fs.readFileSync('app/(store)/page.tsx', 'utf8');
c = c.replace('Visit Us Live', 'Watch Now');
fs.writeFileSync('app/(store)/page.tsx', c);
console.log("Updated button text");
