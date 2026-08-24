import os

file_path = 'components/public/layout/Navbar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_navLinks = """  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "Order Tracking", href: "/track-order" },
  ];"""

new_navLinks = """  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "Order Tracking", href: "/track-order" },
    { name: "Payments", href: "/payments" },
  ];"""

if old_navLinks in content:
    content = content.replace(old_navLinks, new_navLinks)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Navbar updated successfully.")
else:
    print("Could not find exact navLinks block.")
