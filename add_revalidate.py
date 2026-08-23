import os

file_path = 'app/api/admin/categories/reorder/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

if "revalidatePath" not in content:
    content = content.replace(
        "import prisma from '@/lib/db/prisma';",
        "import prisma from '@/lib/db/prisma';\nimport { revalidatePath } from 'next/cache';"
    )
    
    content = content.replace(
        "const updatedCategories = await prisma.category.findMany({",
        "revalidatePath('/', 'layout');\n    const updatedCategories = await prisma.category.findMany({"
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
