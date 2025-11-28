import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("📌 PostgreSQL Connected Successfully"))
    .catch(err => {
        console.log("❌ Database Connection Failed");
        console.error(err);  // ← MUST SHOW FULL ERROR
    });

export default pool;
