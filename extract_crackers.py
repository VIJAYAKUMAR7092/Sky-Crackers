from PIL import Image

img = Image.open(r'C:\Users\VIJAYAKUMAR\.gemini\antigravity\brain\dba4cf44-2f44-42c1-8e9e-7fede16ca8bb\.user_uploaded\media_1787630078966.jpg').convert("RGBA")

# Shop Now section is roughly between Y=500 and Y=780
left_box = (0, 540, 200, 750)
right_box = (482, 540, 682, 750)

left_img = img.crop(left_box)
right_img = img.crop(right_box)

def remove_light_bg(image, threshold=220):
    datas = image.getdata()
    newData = []
    for item in datas:
        # If pixel is light (close to white/cream), make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold - 20:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    image.putdata(newData)
    return image

left_img = remove_light_bg(left_img, 230)
right_img = remove_light_bg(right_img, 230)

import os
os.makedirs('public/images/animations', exist_ok=True)
left_img.save('public/images/animations/left_crackers.png', "PNG")
right_img.save('public/images/animations/right_crackers.png', "PNG")
print("Saved left and right crackers.")
