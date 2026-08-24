import os

file_path = 'app/api/admin/combos/reorder/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_transaction = """    // Use a transaction to perform all updates safely
    const updates = orderedIds.map((id, index) => 
      prisma.product.update({
        where: { id },
        data: { comboOrder: index + 1 }
      })
    );

    await prisma.$transaction(updates);"""

new_transaction = """    // Use a sequential transaction with increased timeout to prevent Prisma expiration errors
    await prisma.$transaction(async (tx) => {
      for (let i = 0; i < orderedIds.length; i++) {
        await tx.product.update({
          where: { id: orderedIds[i] },
          data: { comboOrder: i + 1 }
        });
      }
    }, {
      maxWait: 5000,
      timeout: 20000,
    });"""

content = content.replace(old_transaction, new_transaction)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed combos reorder timeout")
