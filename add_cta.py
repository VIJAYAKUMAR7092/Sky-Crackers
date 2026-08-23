import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

cta_section = """
      {/* 2. PREMIUM SHOP NOW CTA */}
      <section className="w-full py-6 sm:py-10 flex justify-center items-center bg-white relative z-10">
        <Link 
          href="/shop"
          className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-8 py-3.5 sm:px-12 sm:py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] bg-[length:200%_auto] animate-[bgSpin_3s_linear_infinite] rounded-full font-extrabold text-sm sm:text-base text-gray-900 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 border border-[#f3e5ab]/50 overflow-hidden"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full ring-2 ring-[#d4af37]/50 animate-ping opacity-50"></span>
          
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 animate-pulse relative z-10" />
          <span className="tracking-[0.15em] uppercase relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">Shop Now</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
        </Link>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bgSpin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}} />
      </section>

      <BrandMarquee />"""

content = content.replace("      <BrandMarquee />", cta_section)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
