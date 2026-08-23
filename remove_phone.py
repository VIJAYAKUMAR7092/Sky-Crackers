import os
import re

with open('components/public/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's completely remove the Phone Pill
# It looks like:
# {/* Phone Pill - like screenshot */}
# <a href={`tel:...`} ...>...</a>
# Let's just find "Phone Pill" and delete until "</a>"

start_idx = content.find('{/* Phone Pill')
if start_idx != -1:
    end_idx = content.find('</a>', start_idx)
    if end_idx != -1:
        content = content[:start_idx] + content[end_idx + 4:]

with open('components/public/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
