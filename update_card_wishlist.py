import os
import re

file_path = 'components/public/ui/ProductCard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import for wishlist store
if 'useWishlistStore' not in content:
    content = content.replace(
        'import { useCartStore } from "@/lib/store/cart.store";',
        'import { useCartStore } from "@/lib/store/cart.store";\nimport { useWishlistStore } from "@/lib/store/wishlist.store";'
    )

# Replace local state with global wishlist store state
old_state = 'const [isLiked, setIsLiked] = useState(false);'
new_state = """const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  
  const isLiked = isInWishlist(product.id);"""

if old_state in content:
    content = content.replace(old_state, new_state)

# Replace handleLike logic
old_like = """  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };"""

new_like = """  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.sellingPrice),
      mrp: Number(product.mrp),
      imageUrl: product.images?.[0]?.url || "/placeholder.png",
      packInfo: product.packInfo || "1 Box"
    });
  };"""

if old_like in content:
    content = content.replace(old_like, new_like)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
