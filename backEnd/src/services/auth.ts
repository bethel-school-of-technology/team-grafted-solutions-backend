import bcrypt from 'bcrypt';
import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
const SpotifyWebApi = require('spotify-web-api-node')

const secret = 'Tea, Earl Grey, Hot';

export const signUserToken = async (user: User) => {
 let token = jwt.sign(
     { userId: user.userId },
     secret,
     { expiresIn: '1hr' }
 );
 
 return token;
}

export const hashPassword = async (plainTextPassword: string) => {
 const saltRound = 12;
 const hash = await bcrypt.hash(plainTextPassword, saltRound);
 return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
 return await bcrypt.compare(plainTextPassword, hashPassword);
}

// export const verifyUser = async (req: Request) => {
//  // Get the Authorization header from the request
//  const authHeader = req.headers.authorization;

//  // If header exists, parse token from `Bearer <token>`
//  if (authHeader) {
//      const token = authHeader.split(' ')[1];

//      // Verify the token and get the user
//      try {
//          let decoded: any = await jwt.verify(token, secret);
//          return User.findByPk(decoded.userId);
//      }
//      catch (err) {
//          return null;
//      }
//  }
//  else {
//      return null;
//  }
// }

// GET request from https://api.spotify.com/v1/me with the bearer token as auth header
// match the data that comes back with the user's "id":
// if they match, then the user is verified

// const url = "https://api.spotify.com/v1/me";
// var token = "";
// 
// still use User.findByPK(spotGet.userId)


const spotifyApi = new SpotifyWebApi({
    clientId: '69372f48d4b24c099e581c69793c1879',
})

export const verifyUser: RequestHandler = async (req: Request) => {
    let token = req.headers.authorization?.split(' ')[1];
    // console.log(token); // working
  
    spotifyApi.setAccessToken(token)
  
    spotifyApi.getMe().then(
      async function (data: any) {
        
        if(data.body.id) {
            let currentUserId = data.body.id;
            // console.log(currentUserId); // working
          
            try {
                // console.log(User.findByPk(currentUserId)); // working
                let match: any = await User.findByPk(currentUserId);
                console.log(match);
                return match;
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