import os

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import for PackageSearch if needed
if 'PackageSearch' not in content:
    content = content.replace('MessageCircle } from "lucide-react";', 'MessageCircle, PackageSearch } from "lucide-react";')

# Desktop: Next to Quick Order
desktop_old = """              {/* Quick Order Button */}
              <Link href="/shop" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors shadow-sm">
                <ShoppingCart className="h-4 w-4" />
                Quick Order
              </Link>"""

desktop_new = """              {/* Desktop Order Tracking */}
              <Link href="/track-order" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-red-500 text-gray-800 hover:text-red-600 text-sm font-bold transition-all shadow-sm">
                <PackageSearch className="h-4 w-4" />
                Order Tracking
              </Link>

              {/* Quick Order Button */}
              <Link href="/shop" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors shadow-sm">
                <ShoppingCart className="h-4 w-4" />
                Quick Order
              </Link>"""

content = content.replace(desktop_old, desktop_new)


# Mobile: Next to Cart Toggle
mobile_old = """              {/* Cart Toggle */}
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-800 hover:text-primary transition-colors group"
                aria-label="Open Cart"
              >"""

mobile_new = """              {/* Mobile Order Tracking */}
              <Link 
                href="/track-order"
                className="relative p-2 text-gray-800 hover:text-primary transition-colors group flex sm:hidden"
                aria-label="Track Order"
              >
                <PackageSearch className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Link>

              {/* Cart Toggle */}
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-800 hover:text-primary transition-colors group"
                aria-label="Open Cart"
              >"""

content = content.replace(mobile_old, mobile_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
