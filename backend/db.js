import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // keep it

console.log("=== ENV KEYS IN RUNTIME ===");
console.log(Object.keys(process.env)); // <---- list all env keys
console.log("===========================");

console.log("DATABASE_URL ->", process.env.DATABASE_URL);

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("📌 Connected"))
    .catch(err => console.error("❌ DB FAILED\n", err));
