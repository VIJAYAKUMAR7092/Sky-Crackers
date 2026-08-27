const fs = require('fs');
const content = fs.readFileSync('output.txt', 'utf8');
const match = content.match(/\{"cats":\[.*\]\}/);
if (match) {
   const data = JSON.parse(match[0]);
   data.cats.forEach(c => console.log(`${c.displayOrder} : ${c.name}`));
}
