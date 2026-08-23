import os

file_path = 'app/(store)/checkout/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace main backgrounds
content = content.replace('bg-pink-50/30', 'bg-white')
content = content.replace('bg-white/5', 'bg-red-50')
content = content.replace('bg-[#111]', 'bg-white')

# Replace orange text with red
content = content.replace('text-orange-600', 'text-red-600')
content = content.replace('text-orange-700', 'text-red-700')
content = content.replace('bg-orange-500', 'bg-red-600')
content = content.replace('bg-orange-600', 'bg-red-600')
content = content.replace('hover:bg-orange-700', 'hover:bg-red-700')
content = content.replace('shadow-orange-500/30', 'shadow-red-500/30')
content = content.replace('bg-orange-50', 'bg-red-50')
content = content.replace('border-orange-100', 'border-red-100')

# Replace pink borders/bgs with red equivalents
content = content.replace('border-pink-200', 'border-red-200')
content = content.replace('border-pink-100', 'border-red-100')
content = content.replace('bg-pink-200', 'bg-red-200')
content = content.replace('bg-pink-50', 'bg-red-50')
content = content.replace('bg-pink-100', 'bg-red-100')

# Button that was #f63d68
content = content.replace('bg-[#f63d68]', 'bg-gradient-to-r from-red-600 to-red-500')
content = content.replace('hover:bg-[#d62d53]', 'hover:from-red-700 hover:to-red-600')
content = content.replace('shadow-pink-500/30', 'shadow-red-500/30')

# Make sure primary text aligns with Red (70% Red)
# The user wants "70% red, 30% orange combo". A gradient is perfect for buttons.
# For text, we can use a strong red like text-red-600 or text-[#e11d48].
content = content.replace('text-primary', 'text-red-600')
content = content.replace('bg-primary', 'bg-gradient-to-r from-red-600 to-orange-500')
content = content.replace('focus:border-primary', 'focus:border-red-600')
content = content.replace('focus:ring-primary', 'focus:ring-red-600')

# Replace the "Order Summary" dark header 
content = content.replace('bg-[#0f0a1c]', 'bg-gradient-to-r from-red-600 to-orange-500')

# One more check for the gradient button in Confirm step
content = content.replace('bg-red-600 hover:bg-red-700 text-white py-3.5', 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3.5')


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
