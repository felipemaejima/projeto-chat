import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";
import User from "./user.model";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class Friendship extends Model {}

Friendship.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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

Friendship.belongsTo(User, { as: "follower", foreignKey: "id" });
Friendship.belongsTo(User, { as: "followed", foreignKey: "id" });

export default Friendship;
