import os

file_path = 'components/public/ui/WishlistWidget.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Rupee symbol
content = content.replace(",1{item.price.toLocaleString", "₹{item.price.toLocaleString")
content = content.replace(",1{item.mrp.toFixed(0)}", "₹{item.mrp.toFixed(0)}")

# Improve drawer closing animation to "go back to the button"
old_drawer_class = """      <div 
        className={`fixed z-[101] bg-[#FFFFFA] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col 
          /* Desktop: Right Drawer */
          md:top-0 md:right-0 md:h-screen md:w-[450px] 
          ${isOpen ? "md:translate-x-0" : "md:translate-x-full"}
          
          /* Mobile: Bottom Sheet */
          bottom-0 left-0 w-full h-[85vh] rounded-t-3xl md:rounded-none
          ${isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
        `}
      >"""

new_drawer_class = """      <div 
        className={`fixed z-[101] bg-[#FFFFFA] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col origin-right
          /* Desktop: Right Drawer */
          md:top-0 md:right-0 md:h-screen md:w-[450px] 
          ${isOpen ? "md:translate-x-0 md:scale-100 md:opacity-100" : "md:translate-x-[50%] md:scale-75 md:opacity-0 md:pointer-events-none"}
          
          /* Mobile: Bottom Sheet */
          bottom-0 left-0 w-full h-[85vh] rounded-t-3xl md:rounded-none origin-bottom
          ${isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-full scale-95 opacity-0 pointer-events-none md:translate-y-0"}
        `}
      >"""

content = content.replace(old_drawer_class, new_drawer_class)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
