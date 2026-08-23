import os
import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

cta_section = """
        {/* PREMIUM SHOP NOW CTA */}
        <section className="relative w-full bg-[#050505] py-8 flex justify-center items-center z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111] pointer-events-none"></div>
          <Link 
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:-translate-y-1 animate-[floatMobile_4s_infinite]"
          >
            {/* Soft Glow Underneath */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_infinite]"></div>
            
            {/* Golden Gradient Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-600 bg-[length:200%_auto] animate-[bgSpin_4s_linear_infinite] group-hover:bg-right transition-all"></div>
            
            {/* Inner Border / Micro-interaction Ripple Layer */}
            <div className="absolute inset-[2px] rounded-full bg-[#111] bg-opacity-30 group-hover:bg-opacity-0 transition-all duration-500 z-10"></div>
            
            {/* Sparkles & Content */}
            <Sparkles className="w-5 h-5 text-yellow-100 fill-yellow-200 z-20 animate-pulse drop-shadow-md" />
            <span className="relative z-20 font-black text-white text-lg tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Shop Now
            </span>
            <ArrowRight className="w-5 h-5 text-white z-20 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          </Link>
        </section>
"""

content = content.replace('<HeroSlider banners={displayBanners} />\n        </section>', '<HeroSlider banners={displayBanners} />\n        </section>\n' + cta_section)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
