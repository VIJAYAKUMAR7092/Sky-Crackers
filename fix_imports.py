import os
import re

# Fix Sidebar.tsx
sidebar_path = r'components/admin/layout/Sidebar.tsx'
with open(sidebar_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I mistakenly inserted '<Sparkles,\nGift' into a component attribute or something.
# Let's see the error: <Sparkles, Gift className="w-4 h-4" />
content = content.replace('<Sparkles,\n  Gift className="w-4 h-4" />', '<Sparkles className="w-4 h-4" />')
content = content.replace('<Sparkles,\r\n  Gift className="w-4 h-4" />', '<Sparkles className="w-4 h-4" />')
content = content.replace('<Sparkles, Gift className="w-4 h-4" />', '<Sparkles className="w-4 h-4" />')
with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Fix APIs
def fix_api(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace prisma import
    content = re.sub(r'import\s+{\s*prisma\s*}\s+from\s+[\'"].*?lib/prisma[\'"];?', 'import prisma from "@/lib/db/prisma";', content)
    # Replace requireAdmin import
    content = re.sub(r'import\s+{\s*requireAdmin\s*}\s+from\s+[\'"].*?lib/auth/utils[\'"];?', 'import { requireAdmin } from "@/lib/auth/server-auth";', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_api('app/api/admin/combos/route.ts')
fix_api('app/api/admin/combos/reorder/route.ts')

# Fix combos page
combos_page = 'app/admin/(dashboard)/combos/page.tsx'
with open(combos_page, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'import\s+{\s*prisma\s*}\s+from\s+[\'"]@/lib/prisma[\'"];?', 'import prisma from "@/lib/db/prisma";', content)
with open(combos_page, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed imports")
