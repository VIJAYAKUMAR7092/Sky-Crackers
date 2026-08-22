const fs = require('fs');

// 1. Fix page.tsx
let page = fs.readFileSync('app/(store)/page.tsx', 'utf8');

// Add overflow-x-hidden to main wrapper
page = page.replace(
  '<div className="flex flex-col w-full bg-white text-gray-900 font-sans">',
  '<div className="flex flex-col w-full bg-white text-gray-900 font-sans overflow-x-hidden max-w-[100vw]">'
);

// Fix Hero section height
page = page.replace(
  '<section className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-white">',
  '<section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-black">'
);

fs.writeFileSync('app/(store)/page.tsx', page);

// 2. Fix HeroSlider.tsx
let slider = fs.readFileSync('components/public/home/HeroSlider.tsx', 'utf8');

slider = slider.replace(
  'text-4xl md:text-6xl lg:text-7xl',
  'text-3xl sm:text-4xl md:text-6xl lg:text-7xl px-2'
);

slider = slider.replace(
  'text-lg md:text-2xl',
  'text-sm sm:text-base md:text-xl lg:text-2xl px-4'
);

slider = slider.replace(
  '<div className="container relative z-20 mx-auto px-4 text-center mt-6 pb-16">',
  '<div className="container relative z-20 mx-auto px-2 sm:px-4 text-center mt-4 sm:mt-6 pb-8 sm:pb-16 w-full max-w-full overflow-hidden">'
);

fs.writeFileSync('components/public/home/HeroSlider.tsx', slider);

console.log("Success");
