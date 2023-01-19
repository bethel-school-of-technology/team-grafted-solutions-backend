import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import moment from 'moment';
import { Friend } from "./friend";

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>{
    declare messageId: number;
    declare userId: string;
    declare friendId: string;
    declare display_name: string;
    declare message: string;
    declare createdAt?: moment.Moment;
    // declare updatedAt?: moment.Moment;
}

export function MessageFactory(sequelize: Sequelize) {
    Message.init({
        messageId: {
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
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('M/D/YYYY, h:mm:ss a')
        }
        // updatedAt: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     defaultValue: moment().format('M/D/YYYY, h:mm:ss a')
        // }
    }, {
        freezeTableName: true,
        tableName: 'messages',
        sequelize
    });
}

export function AssociateFriendMessages() {
    Friend.hasMany(Message, { foreignKey: 'userId' });
    Friend.hasMany(Message, { foreignKey: 'friendId' });
    Message.belongsTo(Friend, { foreignKey: 'userId' });
    Message.belongsTo(Friend, { foreignKey: 'friendId' });
}
