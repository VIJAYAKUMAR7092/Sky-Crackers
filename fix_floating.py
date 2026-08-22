import re

with open('components/public/layout/FloatingStoreWidgets.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'BottomCartPopup' not in content:
    content = content.replace('import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";', 'import BottomCartPopup from "@/components/public/cart/BottomCartPopup";\nimport WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";')
    content = content.replace('</>', '  <BottomCartPopup />\n    </>')
    with open('components/public/layout/FloatingStoreWidgets.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
