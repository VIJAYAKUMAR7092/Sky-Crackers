import re

file_path = 'lib/services/orders/order.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("""    }
  });

  return {""", """    }
  })]);

  return {""")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed")
