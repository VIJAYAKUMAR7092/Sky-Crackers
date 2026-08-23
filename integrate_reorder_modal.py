import os

file_path = 'app/admin/(dashboard)/categories/components/CategoryClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
if 'SortCategoriesModal' not in content:
    content = content.replace("import Image from 'next/image';", "import Image from 'next/image';\nimport { SortCategoriesModal } from './SortCategoriesModal';\nimport { ArrowUpDown } from 'lucide-react';")

# Add state
if 'const [isSortModalOpen, setIsSortModalOpen] = useState(false);' not in content:
    content = content.replace('const [isDeleting, setIsDeleting] = useState(false);', 'const [isDeleting, setIsDeleting] = useState(false);\n  const [isSortModalOpen, setIsSortModalOpen] = useState(false);')

# Add Reorder Button before FilterBar
reorder_button_jsx = """      <div className="flex justify-between items-center">
        <FilterBar
          searchPlaceholder="Search categories..."
          onSearch={(val: string) => handleFilterChange('search', val)}
          filters={[
            {
              name: 'Status',
              options: statusFilters,
              value: searchParams.active || 'all',
              onChange: (val: string) => handleFilterChange('active', val),
            },
          ]}
        />
        <Button onClick={() => setIsSortModalOpen(true)} variant="outline" className="ml-4 flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          Reorder
        </Button>
      </div>"""

content = content.replace("""      <FilterBar
        searchPlaceholder="Search categories..."
        onSearch={(val: string) => handleFilterChange('search', val)}
        filters={[
          {
            name: 'Status',
            options: statusFilters,
            value: searchParams.active || 'all',
            onChange: (val: string) => handleFilterChange('active', val),
          },
        ]}
      />""", reorder_button_jsx)

# Add Modal component
modal_jsx = """      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        variant="danger"
      />
      <SortCategoriesModal 
        isOpen={isSortModalOpen} 
        onClose={() => setIsSortModalOpen(false)} 
        onSaved={() => router.refresh()} 
      />"""

content = content.replace("""      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        variant="danger"
      />""", modal_jsx)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
