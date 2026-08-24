from PIL import Image
import os

def remove_dark_bg(input_path, output_path, threshold=60):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if the pixel is dark enough to be considered background
        # (also considering dark blue/brown shades)
        if item[0] < threshold and item[1] < threshold and item[2] < threshold + 30:
            # Make transparent, but preserve a bit of the original color scaled by brightness
            # A simple approach: just set alpha to 0 for dark pixels
            newData.append((item[0], item[1], item[2], 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

images = [
    ("public/images/animations/cracker1.png", "public/images/animations/c1_no_bg.png"),
    ("public/images/animations/cracker2.png", "public/images/animations/c2_no_bg.png"),
    ("public/images/animations/cracker3.png", "public/images/animations/c3_no_bg.png")
]

for src, dest in images:
    if os.path.exists(src):
        remove_dark_bg(src, dest)
        print(f"Processed {src} -> {dest}")
    else:
        print(f"Not found: {src}")
