import { RequestHandler } from 'express'
import { Message } from '../models/message'
import { User } from '../models/user'
import { verifyUser } from '../services/auth'
// const SpotifyWebApi = require('spotify-web-api-node')

// const spotifyApi = new SpotifyWebApi({
//   clientId: '69372f48d4b24c099e581c69793c1879',
// })

export const getAllMessages: RequestHandler = async (req, res, next) => {
  let messages = await Message.findAll()
  res.status(200).json(messages)
}

export const getOneMessage: RequestHandler =async (req, res, next) => {
  let messageId = req.params.messageId;
  let message = await Message.findByPk(messageId);
  res.status(200).json(message);
}

export const createMessage: RequestHandler = async (req, res, next) => {

  let user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send('User not detected.')
  }

  let newMessage: Message = req.body;
  newMessage.userId = user.userId;
  newMessage.display_name = user.display_name;

  if (newMessage.userId && newMessage.display_name && newMessage.title && newMessage.message) {
    let created = await Message.create(newMessage);
    res.status(201).json(created);
  } else {
    res.status(400).send('Please include userId, display_name, title, and message')
  }
}

export const editMessage: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send('User not detected');
  }

  let messageId = req.params.messageId;
  let userId = user.userId;
  console.log(req.body);

  let updatedMessage: Message = req.body;
  let messageFound = await Message.findByPk(messageId);

  if (messageFound && messageFound.messageId == updatedMessage.messageId && messageFound.userId == userId) {
    await Message.update(updatedMessage, {
      where: { 
        messageId: messageId,
        userId: userId
      }
    });
    res.status(200).json('Updated message is a success!');
  }
  else {
    res.status(400).json('An error occured while updating this message');
  }
}

export const deleteMessage: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send('User not detected');
  }

  let messageId = req.params.messageId;
  let userId = user.userId;
  console.log(req.body);

  let messageFound = await Message.findByPk(messageId);

  if (messageFound && messageFound.userId == userId) {
    await Message.destroy({
      where: {
        messageId: messageId,
        userId: userId
      }
    });
    res.status(200).json('Message deleted!');
  }
  else {
    res.status(404).json('An error occured while deleting this message');
  }
}



// const verifyUser: RequestHandler = async (req, res, next) => {
//   let token = req.body.token

//   spotifyApi.setAccessToken(token)

//   spotifyApi.getMe().then(
//     async function (data: any) {
//       let currentUserId;
      
//       if(data.body.id) {
//         currentUserId = data.body.id;
//       } else {
//         console.log('user not found')
//       }
//     }
//   )
// }



// current user gives me the data from the current user.
// match the currentUserId to the message's userId