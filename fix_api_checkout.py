import os
import re

file_path = 'lib/services/public/checkout.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find valid product IDs before the transaction
injection = """export async function processManualCheckout(data: CheckoutInput) {
  // Validate that products exist to prevent FK errors from old cart items
  const productIds = data.items.map(item => item.productId);
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true }
  });
  const validProductIds = existingProducts.map(p => p.id);"""

content = content.replace('export async function processManualCheckout(data: CheckoutInput) {', injection)

# Update tx.order.create mapping
old_mapping = """          create: data.items.map(item => ({
            productId: item.productId,
            productName: item.productName,"""

new_mapping = """          create: data.items.map(item => ({
            productId: validProductIds.includes(item.productId) ? item.productId : null,
            productName: item.productName,"""

content = content.replace(old_mapping, new_mapping)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
