import re

file_path = 'app/admin/(dashboard)/products/components/ProductClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("    ];\n\n  const searchParamFilters", "    ], [router]);\n\n  const searchParamFilters")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed columns end")
