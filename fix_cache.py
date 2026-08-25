import re

file_path = 'lib/services/products/product.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import for revalidateTag
if "import { revalidateTag }" not in content:
    content = content.replace(
        "import { serializeDecimals } from '@/lib/utils/serialization';",
        "import { serializeDecimals } from '@/lib/utils/serialization';\nimport { revalidateTag } from 'next/cache';"
    )

# Add revalidateTag to updateProduct
if "revalidateTag('products')" not in content:
    content = re.sub(
        r'export async function updateProduct.*?\n.*?return serializeDecimals\(product\);\n}',
        lambda m: m.group(0).replace('return serializeDecimals(product);', "revalidateTag('products');\n  return serializeDecimals(product);"),
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'export async function softDeleteProduct.*?\n.*?return serializeDecimals\(product\);\n}',
        lambda m: m.group(0).replace('return serializeDecimals(product);', "revalidateTag('products');\n  return serializeDecimals(product);"),
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'export async function createProduct.*?\n.*?return serializeDecimals\(product\);\n}',
        lambda m: m.group(0).replace('return serializeDecimals(product);', "revalidateTag('products');\n  return serializeDecimals(product);"),
        content,
        flags=re.DOTALL
    )


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added revalidateTag")
