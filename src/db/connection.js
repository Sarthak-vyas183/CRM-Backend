import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

let pool;

const connectDB = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            port: Number(process.env.MYSQL_PORT), // Use MYSQL_PORT from env
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        // Test connection
        try {
            const connection = await pool.getConnection();
            await connection.ping();
            connection.release();
            console.log("✅ MySQL database connected successfully.");
        } catch (err) {
            console.error("❌ MySQL connection failed:", err);
            throw err;
        }
    }
    return pool;
};

export default connectDB;
