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

export const getMusicPage: RequestHandler = async (req, res, next) => {
    let pageId = req.params.pageId;
    let page = await MusicPage.findByPk(pageId);
    res.status(200).json(page);
}

export const createMusicPage: RequestHandler = async (req, res, next) => {
    let newPage: MusicPage = req.body;
    
    // spotifyApi.getTrack().then(
    //     async function (data: any) {
    //         console.log(data.body);
    //         let trackId = data.body.id;
    //         return newPage.trackId = trackId;
    //     }
    // )

    // spotifyApi.getArtist().then(
    //     async function (data: any) {
    //         console.log(data.body);
    //         let artistId = data.body.id;
    //         return newPage.artistId = artistId;
    //     }
    // )
    // if artistId = data.body.id // newPage.artistId = artistId
    // if trackId = data.body.id // newPage.trackId = trackId

    // if musicPage with artistId or trackId does not exist, then continue this function
    if (newPage.artistId || newPage.trackId) {
        const existingArtistPage = await MusicPage.findOne({ where: { artistId: newPage.artistId } });
        const existingTrackPage = await MusicPage.findOne({ where: { trackId: newPage.trackId } });
        if(!existingArtistPage || !existingTrackPage) {
            try {
                let created = await MusicPage.create(newPage)
                res.status(201).json(created)
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        res.status(400).send('page not created')
    }
}

// search for page with artist or track id and if neither exists, then it is created
