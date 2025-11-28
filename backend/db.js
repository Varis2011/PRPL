import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });   // ← force load

const { Pool } = pkg;

console.log("DEBUG ENV → DATABASE_URL =", process.env.DATABASE_URL); // MUST PRINT VALUE

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("📌 PostgreSQL Connected Successfully"))
    .catch(err => {
        console.log("❌ Database Connection Failed");
        console.error(err);
    });

export default pool;
