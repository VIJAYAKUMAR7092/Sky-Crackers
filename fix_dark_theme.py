import os
import glob

files = glob.glob('app/admin/**/*.tsx', recursive=True)
files.extend(glob.glob('components/admin/**/*.tsx', recursive=True))

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    content = content.replace('bg-white', 'bg-background')
    content = content.replace('bg-gray-50', 'bg-muted')
    content = content.replace('bg-slate-50', 'bg-muted')
    content = content.replace('bg-slate-100', 'bg-muted/50')
    content = content.replace('text-gray-900', 'text-foreground')
    content = content.replace('text-gray-800', 'text-foreground')
    content = content.replace('text-gray-500', 'text-muted-foreground')
    content = content.replace('text-slate-500', 'text-muted-foreground')
    content = content.replace('border-gray-200', 'border-border')
    content = content.replace('border-slate-200', 'border-border')
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

print("Done")
