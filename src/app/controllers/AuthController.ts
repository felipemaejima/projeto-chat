import { Request, Response } from "express";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";
import Security from "../../infrastructure/security/Security";
import User from "../../infrastructure/entities/User";
import { IUser } from "../interfaces/Interfaces";
import config from "../../../config";

const db = new DatabaseConnection();

db.connect();

export async function registerPage() {}

export async function register(req: Request, res: Response) {
	const { userName, email, password, roleId = 1 } = req.body;

	const passwordHash: string = await Security.createPasswordHash(password);

	try {
		const user = await User.create({
			userName,
			email,
			password: passwordHash,
			roleId,
		});
		return res
			.status(200)
			.json({ error: false, message: "user created successfully" });
	} catch (err: any) {
		console.error(err);
		return res
			.status(500)
			.json({ error: true, message: "An unexpected error occurred" });
	}
}

export async function loginPage(req: Request, res: Response) {}

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	const {
		password: hash,
		id,
		roleId,
	} = <IUser>(await User.getUserByEmail(email));
	try {
		const isPasswordValid = await Security.validatePassword(password, hash);

		if (isPasswordValid) {
			const token = await Security.createToken({ id, roleId });
			return res.status(200).json({
				error: false,
				message: "user login successfully",
				token,
			});
		}

		return res
			.status(400)
			.json({ error: true, message: "user or password invalid" });
	} catch (err: any) {
		console.error(err);
		return res
			.status(500)
			.json({ error: true, message: "An unexpected error occurred" });
	}
}

export async function logout(req: Request, res: Response) {}
