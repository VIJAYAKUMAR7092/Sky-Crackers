const fs = require('fs');
let c = fs.readFileSync('app/(store)/page.tsx', 'utf8');

c = c.replace(
  '<a href="https://youtube.com/@skycrackersofficial"',
  '<a href={displayVideos[0]?.youtubeUrl || "https://youtube.com/@skycrackersofficial"}'
);

fs.writeFileSync('app/(store)/page.tsx', c);
console.log("Fixed page.tsx button");
