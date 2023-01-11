import { Request, RequestHandler } from 'express';
import { User } from '../models/user';
const SpotifyWebApi = require('spotify-web-api-node')


const spotifyApi = new SpotifyWebApi({
    clientId: '69372f48d4b24c099e581c69793c1879',
})

export const verifyUser: RequestHandler = async (req: Request) => {
    let token = req.headers.authorization?.split(' ')[1];
    // console.log(token); // working
  
    spotifyApi.setAccessToken(token)

    return await spotifyApi.getMe().then(
      async function (data: any) {

        if(token) {
          try {
            let currentUserId = data.body.id;
            // console.log(currentUserId, 'id'); // working

            // console.log(await User.findByPk(currentUserId), 'findbypk'); // working
            return await User.findByPk(currentUserId);
          }
          catch (err) {
            console.log(err);
            return null;
          }
        } else {
          console.log('user not found')
          return null;
        }
      }
    )
}
