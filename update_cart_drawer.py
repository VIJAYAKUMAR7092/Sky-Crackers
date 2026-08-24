import re

# 1. Update BottomCartPopup.tsx
file_path_popup = 'components/public/cart/BottomCartPopup.tsx'
with open(file_path_popup, 'r', encoding='utf-8') as f:
    popup_content = f.read()

# Replace Link href="/cart" with button
old_button = """              {/* Mobile Only: Cart Button */}
              <Link
                href="/cart"
                className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-800 border border-gray-700 text-gray-200 rounded-full hover:bg-gray-700 transition-all shadow-sm"
                title="View Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </Link>"""

new_button = """              {/* Mobile Only: Cart Button */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-cart-drawer'));
                }}
                className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-800 border border-gray-700 text-gray-200 rounded-full hover:bg-gray-700 transition-all shadow-sm"
                title="View Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>"""

popup_content = popup_content.replace(old_button, new_button)
with open(file_path_popup, 'w', encoding='utf-8') as f:
    f.write(popup_content)


# 2. Update Navbar.tsx
file_path_navbar = 'components/public/layout/Navbar.tsx'
with open(file_path_navbar, 'r', encoding='utf-8') as f:
    nav_content = f.read()

# Add event listener to Navbar
# Find: const handleScroll = () => {
old_scroll = "const handleScroll = () => {"
new_scroll = """
    const handleOpenCart = () => setCartOpen(true);
    window.addEventListener('open-cart-drawer', handleOpenCart);

    const handleScroll = () => {"""
nav_content = nav_content.replace(old_scroll, new_scroll)

# Add cleanup
old_cleanup = "window.removeEventListener(\"scroll\", handleScroll);"
new_cleanup = """window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('open-cart-drawer', handleOpenCart);"""
nav_content = nav_content.replace(old_cleanup, new_cleanup)


# Fix the Contact/Phone Numbers Layer to be split into Desktop (Static) and Mobile (Marquee)
old_top_bar = """{/* Contact/Phone Numbers Layer */}
          <div className="bg-gray-100 border-b border-gray-200 py-1.5 md:py-2 overflow-hidden w-full relative">
            <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
              {/* Duplicate the items to create a seamless infinite marquee */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-10 md:gap-16 px-3 sm:px-5 md:px-8">
                  <a href="tel:+919042849344" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
                    <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                      <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 90428 49344</span>
                  </a>
                  <a href="tel:+916383828284" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
                    <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                      <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 63838 28284</span>
                  </a>
                  <a href="tel:+919344745092" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
                    <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                      <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 93447 45092</span>
                  </a>
                </div>
              ))}
            </div>
          </div>"""

new_top_bar = """{/* Contact/Phone Numbers Layer */}
          
          {/* Desktop View (Static) */}
          <div className="hidden md:block bg-gray-100 border-b border-gray-200 py-2">
            <div className="flex items-center justify-center gap-10 max-w-7xl mx-auto">
              <a href="tel:+919042849344" className="flex items-center gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
                <div className="bg-[#dc2626]/10 p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                  <PhoneCall className="w-4 h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                </div>
                <span className="text-sm font-bold tracking-wide">+91 90428 49344</span>
              </a>
              <a href="tel:+916383828284" className="flex items-center gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
                <div className="bg-[#dc2626]/10 p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                  <PhoneCall className="w-4 h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                </div>
                <span className="text-sm font-bold tracking-wide">+91 63838 28284</span>
              </a>
              <a href="tel:+919344745092" className="flex items-center gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
                <div className="bg-[#dc2626]/10 p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                  <PhoneCall className="w-4 h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                </div>
                <span className="text-sm font-bold tracking-wide">+91 93447 45092</span>
              </a>
            </div>
          </div>

          {/* Mobile View (Marquee) */}
          <div className="md:hidden bg-gray-100 border-b border-gray-200 py-1.5 overflow-hidden w-full relative">
            <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {/* Duplicate the items to create a seamless infinite marquee */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 px-3">
                  <a href="tel:+919042849344" className="flex items-center gap-1.5 group text-gray-800 hover:text-[#dc2626] transition-colors">
                    <div className="bg-[#dc2626]/10 p-1 rounded-full group-hover:bg-[#dc2626] transition-colors">
                      <PhoneCall className="w-3 h-3 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-wide">+91 90428 49344</span>
                  </a>
                  <a href="tel:+916383828284" className="flex items-center gap-1.5 group text-gray-800 hover:text-[#dc2626] transition-colors">
                    <div className="bg-[#dc2626]/10 p-1 rounded-full group-hover:bg-[#dc2626] transition-colors">
                      <PhoneCall className="w-3 h-3 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-wide">+91 63838 28284</span>
                  </a>
                  <a href="tel:+919344745092" className="flex items-center gap-1.5 group text-gray-800 hover:text-[#dc2626] transition-colors">
                    <div className="bg-[#dc2626]/10 p-1 rounded-full group-hover:bg-[#dc2626] transition-colors">
                      <PhoneCall className="w-3 h-3 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-wide">+91 93447 45092</span>
                  </a>
                </div>
              ))}
            </div>
          </div>"""

nav_content = nav_content.replace(old_top_bar, new_top_bar)

with open(file_path_navbar, 'w', encoding='utf-8') as f:
    f.write(nav_content)
    
print("Updated successfully")
