const fs = require('fs');
let heroFile = 'components/public/home/HeroSlider.tsx';
let heroContent = fs.readFileSync(heroFile, 'utf8');

// Increase width: change max-w-6xl to max-w-[1400px] and w-[100%] to w-[95%]
heroContent = heroContent.replace(
  /w-\[100%\] max-w-6xl/g,
  'w-[95%] max-w-[1400px]'
);

// Increase height: change max-h-[50vh] to max-h-[75vh]
heroContent = heroContent.replace(
  /max-h-\[50vh\]/g,
  'max-h-[75vh]'
);

fs.writeFileSync(heroFile, heroContent, 'utf8');
console.log("Increased banner width and height successfully.");
