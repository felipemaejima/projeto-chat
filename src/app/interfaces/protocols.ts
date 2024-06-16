interface IGeneralResponseMessage {
	[key: string]: string;
}

// #region exported interfaces

/*
*
* Entities interfaces
* 
*/

export interface IUser {
	id?: string;
	userName: string;
	email: string;
	password: string;
	roleId?: number;
	isActive?: boolean;
}
export interface IRole { 
	id?: number;
	name: string;
	isActive?: boolean;
}

export interface IMessage {
	id?: string;
	senderId: string;
	receiverId: string;
	message: string;
	isActive?: boolean;
}

/*
*
* Http interfaces
* 
*/

export interface IHttpResponse {
	error: boolean;
	message: IGeneralResponseMessage | string;
	token?: string;
	redirect?: boolean;
	url?: string;
}
