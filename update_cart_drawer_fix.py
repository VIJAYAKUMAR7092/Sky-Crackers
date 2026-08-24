import re

# 1. Update BottomCartPopup.tsx
file_path_popup = 'components/public/cart/BottomCartPopup.tsx'
with open(file_path_popup, 'r', encoding='utf-8') as f:
    popup_content = f.read()

# I will use a simple regex to replace the <Link href="/cart">...<ShoppingCart...></Link> block with a button.
pattern = re.compile(r'<Link\s+href="\/cart"\s+className="sm:hidden[^>]+>\s*<ShoppingCart[^>]+>\s*<\/Link>', re.DOTALL)

new_button = """<button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-cart-drawer'));
                }}
                className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-800 border border-gray-700 text-gray-200 rounded-full hover:bg-gray-700 transition-all shadow-sm"
                title="View Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>"""

if pattern.search(popup_content):
    popup_content = pattern.sub(new_button, popup_content)
    with open(file_path_popup, 'w', encoding='utf-8') as f:
        f.write(popup_content)
    print("Replaced button in BottomCartPopup.tsx")
else:
    print("Could not find the link pattern in BottomCartPopup.tsx")

