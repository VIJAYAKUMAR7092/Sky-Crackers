import os

file_path = 'lib/services/orders/order.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("throw new AppError('Order not found', 404);", "throw new AppError('Order not found', 'NOT_FOUND', 404);")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
