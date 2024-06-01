import { Request, Response } from "express";
import Security from "../../infrastructure/security/Security";
import User from "../../infrastructure/entities/User";
import config from "../../../config";
import { isValidEmail } from "../helpers/Helper";

interface IErrors {
	error: boolean;
	message: {
		[key: string]: string;
	} | null;
}

const checkToken = async (token: string | null): Promise<boolean> => {
	if (!token) return false;

	const sessionToken = token?.split(" ")[1];
	const isValidToken = await Security.verifyTokenValidity(sessionToken!);

	if (!isValidToken) return false;

	return true;
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
	let errors: IErrors = {
		error: false,
		message: null,
	};

	if (req.path === "/register" && req.method === "POST") {
		if (!data.userName)
			errors = {
				error: true,
				message: { userName: "username is required" },
			};

		if (!data.email)
			errors = {
				error: true,
				message: { ...errors.message, email: "email is required" },
			};

		const emailIsUnique: boolean = !!(await User.getUserByEmail(
			data.email
		));

		if (data.email && emailIsUnique)
			errors = {
				error: true,
				message: { ...errors.message, email: "email must be unique" },
			};

		if (data.email && !isValidEmail(data.email))
			errors = {
				error: true,
				message: { ...errors.message, email: "email is not valid" },
			};

		if (!data.password)
			errors = {
				error: true,
				message: {
					...errors.message,
					password: "password is required",
				},
			};

		if (data.password && data.password !== data.confirmPassword)
			errors = {
				error: true,
				message: {
					...errors.message,
					password: "passwords do not match",
				},
			};

		if (data.password && data.password.length < config.passMinLength)
			errors = {
				error: true,
				message: {
					...errors.message,
					password: `password must be at least ${config.passMinLength} characters long`,
				},
			};

		if (errors.error) {
			return res.status(400).json(errors);
		}

		next();
	}

	if (req.path === "/login" && req.method === "POST") {
		if (await checkToken(req.headers.authorization || null))
			return res
				.status(400)
				.json({ error: true, message: "already logged" });

		const data: any = req.body;

		if (!data.email)
			errors = { error: true, message: { email: "email is required" } };

		const emailIsUnique: boolean = !!(await User.getUserByEmail(
			data.email
		));

		if (data.email && !emailIsUnique)
			errors = {
				error: true,
				message: { ...errors.message, email: "email not found" },
			};

		if (data.email && !isValidEmail(data.email))
			errors = {
				error: true,
				message: { ...errors.message, email: "email is not valid" },
			};

		if (!data.password)
			errors = {
				error: true,
				message: {
					...errors.message,
					password: "password is required",
				},
			};

		if (errors.error) {
			return res.status(400).json(errors);
		}

		next();
	}

	if (req.method !== "POST") {
		next();
	}
}
