from PIL import Image

def erase_text():
    # Left image
    left_img = Image.open('public/images/animations/left_crackers.png').convert("RGBA")
    # Erase the top right area where "BIG S" and the tag icon are
    # The image is 200x210.
    # Let's erase x from 100 to 200, y from 0 to 60
    pixels = left_img.load()
    width, height = left_img.size
    for x in range(80, width):
        for y in range(0, 50):
            pixels[x, y] = (0, 0, 0, 0)
    left_img.save('public/images/animations/left_crackers.png')
    
    # Right image
    right_img = Image.open('public/images/animations/right_crackers.png').convert("RGBA")
    # Erase the top left area where "FAST DELIVERY" is
    # Let's erase x from 0 to 120, y from 0 to 50
    pixels = right_img.load()
    width, height = right_img.size
    for x in range(0, 140):
        for y in range(0, 45):
            pixels[x, y] = (0, 0, 0, 0)
    right_img.save('public/images/animations/right_crackers.png')
    print("Erased text from images")

erase_text()
