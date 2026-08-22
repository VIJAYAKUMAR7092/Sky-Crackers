import re

with open('app/(store)/shop/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_str = 'import ProductListItem from "@/components/public/ui/ProductListItem";'
new_import = 'import ShopClientView from "@/components/public/shop/ShopClientView";'
content = content.replace(import_str, new_import)

parts = content.split('          {/* Main Content */}')
header_part = parts[0]

new_content = header_part + '''          {/* Main Content */}
          <ShopClientView 
            products={products}
            groupedProducts={groupedProducts}
            categories={categories}
            categoryId={categoryId}
            search={search}
            totalProductsCount={totalProductsCount}
          />
        </div>
      </div>
    </div>
  );
}'''

with open('app/(store)/shop/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
