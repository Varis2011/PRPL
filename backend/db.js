// db.js
import pkg from 'pg';

const { Pool } = pkg;

// Use DATABASE_URL from environment (Railway injects this automatically)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined. Make sure it's set in Railway service variables!");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // required for Railway/Postgres over SSL
  },
});

// Test connection
pool.connect()
  .then(() => console.log("📌 PostgreSQL Connected Successfully"))
  .catch(err => {
    console.error("❌ Database Connection Failed");
    console.error(err);
    process.exit(1); // fail fast if DB cannot connect
  });

export default pool;
