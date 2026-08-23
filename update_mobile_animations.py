import os

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add style tag for automatic animations
style_tag = """
  return (
    <div className="flex flex-col w-full bg-white text-gray-900 font-sans overflow-x-hidden max-w-[100vw]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatMobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes breatheMobile {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}} />
"""

content = content.replace('  return (\n    <div className="flex flex-col w-full bg-white text-gray-900 font-sans overflow-x-hidden max-w-[100vw]">', style_tag)

# Replace the feature cards to add animation
old_truck = '<Truck className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />'
new_truck = '<Truck className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors animate-[floatMobile_3s_infinite] md:animate-none" />'
content = content.replace(old_truck, new_truck)

old_sparkles = '<Sparkles className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />'
new_sparkles = '<Sparkles className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors animate-[floatMobile_3.5s_infinite] md:animate-none" />'
content = content.replace(old_sparkles, new_sparkles)

old_package = '<Package className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />'
new_package = '<Package className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors animate-[floatMobile_4s_infinite] md:animate-none" />'
content = content.replace(old_package, new_package)

old_clock = '<Clock className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />'
new_clock = '<Clock className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors animate-[floatMobile_3.2s_infinite] md:animate-none" />'
content = content.replace(old_clock, new_clock)

# Replace category images to add animation
old_cat_img = 'className="object-cover transition-transform duration-500 group-hover:scale-110"'
new_cat_img = 'className="object-cover transition-transform duration-500 animate-[breatheMobile_5s_infinite] md:animate-none md:group-hover:scale-110"'
content = content.replace(old_cat_img, new_cat_img)


with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
