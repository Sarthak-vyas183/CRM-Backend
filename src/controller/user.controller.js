import connectDB from "../db/connection.js";

const createUser = async (req, res) => {
    try {
        const { fullName, email, password, contact } = req.body;
        if (!fullName || !email || !password || !contact) {
            return res.status(400).json({ error: "fullName, email, password, and contact are required" });
        }
        const pool = await connectDB();
        const [result] = await pool.query(
            `INSERT INTO users 
                (fullName, email, password, contact) 
             VALUES (?, ?, ?, ?)`,
            [fullName, email, password, contact]
        );
        res.status(201).json({ id: result.insertId, fullName, email, contact });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createUser }