import re

file_path = 'app/admin/(dashboard)/products/components/ProductClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'\s+\];\s+const searchParamFilters',
    '\n    ], [router]);\n\n  const searchParamFilters',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed columns end again")
