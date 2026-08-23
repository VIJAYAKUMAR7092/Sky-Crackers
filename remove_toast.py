import os

file_path = 'app/admin/(dashboard)/orders/components/OrdersClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { toast } from 'react-hot-toast';", "")
content = content.replace("toast.success", "alert")
content = content.replace("toast.error", "alert")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
