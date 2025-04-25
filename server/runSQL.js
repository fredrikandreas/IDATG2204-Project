const fs = require('fs');
const db = require('./db');

const schema = fs.readFileSync('schema.sql', 'utf8');

(async () => {
  try {
    await db.query(schema);
    console.log(' Schema executed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to run schema:', err);
    process.exit(1);
  }
})();
