import os

file_path = 'components/public/cart/BottomCartPopup.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = """  // Hide on checkout page or cart page
  if (pathname === "/checkout" || pathname === "/cart") {
    return null;
  }

  // Calculate totals
  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);

  // Animate the total when it changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (cartTotal > 0) {
      setAnimateTotal(true);
      const timer = setTimeout(() => setAnimateTotal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartTotal]);"""

new_logic = """  // Calculate totals
  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);

  // Animate the total when it changes
  useEffect(() => {
    if (cartTotal > 0) {
      setAnimateTotal(true);
      const timer = setTimeout(() => setAnimateTotal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartTotal]);

  // Hide on checkout page or cart page
  if (pathname === "/checkout" || pathname === "/cart") {
    return null;
  }"""

content = content.replace(old_logic, new_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
