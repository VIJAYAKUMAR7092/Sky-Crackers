import os

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_wrapper = '<section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-black">'
new_wrapper = '<section className="relative w-full overflow-hidden bg-[#050505]">'
content = content.replace(old_wrapper, new_wrapper)

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
