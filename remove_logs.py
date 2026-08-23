import os

file_path_api = 'app/api/admin/categories/reorder/route.ts'
with open(file_path_api, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("console.log('REORDER API RECEIVED BODY:', JSON.stringify(body, null, 2));", "")
content = content.replace("console.log('REORDER API UPDATED CATEGORIES:', JSON.stringify(updatedCategories, null, 2));", "")
content = content.replace("const updatedCategories = await prisma.category.findMany({\n      select: { name: true, displayOrder: true },\n      orderBy: { displayOrder: 'asc' }\n    });", "")

with open(file_path_api, 'w', encoding='utf-8') as f:
    f.write(content)

file_path_modal = 'app/admin/(dashboard)/categories/components/SortCategoriesModal.tsx'
with open(file_path_modal, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("console.log('FRONTEND SELECTIONS BEFORE SAVE:', selections);", "")

with open(file_path_modal, 'w', encoding='utf-8') as f:
    f.write(content)
