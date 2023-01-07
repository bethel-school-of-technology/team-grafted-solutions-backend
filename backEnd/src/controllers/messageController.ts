import { RequestHandler } from 'express'
import { Message } from '../models/message'
import { User } from '../models/user'
import { verifyUser } from '../services/auth'

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

  let newMessage: Message = req.body

  if (newMessage.userId && newMessage.message && newMessage.display_name) {
    let created = await Message.create(newMessage)
    res.status(201).json(created)
  } else {
    res.status(400).send('Please include userId, message, and display_name')
  }
}

export const editMessage: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send();
  }

  let messageId = req.params.messageId;
  let username = user.username;
  console.log(req.body);

  let updatedMessage: Message = req.body;
  let messageFound = await Message.findByPk(messageId);

  if (messageFound && messageFound.messageId == updatedMessage.messageId && messageFound.username == username) {
    await Message.update(updatedMessage, {
      where: { 
        messageId: messageId,
        username: username
      }
    });
    res.status(200).json();
  }
  else {
    res.status(400).json();
  }
}

export const deleteMessage: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send();
  }

  let messageId = req.params.messageId;
  let username = user.username;
  console.log(req.body);

  let messageFound = await Message.findByPk(messageId);

  if (messageFound && messageFound.username == username) {
    await Message.destroy({
      where: {
        messageId: messageId,
        username: username
      }
    });
    res.status(200).json();
  }
  else {
    res.status(404).json();
  }
}