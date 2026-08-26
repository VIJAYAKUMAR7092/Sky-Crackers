const fs = require('fs');
let c = fs.readFileSync('components/admin/layout/Sidebar.tsx', 'utf8');

c = c.replace(
  `{ title: "Top Banner", href: "/admin/top-banner", icon: LayoutTemplate },`,
  `{ title: "Top Banner", href: "/admin/top-banner", icon: LayoutTemplate },
      { title: "YouTube Section", href: "/admin/youtube-section", icon: Youtube },`
);

if (!c.includes('import {') || !c.includes('Youtube')) {
    c = c.replace('import {', 'import { Youtube,');
}

fs.writeFileSync('components/admin/layout/Sidebar.tsx', c);
console.log("Added YouTube Section to Sidebar");
