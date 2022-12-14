import { RequestHandler } from 'express'
import { Song } from '../models/song'

export const createSong: RequestHandler = async (req, res, next) => {
  let newSong: Song = req.body

  if (newSong.title && newSong.artist) {
    let created = await Song.create(newSong)
    res.status(201).json(created)
  } else {
    res.status(400).send()
  }
}

export const currentUserSongs: RequestHandler = async (req, res, next) => {
  let username = req.params.username

  let songs = await Song.findAll({
    where: { username: username },
  }).then((response) => {
    res.status(200).json(response)
  })
}
