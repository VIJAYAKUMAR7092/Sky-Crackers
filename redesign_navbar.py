import os

file_path = 'components/admin/layout/TopNavbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace background
content = content.replace('bg-background/80', 'bg-white')
content = content.replace('border-border', 'border-gray-200')
content = content.replace('bg-card', 'bg-white')
content = content.replace('border-border/50', 'border-gray-200')
content = content.replace('text-foreground', 'text-gray-900')
content = content.replace('text-muted-foreground', 'text-gray-500')
content = content.replace('bg-primary', 'bg-red-600')
content = content.replace('text-primary', 'text-red-600')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
