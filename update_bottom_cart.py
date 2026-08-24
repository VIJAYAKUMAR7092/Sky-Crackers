import os

file_path = 'components/public/cart/BottomCartPopup.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_checkout = """          {/* Right: Checkout Button */}
          <Link 
            href="/checkout"
            onClick={() => {
              // Ensure we navigate smoothly
              window.location.href = '/checkout';
            }}
            className="bg-[#e11d48] hover:bg-rose-700 text-white px-6 sm:px-10 h-10 sm:h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
          >
            <span className="hidden sm:inline">Proceed</span> <ArrowRight className="w-4 h-4" />
          </Link>"""

new_checkout = """          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Only: Cart Button */}
            <Link
              href="/cart"
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-800 border border-gray-700 text-gray-200 rounded-full hover:bg-gray-700 transition-all shadow-sm"
              title="View Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </Link>

            {/* Right: Checkout Button */}
            <Link 
              href="/checkout"
              onClick={() => {
                // Ensure we navigate smoothly
                window.location.href = '/checkout';
              }}
              className="bg-[#e11d48] hover:bg-rose-700 text-white px-6 sm:px-10 h-10 sm:h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
            >
              <span className="hidden sm:inline">Proceed</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>"""

content = content.replace(old_checkout, new_checkout)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BottomCartPopup")
