import re

with open('app/(store)/shop/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<aside className="w-full lg:w-72 shrink-0">', '<aside className="hidden lg:block w-72 shrink-0">')

with open('app/(store)/shop/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
