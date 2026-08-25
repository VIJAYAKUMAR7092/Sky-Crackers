import re

# File 1: ProductCard.tsx
file_path1 = 'components/public/ui/ProductCard.tsx'
with open(file_path1, 'r', encoding='utf-8') as f:
    content1 = f.read()

# Replace <Link href={`/product/${product.slug}`} className="mb-2">
# with <div className="mb-2">
# And the closing </Link> with </div>
content1 = re.sub(r'<Link href=\{`/product/\$\{product\.slug\}`\} className="mb-2">\s*(<h3.*?>\s*\{product\.name\}\s*</h3>)\s*</Link>', 
                  r'<div className="mb-2">\n          \1\n        </div>', 
                  content1, flags=re.DOTALL)

with open(file_path1, 'w', encoding='utf-8') as f:
    f.write(content1)
print("Updated ProductCard.tsx")


# File 2: FeaturedProductCard.tsx
file_path2 = 'components/public/home/FeaturedProductCard.tsx'
with open(file_path2, 'r', encoding='utf-8') as f:
    content2 = f.read()

# Replace Link around image
content2 = re.sub(r'<Link href=\{`/product/\$\{product\.slug\}`\} (className="relative h-48 sm:h-56.*?">\s*<Image.*?>\s*)</Link>',
                  r'<div \1</div>',
                  content2, flags=re.DOTALL)

# Replace Link around title
content2 = re.sub(r'<Link href=\{`/product/\$\{product\.slug\}`\}>\s*(<h3.*?>\s*\{product\.name\}\s*</h3>)\s*</Link>',
                  r'<div>\n            \1\n          </div>',
                  content2, flags=re.DOTALL)

with open(file_path2, 'w', encoding='utf-8') as f:
    f.write(content2)
print("Updated FeaturedProductCard.tsx")
