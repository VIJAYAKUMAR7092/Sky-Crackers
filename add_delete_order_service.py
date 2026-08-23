import os

file_path = 'lib/services/orders/order.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_method = """
export async function deleteOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Delete associated order items first to avoid foreign key constraints (if any cascade issues)
  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  await prisma.order.delete({
    where: { id },
  });

  return { success: true, message: 'Order deleted successfully' };
}
"""
content = content + "\n" + new_method

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
