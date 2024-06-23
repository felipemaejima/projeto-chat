import UserModel from "../models/user.model";
import { IUser } from "../../app/interfaces/protocols";

export default class User {
	public static create(user: IUser): Promise<boolean> {
		const { userName, email, password, roleId } = user;
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
				reject(err);
			}
		});
	}

	public static findByEmail(email: string = ""): Promise<IUser | boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const user = <any>await UserModel.findOne({
					where: { email, isActive: true },
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
				reject(err);
			}
		});
	}

	public static findById(id: string = ""): Promise<IUser | boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await (<any>UserModel.findOne({
					where: { id, isActive: true },
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
				reject(err);
			}
		});
	}
}
