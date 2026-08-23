import os

with open('components/public/cart/BottomCartPopup.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to remove the "View Cart" button link
old_link = """            <Link 
              href="/cart"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="View Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>"""

new_link = ""

content = content.replace(old_link, new_link)

with open('components/public/cart/BottomCartPopup.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
