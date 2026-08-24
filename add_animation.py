import os

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_transition = 'className={`col-start-1 row-start-1 w-full transition-opacity duration-[1500ms] ease-in-out ${'
new_transition = 'className={`col-start-1 row-start-1 w-full transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] ${'

old_state = 'isActive ? "opacity-100 z-10" : "opacity-0 z-0"'
new_state = 'isActive ? "opacity-100 z-10 blur-0" : "opacity-0 z-0 blur-[8px]"'

content = content.replace(old_transition, new_transition)
content = content.replace(old_state, new_state)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated HeroSlider animation")
