import os

file_path = 'app/globals.css'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_keyframes = """
@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0px); }
}
"""

if "@keyframes pageFadeIn" not in content:
    content += new_keyframes

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
