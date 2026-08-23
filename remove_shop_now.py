import os

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the exact string to remove
start_str = "      {/* SHOP NOW Animated Button */}"
end_str = "        {/* Keyframes for button background spin */}"

if start_str in content and end_str in content:
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    # Check if there is an <style> tag to remove as well
    style_end_str = "</style>\n        `}}\n        />"
    # Actually wait, let's just use regex or replace
    import re
    content = re.sub(r'\{\/\* SHOP NOW Animated Button \*\/}.*?\{\/\* Keyframes for button background spin \*\/}', '', content, flags=re.DOTALL)
    
    # we should also remove the style tag for bgSpin if possible, but it's fine if it stays, it won't hurt.
    # Let's remove the style block to be clean
    content = re.sub(r'\{\/\* Keyframes for button background spin \*\/}.*?/>', '', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
