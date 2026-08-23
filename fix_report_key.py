import os

file_path = 'app/admin/(dashboard)/reports/components/ReportClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace key={p.productId} with safe fallback
content = content.replace('key={p.productId}', 'key={p.productId || `best-selling-${i}`}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
