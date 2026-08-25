import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "{/* 2. PREMIUM SHOP NOW CTA */}"
next_section_marker = "<section className=\"py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden\">"

if start_marker in content and next_section_marker in content:
    start_idx = content.find(start_marker)
    end_idx = content.find(next_section_marker)
    
    new_section = """{/* 2. EXACT SHOP NOW CTA */}
        <section className="w-full py-12 flex flex-col justify-center items-center bg-[#FCF8E8] relative z-10 overflow-hidden min-h-[300px]">
          {/* Tags Top */}
          <div className="flex gap-4 sm:gap-8 items-center justify-center text-[#5C4018] text-[10px] sm:text-xs font-bold mb-8 relative z-20">
            <span className="flex items-center gap-1.5 uppercase"><span className="w-4 h-4 bg-[#A6783B] text-white rounded-full flex items-center justify-center text-[10px]">🏷️</span> Big Savings</span>
            <span className="w-px h-4 bg-[#A6783B]/30"></span>
            <span className="flex items-center gap-1.5 uppercase"><span className="w-4 h-4 bg-[#A6783B] text-white rounded-full flex items-center justify-center text-[10px]">⭐</span> Premium Quality</span>
            <span className="w-px h-4 bg-[#A6783B]/30"></span>
            <span className="flex items-center gap-1.5 uppercase"><span className="w-4 h-4 bg-[#A6783B] text-white rounded-full flex items-center justify-center text-[10px]">🚚</span> Fast Delivery</span>
          </div>

          {/* Left & Right Images */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 opacity-90 pointer-events-none">
            <Image src="/images/animations/left_crackers.png" alt="Left Crackers" fill className="object-contain object-left sm:object-left-bottom" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 opacity-90 pointer-events-none">
            <Image src="/images/animations/right_crackers.png" alt="Right Crackers" fill className="object-contain object-right sm:object-right-bottom" />
          </div>

          {/* Shop Now Button */}
          <div className="relative z-20 my-4 group">
            {/* Subtle pulsing animation behind the button */}
            <div className="absolute inset-0 bg-[#E5AA3A] rounded-full blur-xl opacity-40 animate-[pulse_3s_infinite] pointer-events-none"></div>
            
            <Link 
              href="/shop"
              className="relative flex items-center justify-center gap-3 px-10 py-4 sm:px-16 sm:py-5 bg-gradient-to-b from-[#FFF2B2] via-[#E4A526] to-[#995806] rounded-full shadow-[0_10px_25px_rgba(153,88,6,0.4)] hover:shadow-[0_12px_30px_rgba(153,88,6,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#FFF6C5]"
            >
              {/* Glossy overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-full pointer-events-none"></div>

              {/* Subtle shine sweep animation */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <span className="absolute inset-0 -translate-x-[200%] animate-[luxuryShine_5s_infinite_linear] bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 w-1/2"></span>
              </div>
              
              <span className="text-[#321704] font-black text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">Shop Now</span>
              <ArrowRight className="text-[#321704] w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Bottom Text */}
          <div className="flex gap-3 items-center justify-center mt-6 text-[#5C4018] text-sm font-medium relative z-20">
            <span className="text-[#A6783B]">🌿</span>
            <span>Explore Our Complete Crackers Collection</span>
            <span className="text-[#A6783B]">🌿</span>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes luxuryShine {
              0% { transform: translateX(-200%) skewX(25deg); opacity: 0; }
              5%, 15% { opacity: 1; }
              20% { transform: translateX(200%) skewX(25deg); opacity: 0; }
              100% { transform: translateX(200%) skewX(25deg); opacity: 0; }
            }
          `}} />
        </section>

        """
    
    new_content = content[:start_idx] + new_section + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced section.")
else:
    print("Markers not found.")
