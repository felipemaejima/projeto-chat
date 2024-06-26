import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlackList from "../entities/BlackList";
import config from "../../../config";

type promiseError = Error | undefined | null;

const saltRounds: number = 10;

export default class Security {
	public static createPasswordHash(password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			bcrypt.hash(
				password,
				saltRounds,
				(err: promiseError, hash: string) => {
					if (err) {
						reject(err);
					} else {
						resolve(hash);
					}
				}
			);
		});
	}

	public static validatePassword(
		password: string,
		passwordHash: string
	): Promise<boolean> {
		return new Promise((resolve, reject) => {
			bcrypt.compare(
				password,
				passwordHash,
				(err: promiseError, result: boolean) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	}

	public static createToken(payload: object): Promise<string> {
		const defaults = {
			expiresMin: config.sessionTime,
			time: new Date(),
			...payload,
		};
		return new Promise((resolve, reject) => {
			jwt.sign(
				defaults,
				<string>config.JWTSecret,
				(err: Error | null, token: string | undefined) => {
					if (err) {
						console.error(err);
						reject(err);
					} else {
						resolve(token || "");
					}
				}
			);
		});
	}

	private static getDecodedToken(token: string): Promise<any> {
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				<string>config.JWTSecret,
				(err: promiseError, decoded: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(decoded);
					}
				}
			);
		});
	}

	public static verifyTokenValidity(token: string): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			const inBlacklist = await Security.checkBlacklist(token);
			if (inBlacklist) resolve(false);
			try {
				const decoded = await Security.getDecodedToken(token);
				let isValid = false;
				if (!decoded) resolve(isValid);
				const time = new Date(decoded.time);
				const expiresMin = decoded.expiresMin;
				const currentDate = new Date();
				const timeSession = currentDate.getTime() - time.getTime();
				const validity = Math.floor(timeSession / 1000 / 60);
				isValid = !!(validity < expiresMin);
				resolve(isValid);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}

	private static checkBlacklist(token: string): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const blacklist = await BlackList.check(token);
				resolve(!!blacklist);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}

	public static invalidateToken(token: string): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				await BlackList.add(token);
				resolve(true);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}

	public static getUserId(token: string): Promise<number> {
		return new Promise(async (resolve, reject) => {
			try {
				const decoded = await Security.getDecodedToken(token);
				resolve(decoded.userId);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}

	public static getUserRole(token: string): Promise<number> {
		return new Promise(async (resolve, reject) => {
			try {
				const decoded = await Security.getDecodedToken(token);
				resolve(decoded.role);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}
}
