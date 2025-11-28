// backend/db.js
import pkg from 'pg';
const { Pool } = pkg;

// DATABASE_URL comes from Railway environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // required for Railway Postgres
});

// Test connection immediately
pool.connect()
    .then(() => console.log('📌 PostgreSQL Connected Successfully'))
    .catch(err => {
        console.error('❌ Database Connection Failed');
        console.error(err);
    });

export { pool }; // <-- named export for ES modules
