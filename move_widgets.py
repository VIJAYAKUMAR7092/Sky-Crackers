import os

with open('components/public/layout/FloatingStoreWidgets.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace WhatsApp positioning
content = content.replace(
    'className="fixed bottom-[100px] left-4 md:bottom-8 md:left-8 z-50',
    'className="fixed top-[160px] left-2 md:top-auto md:bottom-8 md:left-8 z-50'
)

# Replace Quick Purchase positioning
content = content.replace(
    'className="fixed bottom-[100px] right-2 md:bottom-8 md:right-8 z-50',
    'className="fixed top-[160px] right-2 md:top-auto md:bottom-8 md:right-8 z-50'
)

with open('components/public/layout/FloatingStoreWidgets.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
