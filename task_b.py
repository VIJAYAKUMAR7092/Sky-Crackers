import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_cta_section = """{/* 2. PREMIUM SHOP NOW CTA */}
          <section className="w-full pt-8 pb-3 sm:pt-12 sm:pb-5 flex justify-center items-center bg-white relative 
z-10">"""
old_cta_section = old_cta_section.replace('\nz-10">', ' z-10">')

# Wait, let's just use string replace for the class name.
if 'pt-8 pb-3 sm:pt-12 sm:pb-5' in content:
    content = content.replace('pt-8 pb-3 sm:pt-12 sm:pb-5', 'pt-8 pb-0 sm:pt-10 sm:pb-0 -mb-6')

# Update shimmer class
if '<span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2.5s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"></span>' in content:
    content = content.replace(
        '<span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2.5s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"></span>',
        '<span className="absolute top-0 -left-[100%] h-full w-[200%] block animate-[shimmer_2.5s_infinite_linear] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 z-0"></span>'
    )

# Update shimmer keyframes
old_shimmer_kf = """@keyframes shimmer {
              0% { transform: translateX(-150%) skewX(12deg); }
              50%, 100% { transform: translateX(150%) skewX(12deg); }
            }"""
new_shimmer_kf = """@keyframes shimmer {
              0% { transform: translateX(-50%) skewX(20deg); }
              100% { transform: translateX(150%) skewX(20deg); }
            }"""
if old_shimmer_kf in content:
    content = content.replace(old_shimmer_kf, new_shimmer_kf)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
