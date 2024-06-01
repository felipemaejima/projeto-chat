import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";
import Role from "./role.model";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class UserModel extends Model {}

UserModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		password: {
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
		modelName: "UserModel",
		tableName: "users",
	}
);

UserModel.belongsTo(Role, { foreignKey: "roleId" });

export default UserModel;
