import os
import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_cta = """      {/* 2. PREMIUM SHOP NOW CTA */}
      <section className="w-full py-8 sm:py-12 flex justify-center items-center bg-white relative z-10">
        <div className="animate-[floatMobile_4s_ease-in-out_infinite]">
          <Link 
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-[#dca42b] via-[#fce074] to-[#dca42b] rounded-full font-bold text-[11px] sm:text-xs text-gray-900 shadow-[0_0_15px_rgba(220,164,43,0.4)] hover:shadow-[0_8px_25px_rgba(220,164,43,0.7)] transition-all duration-500 hover:-translate-y-1 hover:scale-105 active:scale-95 border border-[#fef1a7] overflow-hidden"
          >
            {/* Soft continuous glow ring */}
            <span className="absolute inset-0 rounded-full ring-[1.5px] ring-[#fce074]/60 animate-ping opacity-40"></span>
            
            {/* Shimmer Effect */}
            <span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2.5s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"></span>

            <span className="tracking-[0.18em] uppercase relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
          </Link>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(12deg); }
            50%, 100% { transform: translateX(150%) skewX(12deg); }
          }
        `}} />
      </section>"""

# Find the exact current block and replace it using regex
pattern = re.compile(r"\{\/\*\ 2\.\ PREMIUM\ SHOP\ NOW\ CTA\ \*\/\}.*?</section>", re.DOTALL)
content = re.sub(pattern, new_cta, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
