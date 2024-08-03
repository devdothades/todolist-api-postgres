import pool from "../model/schema.js";

const addTask = async (req, res) => {
    const { task, status } = req.body;
    const userId = req.userId;

    try {
        const query = await pool.query(
            "INSERT INTO todos (task, status, user_id) VALUES ($1, $2, $3) RETURNING *",
            [task, status, userId]
        );
        res.status(200).json({ todos: query.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const getTask = async (req, res) => {};
const updateTask = async (req, res) => {};
const deleteTask = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask };
