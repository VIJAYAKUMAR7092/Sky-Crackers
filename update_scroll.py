import os

# 1. Update Navbar Mobile Menu
navbar_path = 'components/public/layout/Navbar.tsx'
with open(navbar_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_menu_class = "`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`"
new_menu_class = "`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[calc(100vh-80px)] overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`"

content = content.replace(old_menu_class, new_menu_class)

# 2. Update phone number in Navbar
content = content.replace('6383511818', '9042849344')
content = content.replace('63835 11818', '90428 49344')

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(content)

# 3. Update phone number in Footer
footer_path = 'components/public/layout/Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()
    
footer_content = footer_content.replace('6383511818', '9042849344')
footer_content = footer_content.replace('63835 11818', '90428 49344')

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(footer_content)

# 4. Update phone number in page.tsx
page_path = 'app/(store)/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()
    
page_content = page_content.replace('6383511818', '9042849344')
page_content = page_content.replace('63835 11818', '90428 49344')

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)
    
print("Updated scroll and phone numbers")
