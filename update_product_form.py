import os

file_path = r'app/admin/(dashboard)/products/components/ProductForm.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace endpoint logic
old_fetch = "const response = await fetch(initialData ? `/api/admin/products/${initialData.id}` : '/api/admin/products',"
new_fetch = """const endpointPrefix = isCombo ? '/api/admin/combos' : '/api/admin/products';
      const response = await fetch(initialData ? `${endpointPrefix}/${initialData.id}` : endpointPrefix,"""
content = content.replace(old_fetch, new_fetch)

# Replace router.push
old_push = "router.push('/admin/products');"
new_push = "router.push(isCombo ? '/admin/combos' : '/admin/products');"
content = content.replace(old_push, new_push)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ProductForm logic for combos.")
