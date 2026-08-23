import os

file_path = 'components/public/home/HeroSlider.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the SHOP NOW button block and the style block
start_btn = "{/* SHOP NOW Animated Button */}"
end_style = "</style>\\n        } />"

# The style block ends with `}} />` or similar
# Let's just find and slice
if "{/* SHOP NOW Animated Button */}" in content:
    parts = content.split("{/* SHOP NOW Animated Button */}")
    
    # Parts[0] has everything before the button
    # Parts[1] has the button and the style
    
    # we want to keep `    </div>\n  );\n}\n` which comes after the style
    # Let's just do a string replace since it's cleaner
    pass

# We will just write a specific python script to replace the whole file since it's small.
