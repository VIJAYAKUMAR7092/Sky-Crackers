import os

# 1. Fix Shop Now Button Spacing / Cut-off
page_path = 'app/(store)/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

old_cta_section = 'className="w-full pt-8 pb-0 sm:pt-10 sm:pb-0 -mb-6 flex justify-center items-center bg-white relative z-10"'
new_cta_section = 'className="w-full pt-8 pb-4 sm:pt-10 sm:pb-6 flex justify-center items-center bg-white relative z-40"'
if old_cta_section in page_content:
    page_content = page_content.replace(old_cta_section, new_cta_section)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)


# 2. Fix Testimonials Layout
testi_path = 'components/public/home/TestimonialMarquee.tsx'
with open(testi_path, 'r', encoding='utf-8') as f:
    testi_content = f.read()

# Replace inline-block with block for the span
testi_content = testi_content.replace(
    '<span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 inline-block"',
    '<span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block w-full"'
)

# Replace inline-block with block for the h2
testi_content = testi_content.replace(
    '<h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none tracking-tighter text-primary inline-block"',
    '<h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none tracking-tighter text-primary block w-full"'
)

with open(testi_path, 'w', encoding='utf-8') as f:
    f.write(testi_content)
