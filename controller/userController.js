// import pool from "../model/schema.js";
// import bycrpt from "bcrypt";
import validator from "express-validator";
// import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const login = asyncHandler(async (req, res) => {});

const signup = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    res.send("hello");
});

export { login, signup };
