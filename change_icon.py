import os

file_path = 'components/public/ui/WishlistWidget.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Trash2 with X in imports if needed, though X is already imported
# import { Heart, X, ShoppingCart, Zap, Trash2 } from "lucide-react";
# We don't necessarily need to remove Trash2 from import if it's not hurting, but it's cleaner.

old_button = """                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>"""

new_button = """                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <X className="w-4 h-4" />
                </button>"""

content = content.replace(old_button, new_button)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Icon changed")
