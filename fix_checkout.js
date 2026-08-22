const fs = require('fs');
let content = fs.readFileSync('app/(store)/checkout/page.tsx', 'utf8');

content = content.replace(
  'pincode: "",\r\n      notes: ""',
  'state: "Tamil Nadu",\r\n      pincode: "",\r\n      notes: ""'
);
content = content.replace(
  'pincode: "",\n      notes: ""',
  'state: "Tamil Nadu",\n      pincode: "",\n      notes: ""'
);

content = content.replace(
  'state: "Tamil Nadu",',
  'state: formData.state,'
);

content = content.replace(
  /                  <div className="space-y-1">\s*<label className="text-xs font-bold text-primary tracking-wide uppercase">Delivery State \*\s*<\/label>\s*<div className="flex items-center justify-between border border-green-500 bg-green-50 rounded-lg p-3">\s*<div className="flex items-start gap-3">\s*<MapPin className="w-5 h-5 text-primary mt-0\.5" \/>\s*<div>\s*<h4 className="text-sm font-black text-gray-900 uppercase">TAMIL NADU<\/h4>\s*<p className="text-xs font-medium text-gray-500">Min Order: <span className="font-bold text-gray-900">Rs\. 3,000\.00<\/span><\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
  \                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary tracking-wide uppercase">Delivery State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-pink-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>\
);

content = content.replace(
  '<p className="font-bold text-primary mt-1">Tamil Nadu</p>',
  '<p className="font-bold text-primary mt-1">{formData.state}</p>'
);

fs.writeFileSync('app/(store)/checkout/page.tsx', content);
