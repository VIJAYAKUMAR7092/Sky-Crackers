const fs = require('fs');

let heroFile = 'components/public/home/HeroSlider.tsx';
let heroContent = fs.readFileSync(heroFile, 'utf8');

// Replace the Link and Image inside the Desktop Hero section
heroContent = heroContent.replace(
  /<Link href="\/shop" className="block w-full h-auto cursor-pointer flex items-center justify-center">[\s\S]*?<\/Link>/g,
  `<Link href="/shop" className="relative cursor-pointer inline-flex items-center justify-center mx-auto w-fit h-fit">
                      <Image
                        src={banner.image}
                        alt={banner.title || "Sky Crackers Festival Banner"}
                        width={1920}
                        height={800}
                        sizes="100vw"
                        priority={index === 0}
                        quality={100}
                        className="w-auto h-auto max-w-full max-h-[75vh] object-contain drop-shadow-2xl"
                      />
                    </Link>`
);

fs.writeFileSync(heroFile, heroContent, 'utf8');
console.log("Updated HeroSlider for exact click boundaries");
