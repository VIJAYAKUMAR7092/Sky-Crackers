import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# fix double import
content = content.replace('import Image from "next/image";\n\nimport Image from "next/image";', 'import Image from "next/image";')
content = content.replace('import Image from "next/image";\nimport Image from "next/image";', 'import Image from "next/image";')

# fix z-index
content = content.replace('className="absolute left-0 top-0 bottom-0 w-[40%] flex items-center justify-start', 'className="absolute z-20 left-0 top-0 bottom-0 w-[40%] flex items-center justify-start')
content = content.replace('className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-end', 'className="absolute z-20 right-0 top-0 bottom-0 w-[40%] flex items-center justify-end')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
