import os

file_path = 'app/(store)/track-order/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Payment Method line
line_to_remove = "<p><span className=\"font-medium text-gray-900\">Method:</span> {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : order.paymentMethod}</p>"
content = content.replace(line_to_remove, '')

# Rename "Payment & Items" to "Order Items"
content = content.replace('<CreditCard className="w-4 h-4 text-primary" /> Payment & Items', '<CreditCard className="w-4 h-4 text-primary" /> Order Items')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
