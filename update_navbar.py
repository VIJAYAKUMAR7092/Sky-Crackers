import os

with open('components/public/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Green bar padding
content = content.replace(
    'className="bg-[#2e7d32] text-white text-[10px] md:text-xs font-bold py-2 md:py-2.5 overflow-hidden"',
    'className="bg-[#2e7d32] text-white text-[10px] md:text-xs font-bold py-1 md:py-1 overflow-hidden"'
)

# 2. Update Header padding
content = content.replace(
    'isScrolled ? "shadow-md py-2" : "py-4 border-b border-gray-100"',
    'isScrolled ? "shadow-md py-1" : "py-1.5 border-b border-gray-100"'
)

# 3. Update Logo height
content = content.replace(
    'className="relative h-12 w-40 md:h-14 md:w-48 transition-transform duration-300"',
    'className="relative h-9 w-32 md:h-11 md:w-40 transition-transform duration-300"'
)

with open('components/public/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
