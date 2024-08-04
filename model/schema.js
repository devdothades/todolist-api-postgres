import pg from "pg";
import dotenv from "dotenv";
dotenv.configDotenv();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

const createTables = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )`;

    const queryText2 = `CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        task VARCHAR(128) NOT NULL,
        status BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    )`;

    try {
        const res = await pool.query(queryText2);
        console.log(res);
        console.log("Tables created successfully");
    } catch (err) {
        console.log(err);
    }
};

// createTables();

export default pool;
