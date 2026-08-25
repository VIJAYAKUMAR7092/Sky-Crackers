import re

file_path = 'lib/services/orders/order.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the closing tag of findMany inside getAdminOrders
content = content.replace(
"""      include: {
        customer: {
          select: {
            fullName: true,
            email: true,
            phone: true,
          }
        },
      }
    });

    return {""",
"""      include: {
        customer: {
          select: {
            fullName: true,
            email: true,
            phone: true,
          }
        },
      }
    })
  ]);

  return {"""
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed")
