import re

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Instagram Icon import
if 'Instagram' not in content:
    content = content.replace('PlayCircle, MessageCircle }', 'PlayCircle, MessageCircle, Instagram }')

# Add Instagram link
new_socials = '''              <a href={https://wa.me/?text=Hello%20Sky%20Crackers} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-orange-600 transition-colors">
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </a>
              <a href={settings?.youtube || "https://youtube.com/@skycrackersofficial?si=Fh5UAVw9lqOjOpXN"} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-red-600 transition-colors">
                <PlayCircle className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.instagram.com/sky_crackers_official?igsi=czl1enVtMWw2N2dk" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-pink-600 transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>'''

content = re.sub(
    r'<a href=\{https://wa\.me/.*?</PlayCircle>\s*</a>',
    new_socials,
    content,
    flags=re.DOTALL
)

# Add Terms and Conditions to links array
if 'Terms & Conditions' not in content:
    content = content.replace(
        "{ name: 'Privacy Policy', href: '/pages/privacy-policy' }",
        "{ name: 'Privacy Policy', href: '/pages/privacy-policy' },\n                { name: 'Terms & Conditions', href: '/pages/terms-and-conditions' }"
    )

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated Footer.tsx')
