const fs = require('fs');
let code = fs.readFileSync('components/public/shop/ShopClientView.tsx', 'utf8');

const oldSort = `      sorted.sort((a, b) => {
        const orderA = a.displayOrder ?? 9999;
        const orderB = b.displayOrder ?? 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
      });`;

const newSort = `      sorted.sort((a, b) => {
        const orderA = a.displayOrder ?? 9999;
        const orderB = b.displayOrder ?? 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });`;

code = code.replace(oldSort, newSort);
fs.writeFileSync('components/public/shop/ShopClientView.tsx', code);
