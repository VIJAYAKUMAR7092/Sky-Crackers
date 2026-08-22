import re

with open('components/public/ui/ProductCard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport ZoomableImage from "@/components/public/ui/ZoomableImage";')

# We only want to replace the <Image  right under {/* Image Container */}
content = re.sub(r'<Image \s*src=\{product\.images', r'<ZoomableImage \n          src={product.images', content)

with open('components/public/ui/ProductCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
