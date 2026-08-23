import os
import re

with open('components/public/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove sticky top-0 from header
content = re.sub(
    r'<header\s+className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white \$\{',
    '<header className={`w-full bg-white transition-all duration-300 ease-in-out ${', 
    content
)

phone_layer = '''</div>
      </div>

      {/* Sticky Wrapper for Phone Layer + Main Header */}
      <div className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out flex flex-col ${isScrolled ? "shadow-md" : ""}`}>
        
        {/* Contact/Phone Numbers Layer */}
        <div className="bg-gray-100 border-b border-gray-200 py-1.5 md:py-2 px-2 overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 min-w-max mx-auto">
            <a href="tel:+919042849344" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 90428 49344</span>
            </a>
            <a href="tel:+916383511818" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 63835 11818</span>
            </a>
            <a href="tel:+919344745092" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 93447 45092</span>
            </a>
          </div>
        </div>

      <header'''

# Inject right before header
content = content.replace('</div>\n      </div>\n\n      <header', phone_layer)

# Close the sticky wrapper before CartDrawer
# We will just replace </header> with </header>\n      </div>
if "</div>\n        \n        <CartDrawer" not in content and "</div>\n      <CartDrawer" not in content:
    content = content.replace('</header>\n        \n        <CartDrawer', '</header>\n      </div>\n        \n        <CartDrawer')
    content = content.replace('</header>\n      <CartDrawer', '</header>\n      </div>\n      <CartDrawer')
    content = content.replace('</header>\n\n      <CartDrawer', '</header>\n      </div>\n\n      <CartDrawer')
    content = content.replace('</header>\n        <CartDrawer', '</header>\n      </div>\n        <CartDrawer')

with open('components/public/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
