import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

left_old = 'className="object-contain object-left sm:object-left-bottom"'
left_new = 'className="object-contain object-left sm:object-left-bottom animate-[luxuryFloat_4s_ease-in-out_infinite] drop-shadow-[0_10px_20px_rgba(228,165,38,0.5)] scale-105"'
content = content.replace(left_old, left_new)

right_old = 'className="object-contain object-right sm:object-right-bottom"'
right_new = 'className="object-contain object-right sm:object-right-bottom animate-[luxuryFloat_5s_ease-in-out_infinite_1s] drop-shadow-[0_10px_20px_rgba(228,165,38,0.5)] scale-105"'
content = content.replace(right_old, right_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated animations')
