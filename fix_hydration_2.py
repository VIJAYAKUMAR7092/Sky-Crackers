import os
import re

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add mounted state
old_state = """  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;"""

new_state = """  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!banners || banners.length <= 1) return;"""

if old_state in content:
    content = content.replace(old_state, new_state)

# Wrap hidden md:block
old_div = '<div className="hidden md:block absolute inset-0 z-20 pointer-events-none overflow-hidden">'
new_div = '{mounted && (\n        <div className="hidden md:block absolute inset-0 z-20 pointer-events-none overflow-hidden">'

content = content.replace(old_div, new_div)

# Find the end of this div and close it. It's right before Responsive Aspect Ratio Container
old_close = """        </div>

      {/* Responsive Aspect Ratio Container */}"""

new_close = """        </div>
      )}

      {/* Responsive Aspect Ratio Container */}"""

content = content.replace(old_close, new_close)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
