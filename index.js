import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import pool from "./model/schema.js";
import userRouter from "./routes/userRoute.js";
// import todoRouter from "./routes/todoRoute.js";

dotenv.configDotenv();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is running on port ${process.env.PORT} and connected to the ${process.env.DB_NAME} database`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/auth/api/v1/", userRouter);
