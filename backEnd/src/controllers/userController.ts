import { RequestHandler } from 'express'
import { User } from '../models/user'
import {
  comparePasswords,
  hashPassword,
  signUserToken,
  verifyUser,
} from '../services/auth'

export const createUser: RequestHandler = async (req, res, next) => {
  let newUser: User = req.body
  if (newUser.userId && newUser.email && newUser.display_name) {
    try {
      let created = await User.create(newUser)
      res.status(201).json({
        username: created.userId,
        email: created.email,
        display_name: created.display_name
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(400).send('UserId, email, and display_name required')
  }
}

export const getAllUsers: RequestHandler = async (req, res, next) => {
  let allUsers: User[] = await User.findAll()
  res.status(200).json(allUsers)
}
