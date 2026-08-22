import re

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''<PlayCircle className="h-5 w-5 text-white" />
              </a>'''

replacement = '''<PlayCircle className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.instagram.com/sky_crackers_official?igsi=czl1enVtMWw2N2dk" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-pink-600 transition-colors">
                <InstagramIcon className="h-5 w-5 text-white" />
              </a>'''

content = content.replace(target, replacement)

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
