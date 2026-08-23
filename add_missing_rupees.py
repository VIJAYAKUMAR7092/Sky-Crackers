import os
import re

def ensure_rupee(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    content = re.sub(r'(<span className="font-extrabold[^>]*>\s*)\{Number\(product\.sellingPrice\)', r'\1₹{Number(product.sellingPrice)', content)
                    content = re.sub(r'(<span className="text-\[8px\] text-red-500 line-through[^>]*>\s*)\{Number\(product\.mrp\)', r'\1₹{Number(product.mrp)', content)

                    if content != original_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(content)
                        print(f'Fixed missing ₹ in {filepath}')
                except Exception as e:
                    pass

ensure_rupee('components')
