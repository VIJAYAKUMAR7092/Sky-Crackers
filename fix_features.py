with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<Sparkles className="h-10 w-10 text-secondary-foreground group-hover:text-white mb-4 transition-colors" />',
    '<Sparkles className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />'
)
content = content.replace(
    'We provide up to 80% discount on all products',
    'We provide up to 90% discount on all products'
)

content = content.replace(
    'You can purchase on all days from 6:00 AM to 11:50 PM',
    'You can purchase on all days from 8:00 AM to 10:00 PM'
)

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated texts and icon colors')
