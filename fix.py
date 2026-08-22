import re

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'import HeroSlider from "@/components/public/home/HeroSlider";',
    'import HeroSlider from "@/components/public/home/HeroSlider";\nimport BrandMarquee from "@/components/public/home/BrandMarquee";\nimport ComboPacks from "@/components/public/home/ComboPacks";\nimport TestimonialMarquee from "@/components/public/home/TestimonialMarquee";'
)

content = content.replace(
    '<HeroSlider banners={heroBanners} />\n      </section>',
    '<HeroSlider banners={heroBanners} />\n      </section>\n\n      <BrandMarquee />'
)

content = content.replace(
    '        </section>\n\n        {/* 3. CATEGORIES SECTION */}',
    '        </section>\n\n      {/* NEW COMBO PACKS SECTION */}\n      <ComboPacks />\n\n        {/* 3. CATEGORIES SECTION */}'
)

start_str = '{/* 7. TESTIMONIALS SECTION */}'
end_str = '{/* 8. BRANDS OR BOTTOM BANNER? */}'
start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + start_str + '\n      <TestimonialMarquee />\n\n      ' + content[end_idx:]

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
