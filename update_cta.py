import os
import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'\s*\{\/\*\ 2\.\ PREMIUM\ SHOP\ NOW\ CTA\ \*\/\}.*?<\/section>', re.DOTALL)

new_cta = """            {/* 2. PREMIUM SHOP NOW CTA */}
      <section className="w-full py-8 sm:py-12 flex justify-center items-center bg-white relative z-10">
        <div className="animate-[luxuryFloat_6s_ease-in-out_infinite]">
          <Link 
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-[#dca42b] via-[#fce074] to-[#dca42b] rounded-full font-bold text-[11px] sm:text-xs text-gray-900 shadow-[0_4px_15px_rgba(220,164,43,0.3)] hover:shadow-[0_8px_25px_rgba(220,164,43,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border border-[#fef1a7] overflow-hidden"
          >
            {/* Gentle Red Glow */}
            <span className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.6)] animate-[luxuryGlow_4s_ease-in-out_infinite] pointer-events-none"></span>
            
            {/* Shine Sweep */}
            <span className="absolute inset-0 -translate-x-[200%] animate-[luxuryShine_5s_infinite_linear] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 z-0 pointer-events-none w-1/2"></span>

            <span className="tracking-[0.18em] uppercase relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </Link>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes luxuryFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes luxuryGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          @keyframes luxuryShine {
            0% { transform: translateX(-200%) skewX(25deg); opacity: 0; }
            5%, 15% { opacity: 1; }
            20% { transform: translateX(200%) skewX(25deg); opacity: 0; }
            100% { transform: translateX(200%) skewX(25deg); opacity: 0; }
          }
        `}} />
      </section>"""

new_content = pattern.sub(new_cta, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated via Regex")
