import re

with open('app/(store)/shop/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will just use regex to replace the table parts
content = re.sub(
    r'<table className="w-full text-left border-collapse md:min-w-\[800px\]">.*?(?=<thead)',
    '<table className="w-full text-left border-collapse table-fixed">\n                      ',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<thead className="hidden md:table-header-group">.*?</thead>',
    '''<thead className="table-header-group">
                        <tr className="bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          <th className="px-1 sm:px-2 py-2 sm:py-3 w-auto">Name</th>
                          <th className="px-1 sm:px-2 py-2 sm:py-3 w-16 sm:w-24 text-center">Price</th>
                          <th className="px-1 sm:px-2 py-2 sm:py-3 w-20 sm:w-28 text-center">Qty</th>
                          <th className="px-1 sm:px-2 py-2 sm:py-3 w-14 sm:w-24 text-right">Total</th>
                        </tr>
                      </thead>''',
    content,
    flags=re.DOTALL
)

content = content.replace(
    '<tbody className="divide-y divide-gray-200 block md:table-row-group">',
    '<tbody className="divide-y divide-gray-200 table-row-group">'
)

content = content.replace(
    '<td colSpan={6}',
    '<td colSpan={4}'
)

with open('app/(store)/shop/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated page.tsx')
