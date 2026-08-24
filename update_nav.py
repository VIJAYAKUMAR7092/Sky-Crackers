import os

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_navLinks = """  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];"""

new_navLinks = """  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "Order Tracking", href: "/track-order" },
  ];"""

content = content.replace(old_navLinks, new_navLinks)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
