import re
import os

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the top bar Contact/Phone Numbers Layer
pattern = re.compile(r'<\!\-\- Contact\/Phone Numbers Layer \-\->.*?<div className="bg-gray-100 border-b border-gray-200 py-1\.5 md:py-2 px-2 overflow-x-auto hide-scrollbar">.*?<\/div>\s*<\/div>', re.DOTALL)

# Let's search using a simpler string replacement since regex might be tricky if not matching perfectly.
# The block starts with {/* Contact/Phone Numbers Layer */} and ends right before <header
start_marker = "{/* Contact/Phone Numbers Layer */}"
end_marker = "<header className={`w-full"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    old_block = content[start_idx:end_idx]
    
    new_block = """{/* Contact/Phone Numbers Layer */}
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
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}} />
  
        """
    content = content[:start_idx] + new_block + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Navbar replaced successfully")
else:
    print("Could not find markers")
