const { Pool } = require('pg');

const oldUrl = 'postgresql://neondb_owner:npg_dWkX4HFur9Mq@ep-bold-truth-az8zrqta-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require';
const newUrl = 'postgresql://neondb_owner:npg_Zyc1i3vIpCEq@ep-fancy-salad-b4euxrf1-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const oldPool = new Pool({ connectionString: oldUrl, ssl: { rejectUnauthorized: false } });
const newPool = new Pool({ connectionString: newUrl, ssl: { rejectUnauthorized: false } });

async function run() {
  console.log("Connecting to old database...");
  try {
    const res = await oldPool.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\'');
    console.log("Tables in old DB:");
    const tables = res.rows.map(r => r.tablename).filter(t => !t.startsWith('_prisma'));
    console.log(tables);

    for (const table of tables) {
      console.log(`Copying table: ${table}`);
      try {
        const { rows } = await oldPool.query(`SELECT * FROM "${table}"`);
        if (rows.length === 0) {
          console.log(`Table ${table} is empty, skipping.`);
          continue;
        }

        const columns = Object.keys(rows[0]);
        const params = [];
        const values = [];
        
        let counter = 1;
        for (const row of rows) {
          const rowValues = [];
          for (const col of columns) {
            rowValues.push(`$${counter++}`);
            values.push(row[col]);
          }
          params.push(`(${rowValues.join(',')})`);
        }
        
        const query = `INSERT INTO "${table}" ("${columns.join('","')}") VALUES ${params.join(',')} ON CONFLICT DO NOTHING;`;
        await newPool.query(query, values);
        console.log(`Successfully copied ${rows.length} rows to ${table}.`);
      } catch (e) {
        console.error(`Error copying table ${table}:`, e.message);
      }
    }
  } catch (err) {
    console.error("Failed to connect or query old database:", err.message);
  } finally {
    await oldPool.end();
    await newPool.end();
  }
}

run();
