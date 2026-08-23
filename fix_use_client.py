import os
import glob

# Find all tsx files in app/admin containing 'use client'
for root, _, files in os.walk('app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if "'use client';" in content and content.index("'use client';") > 0:
                # Remove it and put it at the top
                content = content.replace("'use client';\n", "")
                content = content.replace('"use client";\n', "")
                content = "'use client';\n" + content
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed use client in {path}")
