import os

file_path = 'app/(store)/layout.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = 'import WishlistWidget from "../../components/public/ui/WishlistWidget";'
if import_statement not in content:
    content = content.replace(
        'import FloatingStoreWidgets from "../../components/public/layout/FloatingStoreWidgets";',
        'import FloatingStoreWidgets from "../../components/public/layout/FloatingStoreWidgets";\n' + import_statement
    )

if '<WishlistWidget />' not in content:
    content = content.replace(
        '<FloatingStoreWidgets />',
        '<FloatingStoreWidgets />\n      <WishlistWidget />'
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
