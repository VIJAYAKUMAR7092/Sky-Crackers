import os
import re

file_path = r'components/public/home/ComboPacks.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the hardcoded comboPacks array completely
content = re.sub(r'const comboPacks = \[.*?\];', '', content, flags=re.DOTALL)

# Change usage of comboPacks to combos
content = content.replace('{comboPacks.map((pack) => (', '{combos.map((pack) => (')

# Replace any usage of pack.image with the primary image URL
# The old hardcoded packs had pack.image as string, Prisma products have pack.images[0]?.url
# Also, MRp and sellingPrice etc.
def fix_map(match):
    return """{combos.map((pack) => {
            const primaryImg = pack.images?.find((img: any) => img.isPrimary)?.url || pack.images?.[0]?.url || '/placeholder.png';
            return (
              <div 
                key={pack.id} """

content = content.replace('{combos.map((pack) => (\n              <div \n                key={pack.id} ', fix_map(None))
content = content.replace('src={pack.image}', 'src={primaryImg}')
content = content.replace('price: pack.price', 'price: Number(pack.sellingPrice)')
content = content.replace('mrp: pack.mrp', 'mrp: Number(pack.mrp)')
content = content.replace('₹{pack.mrp.toLocaleString()}', '₹{Number(pack.mrp).toLocaleString()}')
content = content.replace('₹{pack.price.toLocaleString()}', '₹{Number(pack.sellingPrice).toLocaleString()}')

# Ensure the last closing brace for map is replaced properly
content = content.replace('</div>\n            ))\n          </div>', '</div>\n            );})}\n          </div>')
content = content.replace('</div>\n            ))}', '</div>\n            );})}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ComboPacks")
