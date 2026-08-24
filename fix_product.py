import os
file_path = 'app/(store)/product/[slug]/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<ProductTabs product={product} />', '<ProductTabs description={product.description} packInfo={product.packInfo} sku={product.sku} />')
content = content.replace('<ProductReviews productId={product.id} />', '<ProductReviews />')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed product page')
