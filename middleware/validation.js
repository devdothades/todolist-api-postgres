// import { validator } from "express-validator";
import util from "util";
import { check, oneOf, validationResult } from "express-validator";

const validation = [
    oneOf(
        [check("email").exists().withMessage("email is required").isEmail()],
        [check("password").exists().withMessage("password is required")]
    ),
];

const handleValidationErrors = (req, res, next) => {
    next();
};

export default handleValidationErrors;
