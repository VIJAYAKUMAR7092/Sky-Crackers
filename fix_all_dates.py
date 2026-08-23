import os
import glob

# Find all tsx files in app/admin containing toLocaleDateString
for root, _, files in os.walk('app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'toLocaleDateString' in content:
                # Add import if missing
                if "import { format } from 'date-fns'" not in content:
                    content = "import { format } from 'date-fns';\n" + content
                
                # We can use regex to replace all forms of toLocaleDateString
                import re
                content = re.sub(r'new Date\((.*?)\)\.toLocaleDateString\(\)', r"format(new Date(\1), 'dd/MM/yyyy')", content)
                content = re.sub(r'new Date\((.*?)\)\.toLocaleDateString\((.*?)\)', r"format(new Date(\1), 'dd/MM/yyyy')", content)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {path}")
