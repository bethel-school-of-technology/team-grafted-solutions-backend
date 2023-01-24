// checkout how the login worked with automatically storing a user
// do the same/similar thing with storing the music page info when a comment is placed on that page

// edit the postController to account for the pageId
// this needs to take in the pageId when the post is created
// this needs to take in the pageId when the post is edited and deleted

import { RequestHandler } from "express";
import { MusicPage } from "../models/musicPage";
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
    clientId: '69372f48d4b24c099e581c69793c1879',
})

export const createMusicPage: RequestHandler = async (req, res, next) => {
    let newPage: MusicPage = req.body;
    
    spotifyApi.getTrack().then(
        async function (data: any) {
            console.log(data.body);
            let trackId = data.body.id;
            return newPage.trackId = trackId;
        }
    )

    spotifyApi.getArtist().then(
        async function (data: any) {
            console.log(data.body);
            let artistId = data.body.id;
            return newPage.artistId = artistId;
        }
    )

    if (newPage.artistId || newPage.trackId) {
        let created = await MusicPage.create(newPage)
        res.status(201).json(created)
      } else {
        res.status(400).send()
      }
}