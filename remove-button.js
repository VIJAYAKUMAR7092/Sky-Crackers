const fs = require('fs');

let pageFile = 'app/(store)/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Regex to remove the new premium desktop shop button section
const buttonSectionRegex = /\{\/\* NEW PREMIUM DESKTOP SHOP BUTTON[\s\S]*?<\/section>/;

pageContent = pageContent.replace(buttonSectionRegex, '');
fs.writeFileSync(pageFile, pageContent, 'utf8');

console.log("Removed Shop Now button section successfully.");
