import { Request, Response } from "express";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";
import Security from "../../infrastructure/security/Security";
import User from "../../infrastructure/entities/User";
import { IHttpResponse, IUser } from "../interfaces/protocols";

let response: IHttpResponse = {
	error: false,
	message: {},
};

export async function registerPage(req: Request, res: Response) {
	response = {
		error: false,
		message: {},
		redirect: true,
		url: "/auth/register",
	}
	return res.status(200).json(response);
}

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
		response = {
			error: false,
			message: "user created successfully",
		};
		return res.status(200).json(response);
	} catch (err: any) {
		response = {
			error: true,
			message: "An unexpected error occurred",
		};
		console.error(err);
		return res.status(500).json(response);
	}
}

export async function loginPage(req: Request, res: Response) {
	response = {
		error: false,
		message: {},
		redirect: true,
		url: "/auth/login",
	}
	return res.status(200).json(response);
}



export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	const {
		password: hash,
		id,
		roleId,
	} = <IUser>await User.findByEmail(email);
	try {
		const isPasswordValid = await Security.validatePassword(password, hash);

		if (isPasswordValid) {
			const token = await Security.createToken({ id, roleId });
			response = {
				error: false,
				message: "user login successfully",
				token,
			};
			return res.status(200).json(response);
		}

		response = {
			error: true,
			message: "user or password invalid",
		};
		return res.status(400).json(response);
	} catch (err: any) {
		console.error(err);
		response = {
			error: true,
			message: "An unexpected error occurred",
		};
		return res.status(500).json(response);
	}
}

export async function logout(req: Request, res: Response) {

	const token = req.headers.authorization?.split(" ")[1]!;
	try {
		await Security.invalidateToken(token);

		response = {
			error: false,
			message: "user disconnected successfully",
		};

		return res.status(200).json(response);
	} catch (err) {
		response = {
			error: true,
			message: "An unexpected error occurred",
		};
		console.error(err);
		return res.status(500).json(response);
	}
}
