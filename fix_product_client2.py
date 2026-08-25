import re

file_path = 'app/admin/(dashboard)/products/components/ProductClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'filters=\{\[\s*\{\s*name: \'All Categories\',',
    r'filters={useMemo(() => [\n          {\n            name: \'All Categories\',',
    content
)

content = re.sub(
    r'onChange: \(val\) => router\.push\(`\?\$(\{createQueryString\(\'stockStatus\', val\)\})`\)\n\s*\}\n\s*\]\}',
    r'onChange: (val) => router.push(`?${createQueryString(\'stockStatus\', val)}`)\n            }\n          ], [categories, searchParams, createQueryString, router])}',
    content
)

content = re.sub(
    r'onSearch=\{\(q\) => router\.push\(`\?\$(\{createQueryString\(\'search\', q\)\})`\)\}',
    r'onSearch={useCallback((q: string) => router.push(`?${createQueryString(\'search\', q)}`), [createQueryString, router])}',
    content
)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Memoized ProductClient filters")
