const fs = require('fs');
let file = 'app/(store)/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = '<section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center">';
const replaceStr = '<section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center md:hidden">';

content = content.replace(targetStr, replaceStr);

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
