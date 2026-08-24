import os

file_path = 'app/api/admin/categories/reorder/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_transaction = """    // Update in transaction
    await prisma.$transaction(
      body.map((item: { id: string; displayOrder: number }) => 
        prisma.category.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        })
      )
    );"""

new_transaction = """    // Execute sequentially inside a transaction with a higher timeout 
    // to avoid connection pool exhaustion and 5000ms timeout issues
    await prisma.$transaction(async (tx) => {
      for (const item of body) {
        await tx.category.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        });
      }
    }, {
      maxWait: 5000,
      timeout: 20000,
    });"""

content = content.replace(old_transaction, new_transaction)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed categories reorder timeout")
