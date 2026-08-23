import os

file_path = 'lib/services/orders/order.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update deleteOrder
old_delete = """  // Delete associated order items first to avoid foreign key constraints (if any cascade issues)
  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  await prisma.order.delete({
    where: { id },
  });"""

new_delete = """  await prisma.order.update({
    where: { id },
    data: { isDeleted: true },
  });"""

content = content.replace(old_delete, new_delete)

# Update getAdminOrders to hide deleted
content = content.replace(
    'const where: Prisma.OrderWhereInput = {};',
    'const where: Prisma.OrderWhereInput = { isDeleted: false };'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
