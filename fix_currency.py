import os
import re

def fix_currency_symbol(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # Fix broken rupee symbol formatted as ?{...}
                    # We are careful to only replace ?{ if it's likely a price, but actually ?{ is almost never valid TSX syntax except as text nodes.
                    # In TSX, a ternary would be condition ? { obj } : { obj }, with spaces.
                    # Or `abc ?{...} : ...` - this is invalid syntax, it should be `abc ? {...}`.
                    content = content.replace('?{', '₹{')
                    
                    # Fix (?,1) or (?) in forms
                    content = content.replace('(?)', '(₹)')
                    content = content.replace('(,1)', '(₹)')
                    
                    # Fix ,1{
                    content = content.replace(',1{', '₹{')
                    
                    if content != original_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(content)
                        print(f"Fixed {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

fix_currency_symbol('app')
fix_currency_symbol('components')
