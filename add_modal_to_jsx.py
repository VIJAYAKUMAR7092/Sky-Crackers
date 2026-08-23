import os

file_path = 'app/admin/(dashboard)/categories/components/CategoryClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the modal before the closing </div>
modal_jsx = """
      <SortCategoriesModal 
        isOpen={isSortModalOpen} 
        onClose={() => setIsSortModalOpen(false)} 
        onSaved={() => router.refresh()} 
      />
    </div>
"""

content = content.replace("    </div>\n  );\n}", modal_jsx + "  );\n}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
