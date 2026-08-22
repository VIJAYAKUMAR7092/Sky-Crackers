const fs = require('fs');
let page = fs.readFileSync('app/(store)/page.tsx', 'utf8');

const regex = /const displayBanners = heroBanners && heroBanners\.length > 0 \? heroBanners : \[\s*\{[\s\S]*?\}\s*\];/m;

const replacement = \const displayBanners = heroBanners && heroBanners.length > 0 ? heroBanners : [
    {
      id: "default-1",
      image: "/images/home/slider-1.jpg",
      title: "Celebrate Every Festival\\n<span class=\\\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\\\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      id: "default-2",
      image: "/images/home/slider-2.jpg",
      title: "Celebrate Every Festival\\n<span class=\\\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\\\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      id: "default-3",
      image: "/images/home/slider-3.jpg",
      title: "Celebrate Every Festival\\n<span class=\\\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\\\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      id: "default-4",
      image: "/images/home/slider-4.jpg",
      title: "Celebrate Every Festival\\n<span class=\\\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\\\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    }
  ];\;

page = page.replace(regex, replacement);
fs.writeFileSync('app/(store)/page.tsx', page);
