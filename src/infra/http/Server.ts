import express from "express";
import config from "../../../config";
import { accessValidator } from "../../app/middlewares/AuthMiddleware";
import authRouter from "../../app/routes/authRoutes";
import userRouter from "../../app/routes/userRoutes";
import DatabaseConnection from "../database/DatabaseConnection";

const db = new DatabaseConnection();

db.connect();

const app = express();

app.use(require("cors")());

app.use(express.json());

app.use("/auth/", authRouter);
app.use("/profile/", accessValidator, userRouter);

app.listen(config.port, () => {
	console.log(`Servidor rodando na porta ${config.port}`);
});
