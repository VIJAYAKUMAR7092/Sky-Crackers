import os

file_path = 'app/api/track-order/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'paymentMethod: true,\n        deliverySnapshot: true,',
    'paymentMethod: true,\n        isDeleted: true,\n        deliverySnapshot: true,'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
