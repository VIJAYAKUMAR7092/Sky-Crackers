import os

file_path = 'app/(store)/checkout/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('className="w-full border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white', 'className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white')
content = content.replace('className="flex-1 w-full border border-white/10 rounded-r-lg px-3 py-2.5 text-sm text-white', 'className="flex-1 w-full bg-white/5 border border-white/10 rounded-r-lg px-3 py-2.5 text-sm text-white')

# Fix select background
content = content.replace('bg-white"', 'bg-[#1a1a1a]"')

# Fix textareas
content = content.replace('rows={1} className="w-full border border-white/10', 'rows={1} className="w-full bg-white/5 border border-white/10')
content = content.replace('rows={3} className="w-full border border-white/10', 'rows={3} className="w-full bg-white/5 border border-white/10')

# Fix the +91 prefix block which was bg-pink-50
content = content.replace('bg-white/5 text-yellow-500 rounded-l-lg', 'bg-white/10 text-yellow-500 rounded-l-lg')

# Fix the "Notes" background for confirmation section which was bg-gray-50
content = content.replace('bg-gray-50 p-2', 'bg-white/5 p-2')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
