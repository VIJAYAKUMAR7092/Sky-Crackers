import re

file_path = 'components/ui/FilterBar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

if "export const FilterBar = React.memo" not in content:
    content = content.replace("export function FilterBar(", "export const FilterBar = React.memo(function FilterBar(")
    content = content.replace("  );\n}\n", "  );\n});\n")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Memoized FilterBar")
