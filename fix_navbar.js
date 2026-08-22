const fs = require('fs');
let code = fs.readFileSync('components/public/layout/Navbar.tsx', 'utf8');

// 1. Add banner logic
code = code.replace(
  'const cartItemsCount = useCartStore((state) => state.getTotalItems());',
  \const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerMessages = [
    "Welcome to Sky Crackers Up to 90% Discount",
    "Minimum Tamilnadu Order Rs 3,000",
    "Minimum Other State Orders 5,000"
  ];\
);

code = code.replace(
  'const handleScroll = () => {',
  \const bannerTimer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 3000);
    const handleScroll = () => {\
);

code = code.replace(
  'clearTimeout(t);',
  \clearTimeout(t);
      clearInterval(bannerTimer);\
);

// 2. Add animation block
code = code.replace(
  '<div className="text-center tracking-wide md:tracking-widest uppercase">\n             {settings?.announcement || "WELCOME TO SKY CRACKERS - 80% DISCOUNT ON ALL CRACKERS"}\n          </div>',
  \<div className="relative h-4 overflow-hidden w-full max-w-sm flex items-center justify-center">
            {bannerMessages.map((msg, idx) => (
              <div 
                key={idx}
                className=\\\bsolute w-full text-center tracking-wide md:tracking-widest uppercase transition-all duration-500 ease-in-out \\\\\\
              >
                {msg}
              </div>
            ))}
          </div>\
);

// 3. Fix container width (remove container class to fix spacing on mobile)
code = code.replace(
  '<div className="container mx-auto px-4 md:px-8">',
  '<div className="w-full mx-auto px-2 sm:px-4 md:px-8 max-w-7xl">'
);

fs.writeFileSync('components/public/layout/Navbar.tsx', code);
