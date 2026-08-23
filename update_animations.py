import os

with open('components/public/ui/ProductCard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_div_class = 'className={`group relative bg-white border-2 ${cardBorderClass} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-1`}'
new_div_class = 'className={`group relative bg-white border-2 ${cardBorderClass} rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_15px_40px_rgba(225,29,72,0.25)] hover:border-[#e11d48] transition-all duration-500 ease-out flex flex-col hover:-translate-y-2`}'

old_img_class = 'className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"'
new_img_class = 'className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"'

content = content.replace(old_div_class, new_div_class)
content = content.replace(old_img_class, new_img_class)

with open('components/public/ui/ProductCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
