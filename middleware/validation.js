import { body, validationResult } from "express-validator";

const authValidator = (req, res, next) => {
    if (body("email").notEmpty().isEmail()) {
        next();
    } else {
        res.send("email is not valid");
    }
};

export default authValidator;
