import { Sequelize } from "sequelize";
import { AssociateUserMessage, MessageFactory } from "./message";
import { AssociateUserSong, SongFactory } from "./song";
import { UserFactory } from "./user";

const dbName = 'socialvibez';
const username = 'sqluser';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

MessageFactory(sequelize);
UserFactory(sequelize);
SongFactory(sequelize);
AssociateUserMessage();
AssociateUserSong();

export const db = sequelize;