import os

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
old_div = '<div className="hidden md:block">'
new_div = '{mounted && (\n        <div className="hidden md:block">'
content = content.replace(old_div, new_div)

# Close the wrapper (the div closes before "Responsive Aspect Ratio Container")
# Find the line:         </div>\n\n        {/* Responsive Aspect Ratio Container */}
old_close = '        </div>\n\n        {/* Responsive Aspect Ratio Container */}'
new_close = '        </div>\n      )}\n\n        {/* Responsive Aspect Ratio Container */}'
content = content.replace(old_close, new_close)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
