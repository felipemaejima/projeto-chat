import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";
import User from "./user.model";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class Message extends Model {}

Message.init(
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
		modelName: "Message",
		tableName: "messages",
	}
);

Message.belongsTo(User, { as: "sender", foreignKey: "id" });
Message.belongsTo(User, { as: "receiver", foreignKey: "id" });

export default Message;
