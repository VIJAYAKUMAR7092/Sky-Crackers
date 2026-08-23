import os

file_path = 'app/admin/(dashboard)/categories/[id]/edit/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix params signature and access
content = content.replace(
    'export default async function EditCategoryPage({ params }: { params: { id: string } }) {',
    'export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {\n  const resolvedParams = await params;'
)
content = content.replace('params.id', 'resolvedParams.id')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
