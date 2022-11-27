import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import moment from 'moment';

export class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>>{
    declare songId: number;
    declare userId: number;
    declare title: string;
    declare artist: string;
    declare albumUrl: string;
    declare createdAt?: moment.Moment;
    declare updatedAt?: moment.Moment;
}

export function SongFactory(sequelize: Sequelize) {
    Song.init({
        songId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        albumUrl: {
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
        tableName: 'songs',
        sequelize
    });
}

export function AssociateUserSong() {
    User.hasMany(Song, { foreignKey: 'userId' });
    Song.belongsTo(User, { foreignKey: 'userId' });
}

