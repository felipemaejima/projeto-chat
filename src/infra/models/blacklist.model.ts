import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class BlacklistModel extends Model {}

BlacklistModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		token: {
			type: DataTypes.STRING(255),
		},
	},
	{
		sequelize: dbInstance,
		modelName: "Blacklist",
		tableName: "blacklist",
	}
);

BlacklistModel.sync({ alter: true });
export default BlacklistModel;
