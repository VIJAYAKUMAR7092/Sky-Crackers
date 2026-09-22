const fs = require('fs');
let code = fs.readFileSync('.env', 'utf8');

const oldUrl = 'DATABASE_URL="postgresql://neondb_owner:npg_dWkX4HFur9Mq@ep-bold-truth-az8zrqta-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"';
const newUrl = 'DATABASE_URL="postgresql://neondb_owner:npg_Zyc1i3vIpCEq@ep-fancy-salad-b4euxrf1-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"';

if (code.includes(oldUrl)) {
  code = code.replace(oldUrl, newUrl);
} else {
  // Regex replace if exact match fails
  code = code.replace(/DATABASE_URL=".*"/, newUrl);
}

// Keep the old url around just in case
code += `\nOLD_DATABASE_URL="postgresql://neondb_owner:npg_dWkX4HFur9Mq@ep-bold-truth-az8zrqta-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"`;

fs.writeFileSync('.env', code);
