import os
import re

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Footer Background and Height
content = content.replace(
    '<footer className="bg-orange-900 text-orange-100 pt-10 pb-6 relative overflow-hidden">',
    '<footer className="bg-[linear-gradient(135deg,#dc2626_0%,#dc2626_70%,#ea580c_100%)] text-white pt-6 md:pt-10 pb-4 md:pb-6 relative overflow-hidden">'
)

# 2. Update Grid layout to split Information and Categories on mobile
old_grid = '''          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-extrabold mb-4 uppercase text-sm border-b border-white/20 pb-1.5">Information</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/shop' },
                { name: 'About Us', href: '/#about' },
                { name: 'Contact Us', href: '/#contact' },
                { name: 'Delivery Information', href: '/pages/delivery-information' },
                { name: 'Privacy Policy', href: '/pages/privacy-policy' },
                { name: 'Terms & Conditions', href: '/pages/terms-and-conditions' }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm font-medium text-orange-100 hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-extrabold mb-4 uppercase text-sm border-b border-white/20 pb-1.5">Categories</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Sparklers', slug: 'sparklers' },
                { name: 'Flower Pots', slug: 'flower-pots' },
                { name: 'Rockets', slug: 'rockets' },
                { name: 'Gift Boxes', slug: 'gift-boxes' },
                { name: 'Kids Collection', slug: 'kids-collection' }
              ].map((cat, i) => (
                <li key={i}>
                  <Link href={`/shop?category=${cat.slug}`} className="text-sm font-medium text-orange-100 hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>'''

new_grid = '''          {/* Mobile Split Wrapper for Info & Categories */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2 md:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-extrabold mb-3 md:mb-4 uppercase text-[13px] md:text-sm border-b border-white/20 pb-1.5">Information</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Shop', href: '/shop' },
                  { name: 'About Us', href: '/#about' },
                  { name: 'Contact Us', href: '/#contact' },
                  { name: 'Delivery', href: '/pages/delivery-information' },
                  { name: 'Privacy Policy', href: '/pages/privacy-policy' },
                  { name: 'Terms', href: '/pages/terms-and-conditions' }
                ].map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-[12px] md:text-sm font-medium text-orange-50 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200 leading-tight">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-extrabold mb-3 md:mb-4 uppercase text-[13px] md:text-sm border-b border-white/20 pb-1.5">Categories</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Sparklers', slug: 'sparklers' },
                  { name: 'Flower Pots', slug: 'flower-pots' },
                  { name: 'Rockets', slug: 'rockets' },
                  { name: 'Gift Boxes', slug: 'gift-boxes' },
                  { name: 'Kids', slug: 'kids-collection' }
                ].map((cat, i) => (
                  <li key={i}>
                    <Link href={`/shop?category=${cat.slug}`} className="text-[12px] md:text-sm font-medium text-orange-50 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200 leading-tight">{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>'''

content = content.replace(old_grid, new_grid)

# Adjust margins and paddings in the grid overall
content = content.replace(
    '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">',
    '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-8">'
)

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
