import os
import re

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the phone layer
old_phone_layer = """          <div className="bg-gray-100 border-b border-gray-200 py-1.5 md:py-2 px-2 overflow-x-auto hide-scrollbar">
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 min-w-max mx-auto">"""

new_phone_layer = """          <div className="bg-gray-100 border-b border-gray-200 py-1.5 md:py-2 px-2">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 sm:gap-6 md:gap-10 max-w-7xl mx-auto">"""

content = content.replace(old_phone_layer, new_phone_layer)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
