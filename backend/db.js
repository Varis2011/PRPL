// db.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

// Create pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Railway/Postgres SSL
});

// Test connection
pool.connect()
  .then(() => console.log("📌 PostgreSQL Connected Successfully"))
  .catch(err => {
    console.error("❌ Database Connection Failed");
    console.error(err);
  });
