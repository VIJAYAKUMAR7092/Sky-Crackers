import os

file_path = 'app/admin/(dashboard)/categories/components/SortCategoriesModal.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = "'use client';\n" + content

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
