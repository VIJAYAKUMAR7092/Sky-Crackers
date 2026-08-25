import re

file_path = 'app/admin/(dashboard)/products/components/ProductClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure useMemo is imported
if "useMemo" not in content:
    content = content.replace("import React, { useState }", "import React, { useState, useMemo, useCallback }")

# Memoize createQueryString
content = re.sub(
    r'const createQueryString = \(name: string, value: string\) => \{.*?\n  \};',
    lambda m: m.group(0).replace('const createQueryString = (', 'const createQueryString = useCallback((').replace('  };', '  }, [searchParams]);'),
    content,
    flags=re.DOTALL
)

# Memoize columns
content = re.sub(
    r'const columns: ColumnDef<ProductWithCategory>\[\] = \[',
    r'const columns = useMemo<ColumnDef<ProductWithCategory>[]>(() => [',
    content
)
content = re.sub(
    r'        \),`n      \},`n    \];',
    r'        ),\n      },\n    ], []);',
    content
)

# Wait, the end of columns looks like:
#       cell: (item) => (
#         <div className="flex items-center gap-2">
#           ...
#       },
#     ];
content = re.sub(
    r'      \},\n    \];',
    r'      },\n    ], [router]);',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Memoized ProductClient arrays")
