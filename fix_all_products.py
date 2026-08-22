import re

with open('app/(store)/shop/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the span with totalProductsCount for All Products in page.tsx
pattern = r'<span>All Products</span>\s*<span[^>]*>{totalProductsCount}</span>'
content = re.sub(pattern, '<span>All Products</span>', content)

with open('app/(store)/shop/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('components/public/shop/ShopClientView.tsx', 'r', encoding='utf-8') as f:
    content2 = f.read()

# Remove the span with totalProductsCount for All in ShopClientView.tsx
pattern2 = r'<span>All</span>\s*<span[^>]*>\s*{totalProductsCount}\s*</span>'
content2 = re.sub(pattern2, '<span>All</span>', content2)

with open('components/public/shop/ShopClientView.tsx', 'w', encoding='utf-8') as f:
    f.write(content2)
