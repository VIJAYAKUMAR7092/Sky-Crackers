import os

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's just find the start of 'const displayBanners' and the end '];'
start = content.find('const displayBanners =')
if start != -1:
    end = content.find('];', start)
    if end != -1:
        old_block = content[start:end+2]
        new_block = '''const displayBanners = [
    { id: 'b1', image: '/images/home/new-banner-1.jpg' },
    { id: 'b2', image: '/images/home/new-banner-2.jpg' },
    { id: 'b3', image: '/images/home/new-banner-3.jpg' },
    { id: 'b4', image: '/images/home/new-banner-4.png' }
  ];'''
        content = content.replace(old_block, new_block)

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
