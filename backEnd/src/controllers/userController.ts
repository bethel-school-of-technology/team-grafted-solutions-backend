import { RequestHandler } from 'express'
import { User } from '../models/user'
import {
  comparePasswords,
  hashPassword,
  signUserToken,
  verifyUser,
} from '../services/auth'
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: '69372f48d4b24c099e581c69793c1879',
})

export const currentUser: RequestHandler = async (req, res, next) => {
  let token = req.body.token

  spotifyApi.setAccessToken(token)

  spotifyApi.getMe().then(
    async function (data: any) {

      let image;

      if(data.body.images[0]) {
        image = data.body.images[0].url
      } else {
        console.log('image not found')
      }

      let newUser: any = {
        userId: data.body.id,
        email: data.body.email,
        display_name: data.body.display_name,
        profilePic: image
      }

      if (newUser.userId && newUser.email && newUser.display_name) {
        try {
          let created = await User.create(newUser)
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(`userId, email, and display_name required`)
      }

      res.status(200).json(data.body)
    },
    function (err: any) {
      console.log('Something went wrong!', err)
    }
  )
}

export const getAllUsers: RequestHandler = async (req, res, next) => {
  let allUsers: User[] = await User.findAll()
  res.status(200).json(allUsers)
}
