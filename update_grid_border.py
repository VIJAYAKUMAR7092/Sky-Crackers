import os

file_path = 'components/public/ui/ProductCard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace border-pink-200 with border-primary
old_border = 'const cardBorderClass = inCartQty > 0 ? "border-[#22c55e]" : "border-pink-200";'
new_border = 'const cardBorderClass = inCartQty > 0 ? "border-[#22c55e]" : "border-primary/50";' 
# Using primary/50 or just primary? The pink was pink-200 which is light. But the request says "Website Primary Red". Let's use `border-primary`.
new_border = 'const cardBorderClass = inCartQty > 0 ? "border-[#22c55e]" : "border-primary";'

content = content.replace(old_border, new_border)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
