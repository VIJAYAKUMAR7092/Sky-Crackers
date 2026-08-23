import os

file_path = 'app/admin/(dashboard)/categories/components/SortCategoriesModal.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add log
content = content.replace(
    'const payload = Object.keys(selections).map(pos => ({',
    "console.log('FRONTEND SELECTIONS BEFORE SAVE:', selections);\n    const payload = Object.keys(selections).map(pos => ({"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
