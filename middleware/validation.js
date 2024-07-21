import { validationResult, body } from "express-validator";

const userValidationRules = [
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 8 above"),
];

const validate = (req, res, next) => {
    console.log("Validation middleware executed");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export { validate, userValidationRules };
