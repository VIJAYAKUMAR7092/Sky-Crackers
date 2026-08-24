import os
file_path = 'components/public/cart/BottomCartPopup.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_button = """            <Link 
              href="/checkout"
              onClick={() => {
                // Ensure we navigate smoothly
                window.location.href = '/checkout';
              }}
              className="bg-[#e11d48] hover:bg-rose-700 text-white px-6 sm:px-10 h-10 sm:h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
            >
              <span className="hidden sm:inline">Proceed</span> <ArrowRight className="w-4 h-4" />
            </Link>"""

new_button = """            <Link 
              href="/checkout"
              onClick={() => {
                // Ensure we navigate smoothly
                window.location.href = '/checkout';
              }}
              className="bg-[#e11d48] hover:bg-rose-700 text-white px-6 sm:px-10 h-10 sm:h-12 rounded-full font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
            >
              <span className="hidden sm:inline">Proceed</span>
              <ShoppingCart className="w-4 h-4 sm:hidden" />
              <ArrowRight className="w-4 h-4" />
            </Link>"""

content = content.replace(old_button, new_button)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated BottomCartPopup")
