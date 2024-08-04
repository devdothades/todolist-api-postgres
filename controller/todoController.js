import pool from "../model/schema.js";

const addTask = async (req, res) => {
    const { task, status } = req.body;
    const userId = req.userId;

    const query = {
        name: "add-task",
        text: "INSERT INTO todos (task, status, user_id) VALUES ($1, $2, $3) RETURNING *",
        values: [task, status, userId],
    };

    try {
        const result = await pool.query(query);
        res.status(200).json({ todos: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const getTask = async (req, res) => {
    const userId = req.userId;
    const query = {
        name: "get-tasks",
        text: "SELECT * FROM todos WHERE user_id=$1",
        values: [userId],
    };

    try {
        const result = await pool.query(query);
        const data = result.rows;

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateTask = async (req, res) => {
    const { task, status } = req.body;
    const { id } = req.params;
    const userId = req.userId;

    if (!task || !status || !id || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const query = {
        name: "update-task",
        text: "UPDATE todos SET task=$1, status=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
        values: [task, status, id, userId],
    };

    try {
        const result = await pool.query(query);

        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ message: "Task not found or you're not authorized" });
        }

        const data = result.rows[0];
        res.status(200).json({ data });
    } catch (error) {
        console.error("Error updating task:", error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};
const deleteTask = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;

    const query = {
        name: "get-tasks",
        text: "DELETE FROM todos WHERE id=$1 and user_id=$2",
        values: [id, userId],
    };

    try {
        const result = await pool.query(query);

        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ message: "Task not found or you're not authorized" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { addTask, getTask, updateTask, deleteTask };
