import { Router } from "express";
import { login, signup } from "../controller/userController.js";
import handleValidationErrors from "../middleware/validation.js";

const router = Router();

router.post("/login", login);
// router.post("/signup", handleValidationErrors, signup);

import { check, validationResult } from "express-validator";

router.post(
    "/signup",
    [check("username").isEmail(), check("password").isLength({ min: 5 })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // create/update the user however you want?
    }
);

export default router;
