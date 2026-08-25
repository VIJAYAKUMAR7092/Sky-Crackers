import re

file_path = 'lib/services/orders/order.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace sequential queries with Promise.all
content = re.sub(
    r'const total = await prisma\.order\.count\(\{ where \}\);\s*const orders = await prisma\.order\.findMany\(',
    r'const [total, orders] = await Promise.all([\n    prisma.order.count({ where }),\n    prisma.order.findMany(',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated order.service.ts")
