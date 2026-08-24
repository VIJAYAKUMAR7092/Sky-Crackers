import os
file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('featuredProducts.map((product, index) =>', 'featuredProducts.map((product: any, index: number) =>')
content = content.replace('bestSellers.map((product, index) =>', 'bestSellers.map((product: any, index: number) =>')
content = content.replace('HOMEPAGE_IMAGES.videoBg', 'HOMEPAGE_IMAGES.hero.background')
content = content.replace('HOMEPAGE_IMAGES.videoPlaceholder', 'HOMEPAGE_IMAGES.youtube')
content = content.replace('HOMEPAGE_IMAGES.footerCtaBg', 'HOMEPAGE_IMAGES.hero.background')
content = content.replace('video.thumbnailUrl ||', '(video as any).thumbnail ||')
content = content.replace('whatsappNumber', 'whatsapp')
content = content.replace('{video.description', '{(video as any).description')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed page.tsx')
