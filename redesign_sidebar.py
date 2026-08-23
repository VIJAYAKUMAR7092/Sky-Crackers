import os

file_path = 'components/admin/layout/Sidebar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the sidebar bright white instead of bg-card/95
content = content.replace('bg-card/95', 'bg-white')
content = content.replace('bg-background/50', 'bg-white')
content = content.replace('border-border/50', 'border-gray-200')
content = content.replace('text-muted-foreground', 'text-gray-500')
content = content.replace('text-foreground', 'text-gray-900')
content = content.replace('from-foreground to-foreground/70', 'from-gray-900 to-gray-700')
content = content.replace('hover:bg-secondary/60', 'hover:bg-red-50')
content = content.replace('bg-primary/10', 'bg-red-50')
content = content.replace('text-primary', 'text-red-600')
content = content.replace('bg-primary', 'bg-red-600')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
