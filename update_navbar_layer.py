import os
import re

with open('components/public/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hardcode Logo
content = content.replace(
    'src={settings?.logoUrl || "/images/sky-crackers-logo.png"}',
    'src="/images/sky-crackers-logo.png"'
)
# Make logo slightly wider since it's a wide text logo
content = content.replace(
    'className="relative h-9 w-32 md:h-11 md:w-40 transition-transform duration-300"',
    'className="relative h-9 w-40 md:h-12 md:w-56 transition-transform duration-300"'
)

# 2. Add Phone Number Layer and Sticky Wrapper
# Right after: </div>\n        </div>
# And before: <header className={`sticky top-0
top_banner_end = '        </div>\n      </div>'
header_start = '      <header\n        className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white ${'

phone_layer = '''      {/* Sticky Wrapper for Phone Layer + Main Header */}
      <div className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out flex flex-col shadow-md`}>
        
        {/* Contact/Phone Numbers Layer */}
        <div className="bg-gray-100 border-b border-gray-200 py-1.5 md:py-2 px-2 overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 min-w-max mx-auto">
            <a href="tel:+919042849344" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 90428 49344</span>
            </a>
            <a href="tel:+919786683878" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 97866 83878</span>
            </a>
            <a href="tel:+919443249344" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 94432 49344</span>
            </a>
          </div>
        </div>

      <header
        className={`w-full bg-white transition-all duration-300 ease-in-out ${'''

content = content.replace(
    '        </div>\n  \n        <header\n          className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white ${',
    '        </div>\n' + phone_layer
)

# 3. Close the sticky wrapper after header
# Note: The header ends before <CartDrawer />
content = content.replace(
    '        </header>\n        \n        <CartDrawer',
    '        </header>\n      </div>\n        \n        <CartDrawer'
)

with open('components/public/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
