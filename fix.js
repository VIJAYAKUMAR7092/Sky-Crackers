const fs = require('fs');
let page = fs.readFileSync('app/(store)/page.tsx', 'utf8');
page = page.replace('          </section>\r\n        )}\r\n        \r\n              {/* ABOUT US SECTION */}', '          </section>\r\n        \r\n              {/* ABOUT US SECTION */}');
page = page.replace('          </section>\n        )}\n        \n              {/* ABOUT US SECTION */}', '          </section>\n        \n              {/* ABOUT US SECTION */}');
fs.writeFileSync('app/(store)/page.tsx', page);
