import os

file_path = 'app/admin/(dashboard)/orders/components/OrdersClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports for Trash2, useState, ConfirmDialog
if 'Trash2' not in content:
    content = content.replace("import { Eye } from 'lucide-react';", "import { Eye, Trash2 } from 'lucide-react';\nimport { ConfirmDialog } from '@/components/ui/ConfirmDialog';\nimport { useState } from 'react';\nimport { toast } from 'react-hot-toast';")

# Add useState inside OrdersClient component
if 'const [orderToDelete, setOrderToDelete]' not in content:
    content = content.replace('const router = useRouter();', 'const router = useRouter();\n  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);\n  const [isDeleting, setIsDeleting] = useState(false);\n\n  const handleDelete = async () => {\n    if (!orderToDelete) return;\n    setIsDeleting(true);\n    try {\n      const res = await fetch(`/api/admin/orders/${orderToDelete}`, {\n        method: "DELETE",\n      });\n      const data = await res.json();\n      if (!res.ok) throw new Error(data.error || "Failed to delete order");\n      toast.success("Order deleted successfully");\n      router.refresh();\n    } catch (err: any) {\n      toast.error(err.message);\n    } finally {\n      setIsDeleting(false);\n      setOrderToDelete(null);\n    }\n  };\n')

# Replace Actions cell
actions_old = """      {
        header: 'Actions',
        accessorKey: 'id',
        cell: (order: any) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/orders/${order.id}`}>
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Link>
            </Button>
          </div>
        ),
      },"""

actions_new = """      {
        header: 'Actions',
        accessorKey: 'id',
        cell: (order: any) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/orders/${order.id}`}>
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setOrderToDelete(order.id)}>
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        ),
      },"""

content = content.replace(actions_old, actions_new)

# Add ConfirmDialog before closing tag
closing_tags = """    </div>
  );
}"""

dialog_jsx = """      <ConfirmDialog
        isOpen={!!orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        variant="danger"
      />
    </div>
  );
}"""

if 'ConfirmDialog' not in content[content.find('</DataTable>'):]:
    content = content.replace(closing_tags, dialog_jsx)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
