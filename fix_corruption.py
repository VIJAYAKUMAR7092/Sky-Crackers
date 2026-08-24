import os
import re

file_path = 'app/admin/(dashboard)/categories/components/CategoryClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the duplicate 'const res = const res ='
content = content.replace('const res = const res = await fetch', 'const res = await fetch')

# Fix the duplicate 'if (!res.ok) { ... }' inside 'if (res.ok)'
bad_delete_logic = """      const res = await fetch(`/api/admin/categories/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (!res.ok) { console.error(await res.text()); throw new Error("Failed"); } router.refresh();
      } else {"""

good_delete_logic = """      const res = await fetch(`/api/admin/categories/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      } else {"""

content = content.replace(bad_delete_logic, good_delete_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed syntax errors in CategoryClient.tsx")
