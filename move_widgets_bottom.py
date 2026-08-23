import os

with open('components/public/layout/FloatingStoreWidgets.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace WhatsApp positioning back to bottom
content = content.replace(
    'fixed top-[160px] left-2 md:top-auto md:bottom-8 md:left-8 z-50',
    'fixed bottom-6 left-3 md:bottom-8 md:left-8 z-50'
)

# Replace Quick Purchase positioning back to bottom
content = content.replace(
    'fixed top-[160px] right-2 md:top-auto md:bottom-8 md:right-8 z-50',
    'fixed bottom-6 right-2 md:bottom-8 md:right-8 z-50'
)

with open('components/public/layout/FloatingStoreWidgets.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
