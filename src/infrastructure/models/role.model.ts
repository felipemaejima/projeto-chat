import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class RoleModel extends Model {}

RoleModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		sequelize: dbInstance,
		modelName: "RoleModel",
		tableName: "roles",
	}
);

RoleModel.sync({ alter: true });
export default RoleModel;
