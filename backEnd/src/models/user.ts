import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare userId: string;
    declare email: string;
    declare display_name: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function UserFactory(sequelize: Sequelize) {
 User.init({
     userId: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         primaryKey: true
     },
     email: {
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
     tableName: 'users',
     freezeTableName: true,
     sequelize
 });
}
