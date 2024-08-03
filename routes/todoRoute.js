import authenticateToken from "../middleware/auth.js";
import { Router } from "express";
import {
    addTask,
    getTask,
    updateTask,
    deleteTask,
} from "../controller/todoController.js";

const router = Router();

router.use(authenticateToken);

router.post("/add", addTask);
router.get("/add", getTask);
router.patch("/add", updateTask);
router.delete("/add", deleteTask);

export default router;
