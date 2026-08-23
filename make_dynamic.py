import os

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'export const dynamic' not in content:
    content = content.replace('export default async function HomePage()', "export const dynamic = 'force-dynamic';\n\nexport default async function HomePage()")

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
