import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";
import UserModel from "./user.model";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class MessageModel extends Model {}

MessageModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		sequelize: dbInstance,
		modelName: "MessageModel",
		tableName: "messages",
	}
);

MessageModel.belongsTo(UserModel, { as: "sender", foreignKey: {
	name: "senderId",
	allowNull: false,
}});

MessageModel.belongsTo(UserModel, { as: "receiver", foreignKey: {
	name: "receiverId",
	allowNull: false,
}});

export default MessageModel;
