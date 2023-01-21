import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import moment from 'moment';

export class MusicPage extends Model<InferAttributes<MusicPage>, InferCreationAttributes<MusicPage>>{
    declare pageId: number;
    declare artistId: number;
    declare createdAt?: moment.Moment;
    declare updatedAt?: moment.Moment;
}

export function MusicPageFactory(sequelize: Sequelize) {
    MusicPage.init({
        pageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('M/D/YYYY, h:mm:ss a')
        },
        updatedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('M/D/YYYY, h:mm:ss a')
        }
    }, {
        freezeTableName: true,
        tableName: 'musicPage',
        sequelize
    });
}

export function AssociateMusicPagePosts() {
    // User.hasMany(Post, { foreignKey: 'userId' });
    // Post.belongsTo(User, { foreignKey: 'userId' });
}
