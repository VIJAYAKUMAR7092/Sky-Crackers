import os

file_path = r'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add getComboProducts to import
content = content.replace(
    "getFeaturedProducts, getBestSellingProducts, getAllCategories",
    "getFeaturedProducts, getBestSellingProducts, getAllCategories, getComboProducts"
)

# Add to Promise.all
old_promise = """const [featuredProducts, bestSellers, dbCategories, heroBanners, videos, testimonials, websiteSettings] = await Promise.all([
    getFeaturedProducts(),
    getBestSellingProducts(),
    getAllCategories(),
    getHeroBanners(true),
    getVideoContent(true),
    getTestimonials(true),
    getWebsiteSettings()
  ]);"""

new_promise = """const [featuredProducts, bestSellers, dbCategories, heroBanners, videos, testimonials, websiteSettings, comboProducts] = await Promise.all([
    getFeaturedProducts(),
    getBestSellingProducts(),
    getAllCategories(),
    getHeroBanners(true),
    getVideoContent(true),
    getTestimonials(true),
    getWebsiteSettings(),
    getComboProducts()
  ]);"""

content = content.replace(old_promise, new_promise)

# Add combos prop to ComboPacks
content = content.replace("<ComboPacks />", "<ComboPacks combos={comboProducts} />")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated page.tsx")
