const fs = require('fs');

let page = fs.readFileSync('app/admin/(dashboard)/youtube-section/YouTubeSectionClient.tsx', 'utf8');
page = page.replace(/Youtube/g, 'Play');
fs.writeFileSync('app/admin/(dashboard)/youtube-section/YouTubeSectionClient.tsx', page);

let sidebar = fs.readFileSync('components/admin/layout/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(/Youtube/g, 'Play');
fs.writeFileSync('components/admin/layout/Sidebar.tsx', sidebar);

console.log("Fixed icons");
