import os

file_path = 'app/admin/(dashboard)/categories/components/SortCategoriesModal.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "const payload = Object.keys(selections).map(pos => ({",
    "const payload = Array.from({ length: categories.length }).map((_, pos) => ({"
)

content = content.replace(
    "id: selections[Number(pos)],",
    "id: selections[pos],"
)

content = content.replace(
    "displayOrder: Number(pos)",
    "displayOrder: pos"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
