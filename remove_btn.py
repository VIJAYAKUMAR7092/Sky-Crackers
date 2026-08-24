import os
import re

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

desktop_tracking_pattern = re.compile(r"\{\/\*\ Desktop\ Order\ Tracking\ \*\/.*?<\/Link>", re.DOTALL)
mobile_tracking_pattern = re.compile(r"\{\/\*\ Mobile\ Order\ Tracking\ \*\/.*?<\/Link>", re.DOTALL)

content = re.sub(desktop_tracking_pattern, "", content)
content = re.sub(mobile_tracking_pattern, "", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
