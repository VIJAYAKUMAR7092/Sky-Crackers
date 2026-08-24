import os
import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<div className="animate-\[luxuryFloat_6s_ease-in-out_infinite\]">.*?<\/section>', re.DOTALL)

new_cta = """<div className="relative animate-[luxuryFloat_6s_ease-in-out_infinite] z-10 group">
            
            {/* WhatsApp style Expanding Bubbles */}
            <div className="absolute inset-0 rounded-full bg-[#dca42b] opacity-40 animate-[luxuryPing_2s_ease-out_infinite] pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full bg-[#fce074] opacity-30 animate-[luxuryPing_2.5s_ease-out_infinite_0.8s] pointer-events-none"></div>

            <Link 
              href="/shop"
              className="relative flex items-center justify-center gap-3 px-8 py-3.5 sm:px-12 sm:py-5 bg-gradient-to-r from-[#dca42b] via-[#fce074] to-[#dca42b] rounded-full font-black text-sm sm:text-base text-gray-900 shadow-[0_4px_15px_rgba(220,164,43,0.3)] hover:shadow-[0_8px_30px_rgba(220,164,43,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border-2 border-[#fef1a7]"
            >
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                {/* Gentle Red Glow */}
                <span className="absolute inset-0 shadow-[0_0_20px_rgba(225,29,72,0.5)] animate-[luxuryGlow_4s_ease-in-out_infinite]"></span>
                
                {/* Shine Sweep */}
                <span className="absolute inset-0 -translate-x-[200%] animate-[luxuryShine_5s_infinite_linear] bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 w-1/2"></span>
              </div>
  
              <span className="tracking-[0.2em] uppercase relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">Shop Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
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
            @keyframes luxuryPing {
              0% { transform: scale(1); opacity: 0.6; }
              100% { transform: scale(1.35); opacity: 0; }
            }
          `}} />
        </section>"""

new_content = pattern.sub(new_cta, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated Shop button animation with bubbles and size")
