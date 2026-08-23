import os

with open('components/public/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_banner = 'className="bg-[#2e7d32] text-white text-[10px] md:text-xs font-bold py-1 md:py-1 overflow-hidden"'
new_banner = 'className="bg-[linear-gradient(90deg,#dc2626_0%,#dc2626_70%,#ea580c_100%)] text-white text-[12px] md:text-sm font-black py-2.5 md:py-3 overflow-hidden shadow-inner"'

content = content.replace(old_banner, new_banner)

with open('components/public/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
