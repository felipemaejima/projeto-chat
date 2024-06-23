import { IRole } from "../../app/interfaces/protocols";

export default class Role {
	public static add(role: IRole): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				
				resolve(true);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}
}
