import os

with open('components/public/cart/BottomCartPopup.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'item.price * item.quantity',
    'item.product.price * item.quantity'
)

with open('components/public/cart/BottomCartPopup.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
