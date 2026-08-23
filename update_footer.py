import os

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'src={settings?.logoUrl || "/images/sky-crackers-logo.png"}',
    'src="/images/sky-crackers-logo.png"'
)

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
