import os

file_path = 'app/admin/(dashboard)/categories/components/SortCategoriesModal.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "fetch('/api/admin/categories?limit=1000')",
    "fetch('/api/admin/categories?limit=1000', { cache: 'no-store' })"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
