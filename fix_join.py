import re

file_path = 'lib/services/products/product.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'\s*category:\s*\{\s*select:\s*\{\s*name:\s*true,\s*id:\s*true\s*\},\s*\},?',
    '',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed category join")
