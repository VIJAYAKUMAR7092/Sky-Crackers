const fs = require('fs');
let file = 'components/public/home/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove min-h classes from the main desktop container
content = content.replace(
  /className="hidden md:flex w-full min-h-\[60vh\] lg:min-h-\[70vh\] bg-\[#0a0a0a\] relative overflow-hidden items-stretch justify-center"/g,
  'className="hidden md:flex w-full bg-[#0a0a0a] relative overflow-hidden items-center justify-center"'
);

// 2. Make the Image w-full h-auto so it naturally dictates the height
content = content.replace(
  /className="w-full h-full object-contain"/g,
  'className="w-full h-auto max-h-[50vh] object-contain"'
);

// 3. Make the grid h-auto instead of h-full if it's there
content = content.replace(
  /<div className="grid w-full h-full">/g,
  '<div className="grid w-full h-auto">'
);

// 4. Center wrapper h-auto
content = content.replace(
  /className="col-start-1 row-start-1 w-full h-full flex items-center/g,
  'className="col-start-1 row-start-1 w-full h-auto flex items-center'
);

content = content.replace(
  /className="block w-full h-full cursor-pointer/g,
  'className="block w-full h-auto cursor-pointer'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
