import { Router } from "express";
import * as authController from "../controllers/AuthController";
import * as authMiddleware from "../middlewares/AuthMiddleware";

const authRouter = Router();

authRouter.use(authMiddleware.dataValidator);

export default authRouter
	.get("/login", authController.loginPage)
	.post("/login", authController.login)
	.get("/register", authController.registerPage)
	.post("/register", authController.register)
	.post("/logout", authController.logout);
