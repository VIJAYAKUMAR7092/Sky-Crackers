const fs = require('fs');
let c = fs.readFileSync('components/admin/layout/Sidebar.tsx', 'utf8');
if (!c.includes('Youtube,')) {
    c = c.replace('LayoutDashboard,', 'LayoutDashboard, Youtube,');
    fs.writeFileSync('components/admin/layout/Sidebar.tsx', c);
}
console.log("Fixed Youtube import in Sidebar");
