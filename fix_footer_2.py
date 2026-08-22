import re

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(', Instagram }', ' }')
content = content.replace('import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";', 'import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";\nimport InstagramIcon from "@/components/public/ui/InstagramIcon";')
content = content.replace('<Instagram className=', '<InstagramIcon className=')

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
