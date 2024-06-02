import { Request, Response } from "express";
import Security from "../../infrastructure/security/Security";
import User from "../../infrastructure/entities/User";
import config from "../../../config";
import { isValidEmail, checkToken } from "../helpers/Helper";
import { IResponse } from "../interfaces/protocols";

let response: IResponse = {
	error: false,
	message: {},
};

export async function accessValidator(req: Request, res: Response, next: any) {
	const token: string | null =
		req.headers.authorization?.split(" ")[1] || null;

	if (!token) {
		return res.status(400).json({ error: true, message: "access denied" });
	}
	const tokenIsValidy = await Security.verifyTokenValidity(token);

	if (!tokenIsValidy) {
		return res.status(400).json({ error: true, message: "access denied" });
	}
	next();
}

export async function dataValidator(req: Request, res: Response, next: any) {
	const data: any = req.body;

	if (req.path === "/register" && req.method === "POST") {
		if (!data.userName)
			response = {
				error: true,
				message: { userName: "username is required" },
			};

		if (!data.email)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					email: "email is required",
				},
			};

		const emailIsUnique: boolean = !!(await User.getUserByEmail(
			data.email
		));

		if (data.email && emailIsUnique)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					email: "email must be unique",
				},
			};

		if (data.email && !isValidEmail(data.email))
			response = {
				error: true,
				message: {
					...(<object>response.message),
					email: "email is not valid",
				},
			};

		if (!data.password)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					password: "password is required",
				},
			};

		if (data.password && data.password !== data.confirmPassword)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					password: "passwords do not match",
				},
			};

		if (data.password && data.password.length < config.passMinLength)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					password: `password must be at least ${config.passMinLength} characters long`,
				},
			};

		if (response.error) {
			return res.status(400).json(response);
		}

		next();
	}

	if (req.path === "/login" && req.method === "POST") {
		if (await checkToken(req.headers.authorization || null)) {
			response = { error: true, message: "already logged" };
			return res.status(400).json(response);
		}

		if (!data.email)
			response = { error: true, message: { email: "email is required" } };

		const emailIsUnique: boolean = !!(await User.getUserByEmail(
			data.email
		));

		if (data.email && !emailIsUnique)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					email: "email not found",
				},
			};

		if (data.email && !isValidEmail(data.email))
			response = {
				error: true,
				message: {
					...(<object>response.message),
					email: "email is not valid",
				},
			};

		if (!data.password)
			response = {
				error: true,
				message: {
					...(<object>response.message),
					password: "password is required",
				},
			};

		if (response.error) {
			return res.status(400).json(response);
		}

		next();
	}

	if (req.method !== "POST") {
		if (await checkToken(req.headers.authorization || null)) {
			response = {
				error: true,
				message: "already logged",
				redirect: true,
				url: "/dashboard",
			};

			return res.status(400).json(response);
		}

		next();
	}

	if (req.method === "POST" || req.path === "/logout") next();
}
