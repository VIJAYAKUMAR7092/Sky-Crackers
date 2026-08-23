import os

with open('app/(store)/shop/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Forcefully hide the sidebar on mobile with !hidden lg:!block
content = content.replace(
    'className="hidden lg:block w-72 shrink-0"',
    'className="!hidden lg:!block w-72 shrink-0"'
)

with open('app/(store)/shop/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
