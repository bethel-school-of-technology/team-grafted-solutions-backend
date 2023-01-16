import { Sequelize } from "sequelize";
import { AssociateUserPost, PostFactory } from "./post";
import { AssociateUserSong, SongFactory } from "./song";
import { AssociateUserFriend, FriendFactory } from "./friend";
import { UserFactory } from "./user";
import { AssociateFriendMessages, MessageFactory } from "./messages";

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
MessageFactory(sequelize);
AssociateUserPost();
AssociateUserSong();
AssociateUserFriend();
AssociateFriendMessages();

export const db = sequelize;
