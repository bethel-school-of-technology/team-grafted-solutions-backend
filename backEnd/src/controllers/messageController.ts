import { RequestHandler } from 'express'
import { Message } from '../models/message'
import { User } from '../models/user'
import { verifyUser } from '../services/auth'

export const getAllMessages: RequestHandler = async (req, res, next) => {
  let messages = await Message.findAll()
  res.status(200).json(messages)
}

export const createMessage: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send()
  }

  let newMessage: Message = req.body
  newMessage.userId = user.userId

  if (newMessage.title && newMessage.message) {
    let created = await Message.create(newMessage)
    res.status(201).json(created)
  } else {
    res.status(400).send()
  }
}
