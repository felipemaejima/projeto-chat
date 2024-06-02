export interface IUser {
	id?: string;
	userName: string;
	email: string;
	password: string;
	roleId?: number;
}

export interface IResponse {
	error: boolean;
	message:
		| {
				[key: string]: string;
		  }
		| string;
	token?: string;
	redirect?: boolean;
	url?: string;
}
