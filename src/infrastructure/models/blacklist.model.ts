import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class BlacklistModel extends Model {}

BlacklistModel.init(
	{
		token: {
			type: DataTypes.STRING(255),
			primaryKey: true,
		},
	},
	{
		sequelize: dbInstance,
		modelName: "Blacklist",
		tableName: "blacklist",
	}
);

export default BlacklistModel;
