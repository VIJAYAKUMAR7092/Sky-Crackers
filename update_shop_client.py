import os
import re

with open('components/public/shop/ShopClientView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change default view to grid
content = content.replace(
    'useState<"list" | "grid">("list");',
    'useState<"list" | "grid">("grid");'
)

# Change "Showing all products" logic
old_showing_text = '''<p className="text-sm text-gray-500">
            Showing <strong className="text-gray-900 font-bold">{products.length}</strong> products
          </p>'''

new_showing_text = '''<p className="text-sm text-gray-500">
            {!categoryId ? (
              <>Showing <strong className="text-gray-900 font-bold">all</strong> products</>
            ) : (
              <>Showing <strong className="text-gray-900 font-bold">{products.length}</strong> products</>
            )}
          </p>'''

content = content.replace(old_showing_text, new_showing_text)

with open('components/public/shop/ShopClientView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
