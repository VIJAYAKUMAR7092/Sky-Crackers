import os

files = [
    'components/public/home/FeaturedProductCard.tsx',
    'components/public/product/ProductActions.tsx',
    'components/public/ui/MobileProductRow.tsx',
    'components/public/ui/ProductCard.tsx',
    'components/public/ui/ProductListItem.tsx'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The exact lines vary slightly, so we use string replacements carefully.
    
    # 1. ProductCard, ProductListItem, MobileProductRow, FeaturedProductCard
    content = content.replace(
        "const cartItems = useCartStore((state) => state.items);\n  \n  const cartItem = cartItems.find(item => item.product.id === product.id);\n  const inCartQty = cartItem ? cartItem.quantity : 0;",
        "const inCartQty = useCartStore((state) => {\n    const item = state.items.find(i => i.product.id === product.id);\n    return item ? item.quantity : 0;\n  });"
    )
    
    # Sometimes it has a single empty line or no empty line
    content = content.replace(
        "const cartItems = useCartStore((state) => state.items);\n  const cartItem = cartItems.find(item => item.product.id === product.id);\n  const inCartQty = cartItem ? cartItem.quantity : 0;",
        "const inCartQty = useCartStore((state) => {\n    const item = state.items.find(i => i.product.id === product.id);\n    return item ? item.quantity : 0;\n  });"
    )
    
    # ProductActions is slightly different (currentCartQty instead of inCartQty)
    content = content.replace(
        "const cartItems = useCartStore((state) => state.items);\n  const cartItem = cartItems.find((i) => i.product.id === product.id);\n  const currentCartQty = cartItem ? cartItem.quantity : 0;",
        "const currentCartQty = useCartStore((state) => {\n    const item = state.items.find(i => i.product.id === product.id);\n    return item ? item.quantity : 0;\n  });"
    )
    
    # MobileProductRow and others might have it with another combination
    content = content.replace(
        "const cartItems = useCartStore((state) => state.items);\n    \n  const cartItem = cartItems.find(item => item.product.id === product.id);\n  const inCartQty = cartItem ? cartItem.quantity : 0;",
        "const inCartQty = useCartStore((state) => {\n    const item = state.items.find(i => i.product.id === product.id);\n    return item ? item.quantity : 0;\n  });"
    )

    # FeaturedProductCard has localQty state in between!
    #   const cartItems = useCartStore((state) => state.items);
    #   
    #   const [localQty, setLocalQty] = useState(1);
    #   const [isAdded, setIsAdded] = useState(false);
    # 
    #   const cartItem = cartItems.find(item => item.product.id === product.id);
    #   const inCartQty = cartItem ? cartItem.quantity : 0;
    
    # So we'll use regex for a more robust replacement in all files!

import re

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Regex to find: const cartItems = useCartStore(...) ... const inCartQty/currentCartQty = ...
    
    # For ProductActions:
    content = re.sub(
        r'const cartItems = useCartStore\(\(state\) => state\.items\);\s*const cartItem = cartItems\.find\(\(i\) => i\.product\.id === product\.id\);\s*const currentCartQty = cartItem \? cartItem\.quantity : 0;',
        r'const currentCartQty = useCartStore((state) => {\n    const item = state.items.find(i => i.product.id === product.id);\n    return item ? item.quantity : 0;\n  });',
        content
    )
    
    # For FeaturedProductCard:
    content = re.sub(
        r'const cartItems = useCartStore\(\(state\) => state\.items\);\s*(.*?)\s*const cartItem = cartItems\.find\(item => item\.product\.id === product\.id\);\s*const inCartQty = cartItem \? cartItem\.quantity : 0;',
        r'\1\n  const inCartQty = useCartStore((state) => {\n    const item = state.items.find(i => i.product.id === product.id);\n    return item ? item.quantity : 0;\n  });',
        content,
        flags=re.DOTALL
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated Zustand selectors.")
