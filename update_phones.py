import os

# 1. Update Navbar.tsx
file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The top bar has two identical blocks for 9042849344.
old_block = """            <a href="tel:+919042849344" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 90428 49344</span>
            </a>"""

new_block = """            <a href="tel:+916383828284" className="flex items-center gap-1.5 sm:gap-2 group text-gray-800 hover:text-[#dc2626] transition-colors">
              <div className="bg-[#dc2626]/10 p-1 md:p-1.5 rounded-full group-hover:bg-[#dc2626] transition-colors">
                <PhoneCall className="w-3 h-3 md:w-4 md:h-4 text-[#dc2626] group-hover:text-white animate-[wiggle_2s_infinite]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide">+91 63838 28284</span>
            </a>"""

# Replace only the SECOND occurrence.
# We can do this by splitting and joining.
parts = content.split(old_block)
if len(parts) >= 3:
    # Meaning there are at least 2 occurrences.
    # parts[0] + old_block + parts[1] + new_block + parts[2]...
    new_content = parts[0] + old_block + parts[1] + new_block + " ".join(parts[2:]) # just in case
    # wait, join needs the delimiter. But if len is 3, there are exactly 2 occurrences.
    new_content = parts[0] + old_block + parts[1] + new_block + old_block.join(parts[2:])
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Navbar updated.")
else:
    print("Navbar split failed.", len(parts))

# 2. Update Footer.tsx
footer_path = 'components/public/layout/Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    f_content = f.read()

# Look for the primaryPhone line
# <a href={`tel:${settings?.primaryPhone || "+919042849344"}`} ...>
# {settings?.primaryPhone || "+91 9042849344"}

old_footer_phone_1 = 'href={`tel:${settings?.primaryPhone || "+919042849344"}`}'
new_footer_phone_1 = 'href={`tel:${settings?.primaryPhone || "+916383828284"}`}'

old_footer_phone_2 = '{settings?.primaryPhone || "+91 9042849344"}'
new_footer_phone_2 = '{settings?.primaryPhone || "+91 63838 28284"}'

f_content = f_content.replace(old_footer_phone_1, new_footer_phone_1)
f_content = f_content.replace(old_footer_phone_2, new_footer_phone_2)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(f_content)
print("Footer updated.")
