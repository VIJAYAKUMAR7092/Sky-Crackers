const fs = require('fs');
let code = fs.readFileSync('lib/services/cms/cms.service.ts', 'utf8');

const oldFallback = `return settings || { id: 'global', siteName: 'Sky Crackers', logoUrl: null, supportPhone: null, supportEmail: null, whatsappNumber: null, facebookUrl: null, instagramUrl: null, youtubeUrl: null, twitterUrl: null, address: null, footerText: null, maintenanceMode: false, minimumOrderAmount: 0 };`;
const oldCatchFallback = `return { id: 'global', siteName: 'Sky Crackers' };`;

const newFallback = `return settings || { id: 'global', siteName: 'Sky Crackers', logoUrl: null, primaryPhone: null, whatsapp: null, email: null, address: null, facebook: null, instagram: null, youtube: null, twitter: null, footerText: null, priceListUrl: null, comboValidUpto: null, defaultMinOrder: 5000 as any };`;
const newCatchFallback = `return { id: 'global', siteName: 'Sky Crackers', logoUrl: null, primaryPhone: null, whatsapp: null, email: null, address: null, facebook: null, instagram: null, youtube: null, twitter: null, footerText: null, priceListUrl: null, comboValidUpto: null, defaultMinOrder: 5000 as any };`;

code = code.replace(oldFallback, newFallback);
code = code.replace(oldCatchFallback, newCatchFallback);

fs.writeFileSync('lib/services/cms/cms.service.ts', code);
