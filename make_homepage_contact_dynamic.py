import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure getWebsiteSettings is imported
if 'getWebsiteSettings' not in content:
    content = content.replace('import { getHeroBanners, getVideoContent, getTestimonials, getSEOSettings }', 'import { getHeroBanners, getVideoContent, getTestimonials, getSEOSettings, getWebsiteSettings }')

# Add websiteSettings to the Promise.all
if 'getWebsiteSettings()' not in content:
    content = content.replace('getTestimonials(true)\n  ]);', 'getTestimonials(true),\n    getWebsiteSettings()\n  ]);')
    content = content.replace('const [featuredProducts, bestSellers, dbCategories, heroBanners, videos, testimonials] = await Promise.all([', 'const [featuredProducts, bestSellers, dbCategories, heroBanners, videos, testimonials, websiteSettings] = await Promise.all([')

# Replace hardcoded phone number in "Call Us" section
old_phone = '<a href="tel:+916383511818" className="relative z-10 text-lg font-bold text-primary mt-auto group-hover:tracking-wider transition-all">+91 63835 11818</a>'
new_phone = '<a href={`tel:${websiteSettings?.primaryPhone || "+916383511818"}`} className="relative z-10 text-lg font-bold text-primary mt-auto group-hover:tracking-wider transition-all">{websiteSettings?.primaryPhone || "+91 63835 11818"}</a>'
content = content.replace(old_phone, new_phone)

# Replace hardcoded address in "Our Location" section
old_address = '<p className="relative z-10 text-gray-600 font-medium leading-relaxed">2/174D, Sattur Road,<br/>Meenampatti, Sivakasi,<br/>Tamil Nadu - 626189</p>'
new_address = '<p className="relative z-10 text-gray-600 font-medium leading-relaxed whitespace-pre-line">{websiteSettings?.address || "2/174D, Sattur Road,\\nMeenampatti, Sivakasi,\\nTamil Nadu - 626189"}</p>'
content = content.replace(old_address, new_address)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
