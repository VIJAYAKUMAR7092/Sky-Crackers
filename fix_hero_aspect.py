import os

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_aspect = 'aspect-[4/3] sm:aspect-[16/9]'
new_aspect = 'aspect-[2/1] sm:aspect-[16/9]'

content = content.replace(old_aspect, new_aspect)

# Maybe even aspect-[2.2/1]? Let's try 2/1. It will massively reduce the top and bottom gaps compared to 4/3.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated aspect ratio")
