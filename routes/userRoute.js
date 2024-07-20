import { Router } from "express";
import { login, signup } from "../controller/userController.js";
import { query, body, validationResult } from "express-validator";
import authValidator from "../middleware/validation.js";

const router = Router();

router.post("/login", login);
router.post("/signup", authValidator, signup);

// router.post("/hello", query("email").notEmpty().escape(), (req, res) => {
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//         return res.send(`Hello, ${req.query.email}!`);
//     }

//     res.send({ errors: result.array() });
// });
export default router;
