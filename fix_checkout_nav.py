import os

with open('components/public/cart/BottomCartPopup.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_checkout = """          {/* Right: Checkout Button */}
          <Link 
            href="/checkout"
            className="bg-[#e11d48] hover:bg-rose-700 text-white px-6 sm:px-10 h-10 sm:h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
          >
            <span className="hidden sm:inline">Proceed to</span> Checkout <ArrowRight className="w-4 h-4" />
          </Link>"""

new_checkout = """          {/* Right: Checkout Button */}
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

content = content.replace(old_checkout, new_checkout)

with open('components/public/cart/BottomCartPopup.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
