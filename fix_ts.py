import os

file_path = 'components/admin/dashboard/SalesOverviewChart.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Tooltip formatter type
old_formatter = "formatter={(value: number, name: string) => ["
new_formatter = "formatter={(value: any, name: any) => ["

if old_formatter in content:
    content = content.replace(old_formatter, new_formatter)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
