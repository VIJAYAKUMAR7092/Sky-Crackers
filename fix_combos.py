import re

with open('components/public/home/ComboPacks.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport ZoomableImage from "@/components/public/ui/ZoomableImage";')

content = re.sub(r'<Image \s*src=\{pack\.image\}', r'<ZoomableImage \n                  src={pack.image}', content)

with open('components/public/home/ComboPacks.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
