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

// router.use(taskValidationRules);
// router.use(validate);
router.use(authenticateToken);

router.post("/add", taskValidationRules, validate, addTask);
router.get("/get", getTask);
router.patch("/update/:id", taskValidationRules, validate, updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
