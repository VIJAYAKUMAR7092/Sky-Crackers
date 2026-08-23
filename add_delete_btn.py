import os

file_path = 'app/admin/(dashboard)/orders/components/OrdersClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

delete_btn = """            <Button variant="ghost" size="icon" onClick={() => setOrderToDelete(order.id as string)}>
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </Button>
          </div>"""

content = content.replace(
    '</Link>\n            </Button>\n          </div>',
    f'</Link>\n            </Button>\n{delete_btn}'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
