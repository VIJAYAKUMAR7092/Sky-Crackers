import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace:
#           </section>
#   
#           <section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">
# with:
#           </section>
#
#       <BrandMarquee />
#   
#           <section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">

target = '          </section>\n  \n          <section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">'
replacement = '          </section>\n\n      <BrandMarquee />\n  \n          <section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">'

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added BrandMarquee back.")
else:
    print("Target not found. Let's try regex.")
    
    # regex fallback
    target2 = r'</section>\s*<section className="py-10 sm:py-12 bg-white relative z-30'
    match = re.search(target2, content)
    if match:
        content = content[:match.start()] + '</section>\n\n      <BrandMarquee />\n\n      <section className="py-10 sm:py-12 bg-white relative z-30' + content[match.end():]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Added BrandMarquee back via regex.")
    else:
        print("Regex target not found either.")

