import BlacklistModel from "../models/blacklist.model";

export default class BlackList {
	public static async add(token: string): Promise<boolean> {
		try {
			await BlacklistModel.create({ token });
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	public static async check(token: string): Promise<boolean> {
		try {
			const blacklist = await BlacklistModel.findOne({
				where: { token },
			});
			return !!blacklist;
		} catch (err) {
			console.error(err);
			return false;
		}
	}
}
