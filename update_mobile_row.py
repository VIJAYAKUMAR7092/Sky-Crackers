import os

file_path = 'components/public/ui/MobileProductRow.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace handles
old_handlers = """  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    if (val === 0) {
      removeItem(product.id);
    } else if (inCartQty === 0 && val > 0) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.sellingPrice),
        mrp: Number(product.mrp),
        imageUrl: product.images?.[0]?.url || "/placeholder.png",
        packInfo: product.packInfo || "1 Box"
      }, val);
    } else if (val > 0) {
      updateQuantity(product.id, val);
    }
  };"""

new_handlers = """  const handleIncrease = () => {
    if (inCartQty === 0) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.sellingPrice),
        mrp: Number(product.mrp),
        imageUrl: product.images?.[0]?.url || "/placeholder.png",
        packInfo: product.packInfo || "1 Box"
      }, 1);
    } else {
      updateQuantity(product.id, inCartQty + 1);
    }
  };

  const handleDecrease = () => {
    if (inCartQty <= 1) {
      if (inCartQty === 1) removeItem(product.id);
    } else {
      updateQuantity(product.id, inCartQty - 1);
    }
  };"""

content = content.replace(old_handlers, new_handlers)

# Replace Wrapper class
old_wrapper = 'className="flex items-center py-2 px-1 border-b border-primary/20 bg-white min-h-[60px]"'
new_wrapper = 'className="flex items-center py-3 px-2 border-b border-primary/20 bg-white min-h-[70px] gap-1"'
content = content.replace(old_wrapper, new_wrapper)

# Replace Image Box class
old_img_box = 'className="w-[42px] h-[42px] shrink-0 bg-gray-50 border border-gray-200 rounded flex items-center justify-center p-0.5 cursor-pointer relative"'
new_img_box = 'className="w-[48px] h-[48px] shrink-0 bg-gray-50 border border-gray-200 rounded flex items-center justify-center p-0.5 cursor-pointer relative"'
content = content.replace(old_img_box, new_img_box)

old_sizes = 'sizes="42px"'
new_sizes = 'sizes="48px"'
content = content.replace(old_sizes, new_sizes)

# Replace Price, QTY, Total sizes & HTML
old_price = 'w-[52px] shrink-0 flex flex-col items-center justify-center text-center'
new_price = 'w-[56px] shrink-0 flex flex-col items-center justify-center text-center'
content = content.replace(old_price, new_price)

old_qty = """        <div className="w-[44px] shrink-0 flex items-center justify-center px-1">
          {product.stockStatus === "OUT_OF_STOCK" ? (
            <span className="text-[8px] font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded">OUT</span>
          ) : (
            <input 
              type="number" 
              min="0"
              value={inCartQty || ""}
              onChange={handleQtyChange}
              className="w-full h-7 border border-primary text-center text-[12px] font-bold text-primary rounded outline-none focus:ring-1 focus:ring-primary bg-transparent"
              placeholder=""
            />
          )}
        </div>"""

new_qty = """        <div className="w-[66px] shrink-0 flex items-center justify-center px-0.5">
          {product.stockStatus === "OUT_OF_STOCK" ? (
            <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-1 rounded">OUT</span>
          ) : (
            <div className="flex items-center justify-between border border-primary/40 rounded-md overflow-hidden bg-white w-full h-[28px]">
              <button 
                onClick={handleDecrease}
                className="w-5 h-full flex items-center justify-center text-primary font-bold text-sm bg-red-50/50 hover:bg-red-50 active:bg-red-100"
              >
                -
              </button>
              <span className="flex-1 flex items-center justify-center text-[12px] font-bold text-gray-900 border-x border-primary/20 bg-white">
                {inCartQty || 0}
              </span>
              <button 
                onClick={handleIncrease}
                className="w-5 h-full flex items-center justify-center text-primary font-bold text-sm bg-red-50/50 hover:bg-red-50 active:bg-red-100"
              >
                +
              </button>
            </div>
          )}
        </div>"""
content = content.replace(old_qty, new_qty)

old_total = 'w-[52px] shrink-0 text-right pr-1'
new_total = 'w-[56px] shrink-0 text-right pr-1'
content = content.replace(old_total, new_total)

old_total_text = 'text-[10px] text-gray-500'
new_total_text = 'text-[11px] text-gray-600'
content = content.replace(old_total_text, new_total_text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
