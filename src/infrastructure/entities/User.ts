import UserModel from "../models/user.model";
import { IUser } from "../../app/interfaces/Interfaces";

export default class User {
	public static create(data: IUser): Promise<boolean> {
		const { userName, email, password, roleId = 1 } = data;
		return new Promise((resolve, reject) => {
			try {
				UserModel.create({
					userName,
					email,
					password,
					roleId,
				});
				resolve(true);
			} catch (err) {
				console.error(err);
				reject(false);
			}
		});
	}

	public static getUserByEmail(email: string): Promise<IUser | boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const user = <any>(await UserModel.findOne({
					where: { email, isActive: true },
					attributes: [
						"id",
						"userName",
						"password",
						"email",
						"roleId",
					],
				}));
				resolve(user!);
			} catch (err) {
				console.error(err);
				resolve(false);
			}
		});
	}

	public static getUserById(id: string): Promise<object | boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await UserModel.findOne({
					where: { id, isActive: true },
					attributes: [
						"id",
						"userName",
						"password",
						"email",
						"roleId",
					],
				});
				resolve(user!);
			} catch (err) {
				console.error(err);
				resolve(false);
			}
		});
	}
}
