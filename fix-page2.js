const fs = require('fs');
let c = fs.readFileSync('app/(store)/page.tsx', 'utf8');

const target = `<Link 
              href="/shop"
              className="absolute z-20 group cursor-pointer animate-[bounce_2s_infinite]"`;

const replacement = `<Link 
          href="/shop" 
          className="btn-premium-gold group relative inline-flex items-center justify-center px-12 py-3.5 rounded-full text-black font-extrabold text-lg tracking-widest uppercase shadow-[0_0_20px_rgba(218,165,32,0.4)] hover:shadow-[0_0_35px_rgba(255,215,0,0.7)] transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            SHOP NOW
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </section>

      {/* 2. EXACT SHOP NOW CTA (MOBILE ONLY) */}
      <section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center md:hidden">
        <div className="relative w-[95%] sm:w-[85%] md:w-[75%] max-w-[1000px] aspect-[1024/409]">
          <Image 
            src="/images/shop-banner.jpg" 
            alt="Shop Fireworks Collection" 
            fill 
            className="object-contain"
            priority
          />
          <Link 
              href="/shop"
              className="absolute z-20 group cursor-pointer animate-[bounce_2s_infinite]"`;

c = c.replace(target, replacement);

fs.writeFileSync('app/(store)/page.tsx', c);
console.log("Restored missing code");
