import os

# Fix page.tsx
page_path = 'app/admin/(dashboard)/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('stats.orders.toLocaleString()', 'stats.totalOrders.toLocaleString()')
content = content.replace('stats.products.toLocaleString()', 'stats.totalProducts.toLocaleString()')
content = content.replace('stats.customers.toLocaleString()', 'stats.totalCustomers.toLocaleString()')
if '<Sparkles' in content and 'Sparkles' not in content[:content.find('export default')]:
    content = content.replace('import { IndianRupee', 'import { Sparkles, IndianRupee')

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Fix ComboPacks.tsx
combo_path = 'components/public/home/ComboPacks.tsx'
with open(combo_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src={primaryImg}', 'src={pack.images?.find((img: any) => img.isPrimary)?.url || pack.images?.[0]?.url || "/placeholder.png"}')

with open(combo_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed build errors")
