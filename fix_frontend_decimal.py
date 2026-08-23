import os

file_path = 'app/(store)/track-order/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix finalTotal
content = content.replace('order.finalTotal.toFixed(2)', 'Number(order.finalTotal || 0).toFixed(2)')

# Fix unitPrice
content = content.replace('item.unitPrice.toFixed(2)', 'Number(item.unitPrice || 0).toFixed(2)')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
