import os

file_path = 'components/public/ui/ProductCard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make a series of replacements
replacements = {
    'bg-pink-500': 'bg-primary',
    'text-pink-500': 'text-primary',
    'border-pink-500': 'border-primary',
    'border-pink-200': 'border-primary/30',
    'bg-pink-50': 'bg-red-50',
    'hover:bg-pink-100': 'hover:bg-red-100',
    'rgba(225,29,72,0.25)': 'rgba(223,38,12,0.25)',
    'hover:border-[#e11d48]': 'hover:border-primary',
}

for old_str, new_str in replacements.items():
    content = content.replace(old_str, new_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
