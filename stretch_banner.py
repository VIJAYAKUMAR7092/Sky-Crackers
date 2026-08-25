import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace:
#           <section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center">
#             <div className="relative w-[95%] sm:w-[85%] md:w-[75%] max-w-[1000px] aspect-[1024/409]">
#
# with:
#           <section className="w-full py-1 sm:py-2 relative z-10 bg-[#FCF8E8] flex justify-center">
#             <div className="relative w-full max-w-[1200px] aspect-[1024/409]">

old_str = r'          <section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-\[#FCF8E8\] flex justify-center">\s*<div className="relative w-\[95%\] sm:w-\[85%\] md:w-\[75%\] max-w-\[1000px\] aspect-\[1024/409\]">'
new_str = '          <section className="w-full py-1 relative z-10 bg-[#FCF8E8] flex justify-center">\n            <div className="relative w-full max-w-[1200px] aspect-[1024/409]">'

content = re.sub(old_str, new_str, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully.")
