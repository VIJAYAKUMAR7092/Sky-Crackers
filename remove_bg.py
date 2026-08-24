import os
from rembg import remove

images = [
    ("public/images/animations/cracker1.png", "public/images/animations/c1_no_bg.png"),
    ("public/images/animations/cracker2.png", "public/images/animations/c2_no_bg.png"),
    ("public/images/animations/cracker3.png", "public/images/animations/c3_no_bg.png")
]

for src, dest in images:
    if os.path.exists(src):
        with open(src, "rb") as input_file:
            input_data = input_file.read()
            output_data = remove(input_data)
        with open(dest, "wb") as output_file:
            output_file.write(output_data)
        print(f"Processed {src} -> {dest}")
