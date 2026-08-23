import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace displayBanners definition to use CMS data
old_banners = """  const displayBanners = [
    { id: 'b1', image: '/images/home/new-banner-1.jpg' },
    { id: 'b2', image: '/images/home/new-banner-2.jpg' },
    { id: 'b3', image: '/images/home/new-banner-3.jpg' },
    { id: 'b4', image: '/images/home/new-banner-4.png' }
  ];"""

new_banners = """  const displayBanners = heroBanners && heroBanners.length > 0 
    ? heroBanners.map((b: any) => ({ id: b.id, image: b.imageUrl, link: b.linkUrl }))
    : [
        { id: 'b1', image: '/images/home/new-banner-1.jpg' },
        { id: 'b2', image: '/images/home/new-banner-2.jpg' },
        { id: 'b3', image: '/images/home/new-banner-3.jpg' },
        { id: 'b4', image: '/images/home/new-banner-4.png' }
      ];"""

content = content.replace(old_banners, new_banners)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
