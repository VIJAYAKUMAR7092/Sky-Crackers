import os

file_path = 'app/admin/(dashboard)/orders/components/OrdersClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import for format if not exists
if "import { format } from 'date-fns';" not in content:
    content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { format } from 'date-fns';")

# Replace toLocaleDateString
content = content.replace("new Date(order.createdAt).toLocaleDateString()", "format(new Date(order.createdAt), 'dd/MM/yyyy')")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
