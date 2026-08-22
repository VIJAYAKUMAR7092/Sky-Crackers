import re
import os

filepath = 'app/(store)/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
if 'import BrandMarquee' not in content:
    content = content.replace(
        'import HeroSlider from "@/components/public/home/HeroSlider";',
        'import HeroSlider from "@/components/public/home/HeroSlider";\nimport BrandMarquee from "@/components/public/home/BrandMarquee";\nimport ComboPacks from "@/components/public/home/ComboPacks";\nimport TestimonialMarquee from "@/components/public/home/TestimonialMarquee";'
    )

# 2. Brand Marquee
if '<BrandMarquee />' not in content:
    content = content.replace(
        '<HeroSlider banners={displayBanners} />\n      </section>',
        '<HeroSlider banners={displayBanners} />\n      </section>\n\n      <BrandMarquee />'
    )

# 3. Combo Packs
if '<ComboPacks />' not in content:
    content = content.replace(
        '        </div>\n      </section>\n\n      {/* 3. CATEGORIES SECTION */}',
        '        </div>\n      </section>\n\n      <ComboPacks />\n\n      {/* 3. CATEGORIES SECTION */}'
    )

# 4. Exclusive Discount Banner removal
start_banner = '{/* 4. EXCLUSIVE DISCOUNT BANNER */}'
end_banner = '{/* 5. FEATURED PRODUCTS */}'
start_idx = content.find(start_banner)
end_idx = content.find(end_banner)
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

# 5. Testimonials Marquee substitution
start_test = '{/* 7. TESTIMONIALS SECTION */}'
end_test = '    </div>\n  );\n}'
start_test_idx = content.find(start_test)
if start_test_idx != -1:
    content = content[:start_test_idx] + start_test + '\n      <TestimonialMarquee />\n\n' + end_test

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Success fully fixed page.tsx')
