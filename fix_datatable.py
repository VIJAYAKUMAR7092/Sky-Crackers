import re

file_path = 'components/ui/DataTable.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make it memoized
if "export const DataTable = React.memo" not in content:
    content = content.replace("export function DataTable<T>", "const DataTableInner = function<T>")
    content += "\n\nexport const DataTable = React.memo(DataTableInner) as typeof DataTableInner;\n"

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Memoized DataTable")
