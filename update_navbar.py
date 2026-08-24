import os

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update navLinks
old_links = """  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "Order Tracking", href: "/track-order" },
    { name: "Payments", href: "/payments" },
  ];"""

new_links = """  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Order Tracking", href: "/track-order" },
    { name: "Payments", href: "/payments" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];"""

content = content.replace(old_links, new_links)

# 2. Add Mobile Order Tracking Icon next to Cart Toggle
old_actions = """              {/* Right Actions */}
              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                
                
  
                
  
                {/* Quick Order Button */}
                <Link href="/shop" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors shadow-sm">
                  <ShoppingCart className="h-4 w-4" />
                  Quick Order
                </Link>
  
                
  
                {/* Cart Toggle */}"""

new_actions = """              {/* Right Actions */}
              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                
                {/* Mobile Order Tracking Icon */}
                <Link 
                  href="/track-order" 
                  className="lg:hidden p-2 group transition-transform hover:scale-110 flex items-center justify-center"
                  aria-label="Track Order"
                >
                  <Image 
                    src="/track-icon.png" 
                    alt="Track Order" 
                    width={22} 
                    height={22} 
                    className="object-contain filter grayscale brightness-0 opacity-80" 
                  />
                </Link>

                {/* Quick Order Button */}
                <Link href="/shop" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors shadow-sm">
                  <ShoppingCart className="h-4 w-4" />
                  Quick Order
                </Link>
  
                {/* Cart Toggle */}"""

# Need to handle exact spacing. Let's use regex or split.
import re
content = re.sub(r'\{\/\*\s*Right Actions\s*\*\/\}\s*<div className="flex items-center gap-3 md:gap-4 shrink-0">.*?\{\/\*\s*Quick Order Button\s*\*\/\}', 
                 """{/* Right Actions */}
              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                
                {/* Mobile Order Tracking Icon */}
                <Link 
                  href="/track-order" 
                  className="lg:hidden p-2 flex items-center justify-center transition-transform hover:scale-110"
                  aria-label="Track Order"
                >
                  <Image 
                    src="/track-icon.png" 
                    alt="Track Order" 
                    width={22} 
                    height={22} 
                    className="object-contain filter grayscale brightness-0 opacity-80" 
                  />
                </Link>

                {/* Quick Order Button */}""", content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Navbar")
