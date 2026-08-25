import re

file_path = 'components/ui/ImageUploader.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure next/image is imported
if 'import Image from' not in content:
    content = content.replace("import React, { useState, useRef, useCallback } from 'react';", "import React, { useState, useRef, useCallback } from 'react';\nimport Image from 'next/image';")

# Replace <img ... /> with <Image ... />
content = re.sub(
    r'\{\/\* eslint-disable-next-line @next\/next\/no-img-element \*\/\}\s*<img\s+src=\{img\.url\}\s+alt=\{img\.altText \|\| `Product image \$\{i \+ 1\}`\}\s+className="(.*?)"\s*\/>',
    r'<Image src={img.url} alt={img.altText || `Product image ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="\1" />',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ImageUploader.tsx")
