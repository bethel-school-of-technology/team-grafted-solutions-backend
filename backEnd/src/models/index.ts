import { Sequelize } from "sequelize";
import { AssociateMusicPagePosts, AssociateUserPost, PostFactory } from "./post";
import { AssociateUserSong, SongFactory } from "./song";
import { AssociateUserFriend, FriendFactory } from "./friend";
import { UserFactory } from "./user";
import { AssociateUserMessages, MessageFactory } from "./message";
import { MusicPageFactory } from "./musicPage";

const dbName = 'socialvibez';
const username = ''; // your username
const password = ''; // your password

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

PostFactory(sequelize);
MusicPageFactory(sequelize);
UserFactory(sequelize);
SongFactory(sequelize);
FriendFactory(sequelize);
MessageFactory(sequelize);
AssociateUserPost();
AssociateMusicPagePosts();
AssociateUserSong();
AssociateUserFriend();
AssociateUserMessages();

export const db = sequelize;
