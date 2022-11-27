import { RequestHandler } from 'express'
import { Message } from '../models/message'
import { Song } from '../models/song'
import { User } from '../models/user'
import { verifyUser } from '../services/auth'

export const createSong: RequestHandler = async (req, res, next) => {
 let newSong: Song = req.body
 // newSong.userId = user.userId

 if (newSong.title && newSong.artist) {
   let created = await Song.create(newSong)
   res.status(201).json(created)
 } else {
   res.status(400).send()
 }
}
