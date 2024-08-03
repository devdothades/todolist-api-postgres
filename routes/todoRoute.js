import authenticateToken from "../middleware/auth.js";
import { Router } from "express";
import {
    addTask,
    getTask,
    updateTask,
    deleteTask,
} from "../controller/todoController.js";
import { validate, taskValidationRules } from "../middleware/validation.js";

const router = Router();

router.use(taskValidationRules);
router.use(validate);
router.use(authenticateToken);

router.post("/add", addTask);
router.get("/add", getTask);
router.patch("/add", updateTask);
router.delete("/add", deleteTask);

export default router;
