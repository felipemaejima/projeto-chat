import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class Role extends Model {}

Role.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		roleDescription: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize: dbInstance,
		modelName: "Role",
		tableName: "roles",
	}
);

export default Role;
