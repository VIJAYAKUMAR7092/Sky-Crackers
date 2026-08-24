import os

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_image_class = 'className="object-contain z-10 relative drop-shadow-xl md:drop-shadow-none"'
new_image_class = 'className="object-contain md:object-cover md:object-center z-10 relative drop-shadow-xl md:drop-shadow-none"'

old_aspect = 'aspect-[2/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] xl:aspect-[10/3] 2xl:aspect-[4/1]'
new_aspect = 'aspect-[2/1] sm:aspect-[16/9] md:aspect-[2.5/1] lg:aspect-[2.5/1] xl:aspect-[3/1] 2xl:aspect-[3/1]'

content = content.replace(old_image_class, new_image_class)
content = content.replace(old_aspect, new_aspect)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HeroSlider to use object-cover on desktop.")
