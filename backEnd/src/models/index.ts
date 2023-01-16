import { Sequelize } from "sequelize";
import { AssociateUserMessage, PostFactory } from "./post";
import { AssociateUserSong, SongFactory } from "./song";
import { AssociateUserFriend, FriendFactory } from "./friend";
import { UserFactory } from "./user";

const dbName = 'socialvibez';
const username = ''; // your username
const password = ''; // your password

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

PostFactory(sequelize);
UserFactory(sequelize);
SongFactory(sequelize);
FriendFactory(sequelize);
AssociateUserMessage();
AssociateUserSong();
AssociateUserFriend();

export const db = sequelize;
