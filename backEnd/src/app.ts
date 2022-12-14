require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const lyricsFinder = require('lyrics-finder')
const SpotifyWebApi = require('spotify-web-api-node')
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import { db } from './models'
import messageRoutes from './routes/messageRoutes'
import songRoutes from './routes/songRoutes'
import userRoutes from './routes/userRoutes'
import friendRoutes from './routes/friendRoutes'

const app = express()
app.use(cors())

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8100/socialvibez/music',
    clientId: '69372f48d4b24c099e581c69793c1879',
    clientSecret: '3fd83b37a78044e597517228a2cb6796',
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then((data: any) => {
      console.log(data.body)
    })
    .catch((err: any) => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8100/socialvibez/music',
    clientId: '69372f48d4b24c099e581c69793c1879',
    clientSecret: '3fd83b37a78044e597517228a2cb6796',
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data: any) => {
      res.json(data.body.access_token)
    })
    .catch((err: any) => {
      console.log(err)
      res.sendStatus(400)
    })
})

// app.post('/login', (req, res) => {
//   const code = req.body.code
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//   })

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data: any) => {
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       })
//     })
//     .catch((err: any) => {
//       console.log(err)
//       res.sendStatus(400)
//     })
// })

app.get('/lyrics', async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || 'No Lyrics Found'
  res.json({ lyrics })
})

app.use('/messages', messageRoutes)
app.use('/users', userRoutes)
app.use('/songs', songRoutes)
app.use('/friends', friendRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end()
})

// Syncing our database
db.sync({ alter: true }).then(() => {
  console.info('connected to the database!')
})

app.listen(3001)
