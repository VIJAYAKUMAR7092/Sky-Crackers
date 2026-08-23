import os

with open('components/public/home/HeroSlider.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_btn_class = 'className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 group/btn flex items-center gap-2 sm:gap-3 px-6 py-2.5 sm:px-8 sm:py-3.5 bg-black/40 hover:bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 rounded-full transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-1 active:scale-95 overflow-hidden"'
new_btn_class = 'className="absolute bottom-3 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 group/btn flex items-center gap-1.5 px-4 py-1.5 sm:px-6 sm:py-2 bg-[#050505]/60 hover:bg-[#000000] backdrop-blur-xl border border-white/20 hover:border-[#D4AF37] rounded-full transition-all duration-500 ease-out shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 active:scale-95 overflow-hidden"'
content = content.replace(old_btn_class, new_btn_class)

old_text = 'className="relative z-10 text-white font-extrabold text-[11px] sm:text-sm tracking-[0.2em] uppercase flex items-center gap-2 drop-shadow-md"'
new_text = 'className="relative z-10 text-white font-bold text-[9px] sm:text-xs tracking-widest uppercase flex items-center gap-1.5"'
content = content.replace(old_text, new_text)

with open('components/public/home/HeroSlider.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
