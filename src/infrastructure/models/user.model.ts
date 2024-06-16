import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";
import RoleModel from "./role.model";

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
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
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

UserModel.belongsTo(RoleModel, { 
	foreignKey: {
		name: 'roleId',
		allowNull: false
	  }
 });

UserModel.sync({ alter: true });
export default UserModel;
