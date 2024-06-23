import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../database/DatabaseConnection";
import UserModel from "./user.model";

const db = new DatabaseConnection();
const dbInstance = db.getInstance;

class FriendshipModel extends Model {}

FriendshipModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: dbInstance,
    modelName: "FriendshipModel",
    tableName: "friendships",
  }
);

FriendshipModel.belongsTo(UserModel, { as: "follower", foreignKey: {
	name: "followerId",
	allowNull: false,
} });

FriendshipModel.belongsTo(UserModel, { as: "followed", foreignKey: {
	name: "followedId",
	allowNull: false,
}});

FriendshipModel.sync({ alter: true });
export default FriendshipModel;