import os

file_path = 'prisma/schema.prisma'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'paymentMethod String?\n\n  notes String? @db.Text',
    'paymentMethod String?\n\n  isDeleted Boolean @default(false)\n  notes String? @db.Text'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
