import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the section wrapper for EXACT SHOP NOW CTA
old_section = 'className="w-full relative z-10 bg-[#FCF8E8] flex justify-center">\n          <div className="relative w-full max-w-[1400px] aspect-[1024/409]">'
new_section = 'className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center">\n          <div className="relative w-[95%] sm:w-[90%] md:w-[80%] max-w-[950px] aspect-[1024/409]">'

# Note: The original indentation might be slightly different. Let's just use regex.

content = re.sub(
    r'className="w-full relative z-10 bg-\[#FCF8E8\] flex justify-center">\s*<div className="relative w-full max-w-\[1400px\] aspect-\[1024/409\]">',
    r'className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center">\n          <div className="relative w-[95%] sm:w-[85%] md:w-[75%] max-w-[1000px] aspect-[1024/409]">',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated successfully.')
