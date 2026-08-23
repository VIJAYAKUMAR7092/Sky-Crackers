import os

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('animation="slide-right"', 'animation="fade-right"')
content = content.replace('animation="slide-left"', 'animation="fade-left"')
content = content.replace('animation="zoom-in"', 'animation="scale-up"')

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
