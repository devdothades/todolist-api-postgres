import { buildCheckFunction } from "express-validator";
import pool from "../model/schema.js";
import bycrpt from "bcrypt";
// import jwt from "jsonwebtoken";

const login = async (req, res) => {};

const signup = async (req, res) => {
    const { password, email } = req.body;

    try {
        // Query the database to find if the email is already registered
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // Check if any rows are returned
        if (result.rows.length > 0) {
            return res.status(401).json({ msg: "Account already registered" });
        }

        // Proceed with account creation (you would typically insert the new user into the database here)
        // e.g., hash the password, insert user into the users table, etc.

        const gensalt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password, gensalt);

        const query = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hashedPassword]
        );
        res.status(200).json({ query: "account created" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export { login, signup };
