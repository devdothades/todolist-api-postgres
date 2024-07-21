import { Router } from "express";
import { login, signup } from "../controller/userController.js";
import { validate, userValidationRules } from "../middleware/validation.js";

const router = Router();

// middleware for password and email validation
router.use(userValidationRules);
router.use(validate);

router.post("/login", login);
router.post("/signup", signup);

export default router;
