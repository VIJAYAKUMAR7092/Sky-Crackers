from PIL import Image

# Load the image
img = Image.open(r'C:\Users\VIJAYAKUMAR\.gemini\antigravity\brain\dba4cf44-2f44-42c1-8e9e-7fede16ca8bb\.user_uploaded\media_1787630078966.jpg').convert("RGBA")

# We need to find the crop boxes.
# The user wants left side and right side exactly.
# I will write a simple script to save a few horizontal slices so I can inspect where they are.
import os
os.makedirs('temp_crops', exist_ok=True)
for i in range(10):
    box = (0, i*100, 682, (i+1)*100)
    cropped = img.crop(box)
    cropped.save(f'temp_crops/slice_{i}.png')
print("Slices saved.")
