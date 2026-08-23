import os

file_path = 'app/(store)/checkout/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the outer background
content = content.replace('className="bg-pink-50/30 min-h-screen pt-8 pb-24"', 'className="bg-[#050505] min-h-screen pt-8 pb-24 text-white"')

# Replace the progress bar colors
content = content.replace('bg-pink-200', 'bg-white/10')
content = content.replace('text-primary', 'text-yellow-500')
content = content.replace('text-orange-600', 'text-yellow-400')
content = content.replace('bg-orange-500', 'bg-yellow-500')

# Replace error box
content = content.replace('bg-red-50 text-red-600 p-4 rounded-xl border border-red-100', 'bg-red-900/30 text-red-400 p-4 rounded-xl border border-red-500/30')

# Replace forms & left column items
content = content.replace('bg-white rounded-2xl border border-pink-200 shadow-sm', 'bg-[#111] rounded-2xl border border-white/10 shadow-lg')
content = content.replace('text-gray-900', 'text-white')
content = content.replace('text-primary', 'text-yellow-500')
content = content.replace('text-gray-500', 'text-gray-400')
content = content.replace('bg-pink-50', 'bg-white/5')
content = content.replace('border-pink-200', 'border-white/10')
content = content.replace('border-gray-100', 'border-white/10')

# Right column order summary
content = content.replace('bg-white rounded-2xl shadow-xl border border-pink-100', 'bg-[#111] rounded-2xl shadow-2xl border border-white/10')
content = content.replace('bg-pink-50/50 p-4 sm:p-5 border-t border-pink-100', 'bg-[#0a0a0a] p-4 sm:p-5 border-t border-white/10')
content = content.replace('border-pink-50', 'border-white/10')
content = content.replace('bg-[#0f0a1c]', 'bg-[#1a1a1a]')

# Buttons
content = content.replace('bg-[#f63d68] hover:bg-[#d62d53]', 'bg-yellow-500 hover:bg-yellow-400 text-black')
content = content.replace('bg-orange-600 hover:bg-orange-700', 'bg-yellow-500 hover:bg-yellow-400 text-black')
content = content.replace('text-white py-3.5', 'text-black py-3.5') # Because the buttons were text-white and we changed them to text-black 

content = content.replace('bg-pink-50 hover:bg-pink-100 text-gray-700', 'bg-white/10 hover:bg-white/20 text-white')
content = content.replace('bg-pink-50 hover:bg-red-50 hover:text-red-600 text-primary border border-pink-100', 'bg-white/5 hover:bg-red-900/30 hover:text-red-400 text-yellow-500 border border-white/10')


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
