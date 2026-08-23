import os
import re

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import if missing
if 'WhatsAppIcon' not in content:
    content = content.replace(
        'import { ArrowRight',
        'import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";\nimport { ArrowRight'
    )

# Desktop Replace
content = content.replace(
    '<MessageCircle className="h-8 w-8" />',
    '<WhatsAppIcon className="h-8 w-8" />'
)

# Mobile Replace (Email -> WhatsApp)
mobile_email = '''            <ScrollReveal animation="fade-up" delay={150}>
              <a href="mailto:info@skycrackers.com" className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 active:shadow-inner active:scale-95 transition-all duration-200 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-12 w-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Email</h3>
                <span className="text-xs font-bold text-primary">Mail Us</span>
              </a>
            </ScrollReveal>'''

mobile_whatsapp = '''            <ScrollReveal animation="fade-up" delay={150}>
              <a href="https://wa.me/919042849344" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 active:shadow-inner active:scale-95 transition-all duration-200 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-12 w-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-3">
                  <WhatsAppIcon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">WhatsApp</h3>
                <span className="text-xs font-bold text-green-500">Chat Now</span>
              </a>
            </ScrollReveal>'''

content = content.replace(mobile_email, mobile_whatsapp)

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
