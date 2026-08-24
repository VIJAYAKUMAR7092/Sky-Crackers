import os

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_str = """        </div>
      </div>

      {/* Responsive Aspect Ratio Container */}"""

new_str = """        </div>
      </div>
      )}

      {/* Responsive Aspect Ratio Container */}"""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed!")
else:
    print("Not found")
