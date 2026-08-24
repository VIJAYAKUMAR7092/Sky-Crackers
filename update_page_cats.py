import os
import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the targetCategories hardcoded mapping
old_code = """  const targetCategories = [
    { name: "Sparklers", image: CATEGORY_IMAGES.sparklers },
    { name: "Flower Pots", image: CATEGORY_IMAGES.flowerPots },
    { name: "Rockets", image: CATEGORY_IMAGES.rockets },
    { name: "Chakkars", image: CATEGORY_IMAGES.chakkars },
    { name: "Fancy Shots", image: CATEGORY_IMAGES.fancyShots },
    { name: "Sound Crackers", image: CATEGORY_IMAGES.soundCrackers },
    { name: "Kids Collection", image: CATEGORY_IMAGES.kidsCollection },
    { name: "Gift Boxes", image: CATEGORY_IMAGES.giftBoxes }
  ];
  
  const displayCategories = targetCategories.map(cat => {
    const found = dbCategories.find(c => c.name.toLowerCase().includes(cat.name.toLowerCase()));
    return {
      id: found?.id || cat.name.toLowerCase().replace(/\s+/g, '-'),
      name: found?.name || cat.name,
      slug: found?.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
      image: found?.image || cat.image
    };
  });"""

new_code = """  // Create mapping for fallback images
  const fallbackImages: Record<string, string> = {
    'sparklers': CATEGORY_IMAGES.sparklers,
    'flower pots': CATEGORY_IMAGES.flowerPots,
    'rockets': CATEGORY_IMAGES.rockets,
    'chakkars': CATEGORY_IMAGES.chakkars,
    'fancy shots': CATEGORY_IMAGES.fancyShots,
    'sound crackers': CATEGORY_IMAGES.soundCrackers,
    'kids collection': CATEGORY_IMAGES.kidsCollection,
    'gift boxes': CATEGORY_IMAGES.giftBoxes
  };

  const displayCategories = dbCategories.map(cat => {
    // Attempt to find a fallback image based on the category name if DB image is missing or empty
    const matchedFallbackKey = Object.keys(fallbackImages).find(key => cat.name.toLowerCase().includes(key));
    const fallbackImage = matchedFallbackKey ? fallbackImages[matchedFallbackKey] : CATEGORY_IMAGES.sparklers;
    
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image || fallbackImage
    };
  });"""

content = content.replace(old_code, new_code)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated categories logic in page.tsx")
