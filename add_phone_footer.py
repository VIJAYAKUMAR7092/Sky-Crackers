import os

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_phone = """<li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href="tel:+919344745092" className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  +91 93447 45092
                </a>
              </li>"""

old_phone = """<li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href={`tel:${settings?.primaryPhone || "+916383511818"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  {settings?.primaryPhone || "+91 6383511818"}
                </a>
              </li>"""

content = content.replace(old_phone, old_phone + '\n              ' + new_phone)

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
