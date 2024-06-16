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

export default BlacklistModel;
