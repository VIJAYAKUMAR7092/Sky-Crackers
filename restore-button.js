const fs = require('fs');

let pageFile = 'app/(store)/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

const targetStr = '{/* 2. EXACT SHOP NOW CTA (MOBILE ONLY) */}';

const newButtonSection = `
      {/* 1.5 NEW PREMIUM DESKTOP SHOP BUTTON */}
      <section className="w-full py-8 bg-[#0a0a0a] hidden md:flex justify-center items-center z-20 relative">
        <style dangerouslySetInnerHTML={{__html: \`
          @keyframes goldShine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes floatPremium {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .btn-premium-gold {
            background: linear-gradient(90deg, #B8860B, #FFD700, #FDF5E6, #FFD700, #B8860B);
            background-size: 200% auto;
            animation: goldShine 3s linear infinite, floatPremium 4s ease-in-out infinite;
            position: relative;
            overflow: hidden;
          }
          .btn-premium-gold::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%);
            opacity: 0;
            transform: scale(0.5);
            transition: opacity 0.3s, transform 0.5s;
            pointer-events: none;
          }
          .btn-premium-gold:hover::before {
            opacity: 0.4;
            transform: scale(1);
          }
        \`}} />
        <Link 
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
`;

pageContent = pageContent.replace(targetStr, newButtonSection.trim());
fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log("Restored button");
