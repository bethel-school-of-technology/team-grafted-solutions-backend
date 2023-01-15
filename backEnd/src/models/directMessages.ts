import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import moment from 'moment';
import { Friend } from "./friend";

export class DirectMessage extends Model<InferAttributes<DirectMessage>, InferCreationAttributes<DirectMessage>>{
    declare directMessageId: number;
    declare userId: string;
    declare friendId: string;
    declare display_name: string;
    declare directMessage: string;
    declare createdAt?: moment.Moment;
    declare updatedAt?: moment.Moment;
}

export function DirectMessageFactory(sequelize: Sequelize) {
    DirectMessage.init({
        directMessageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        friendId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        directMessage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('M/D/YYYY, h:mm:ss a'),
            // defaultValue: DataTypes.NOW,
            
        },
        updatedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('M/D/YYYY, h:mm:ss a'),
            // defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'directMessages',
        sequelize
    });
}

export function AssociateFriendDM() {
    Friend.hasMany(DirectMessage, { foreignKey: 'userId' });
    Friend.hasMany(DirectMessage, { foreignKey: 'friendId' });
    DirectMessage.belongsTo(Friend, { foreignKey: 'userId' });
    DirectMessage.belongsTo(Friend, { foreignKey: 'friendId' });
}
