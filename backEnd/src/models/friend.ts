import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Friend extends Model<InferAttributes<Friend>, InferCreationAttributes<Friend>>{
    declare friendId: number;
    declare username: string;
    declare display_name: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function FriendFactory(sequelize: Sequelize) {
 Friend.init({
     friendId: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
     },
     username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     display_name: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
     },
     updatedAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
     }
 }, {
     tableName: 'friends',
     freezeTableName: true,
     sequelize
 });
}

export function AssociateUserFriend() {
 User.hasMany(Friend, { foreignKey: 'username' });
 Friend.belongsTo(User, { foreignKey: 'username' });
}
