import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import moment from 'moment';
import { User } from "./user";

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>{
    declare messageId: number;
    declare userId: string;
    declare display_name: string;
    declare message: string;
    declare createdAt?: moment.Moment;
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
    }, {
        freezeTableName: true,
        tableName: 'messages',
        sequelize
    });
}

export function AssociateUserMessages() {
    User.hasMany(Message, { foreignKey: 'userId' });
    Message.belongsTo(User, { foreignKey: 'userId' });
}
