import re
import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fireworkBurst keyframe
old_firework = """@keyframes fireworkBurst {
              0% { transform: translate(0, 0) scale(1); opacity: 1; }
              100% { transform: translate(40px, -40px) scale(0); opacity: 0; }
            }"""

new_firework = """@keyframes fireworkBurst {
              0% { transform: translateY(0) scale(1); opacity: 1; }
              100% { transform: translateY(-60px) scale(0); opacity: 0; }
            }"""

content = content.replace(old_firework, new_firework)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated fireworkBurst keyframe")
