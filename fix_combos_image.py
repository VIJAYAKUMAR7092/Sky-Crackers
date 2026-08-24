import os

file_path = 'components/public/home/ComboPacks.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'imageUrl: pack.image,',
    'imageUrl: pack.images?.find((img: any) => img.isPrimary)?.url || pack.images?.[0]?.url || "/placeholder.png",'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed imageUrl")
