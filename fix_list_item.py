import re

with open('components/public/ui/ProductListItem.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_return = '''  return (
    <tr className="table-row border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
      
      {/* 1. Name & Image */}
      <td className="px-1 sm:px-2 py-2 sm:py-3 align-middle">
        <div className="flex items-center gap-1 sm:gap-2">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 relative rounded border border-gray-200 bg-white shrink-0 cursor-pointer"
            onClick={() => setIsZoomed(true)}
          >
            <Image 
              src={imgUrl}
              alt={product.name}
              fill
              sizes="48px"
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col">
            <Link href={/product/} className="hover:text-primary transition-colors">
              <h4 className="font-bold text-[10px] sm:text-xs text-gray-900 leading-tight line-clamp-2">{product.name}</h4>
            </Link>
            <span className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">{packInfo}</span>
          </div>
        </div>
      </td>

      {/* 2. Price */}
      <td className="px-1 sm:px-2 py-2 sm:py-3 text-center align-middle">
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-[10px] sm:text-sm text-gray-900 leading-none">₹{Number(product.sellingPrice).toFixed(0)}</span>
          {Number(product.mrp) > Number(product.sellingPrice) && (
            <span className="text-[8px] sm:text-[10px] text-gray-400 line-through mt-0.5">₹{Number(product.mrp).toFixed(0)}</span>
          )}
        </div>
      </td>

      {/* 3. Qty */}
      <td className="px-1 sm:px-2 py-2 sm:py-3 text-center align-middle">
        {isOutOfStock ? (
          <span className="text-[9px] sm:text-xs font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded">OUT</span>
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-sm w-[56px] sm:w-[70px]">
              <button 
                onClick={handleDecrement} 
                className="w-1/3 py-1 sm:py-1.5 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors disabled:opacity-50" 
                disabled={inCartQty === 0}
              >
                <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
              </button>
              <div className="w-1/3 flex items-center justify-center border-x border-gray-200 bg-gray-50">
                <span className="text-[10px] sm:text-xs font-bold text-gray-900">{inCartQty}</span>
              </div>
              <button 
                onClick={handleIncrement} 
                className="w-1/3 py-1 sm:py-1.5 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
              >
                <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
              </button>
            </div>
          </div>
        )}
      </td>

      {/* 4. Total */}
      <td className="px-1 sm:px-2 py-2 sm:py-3 text-right align-middle">
        <span className={ont-bold text-[10px] sm:text-sm }>
          {rowTotal > 0 ? ₹ : '-'}
        </span>
      </td>
      
    </tr>
  );
}'''

content = re.sub(
    r'  return \(\s*<>\s*<tr.*?</>\s*\);\s*}',
    new_return,
    content,
    flags=re.DOTALL
)

with open('components/public/ui/ProductListItem.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated ProductListItem.tsx')
