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
    let artistId = req.params.id; // needs to be specified as artist id
    newPage.artistId = artistId;
    let trackId = req.params.id; // needs to be specified as track id
    newPage.trackId = trackId;

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
        } else {
            // return pageId that matches existingArtistPage || existingTrackPage
        }
    } else {
        res.status(400).send('cannot find artistId nor trackId')
    }
}
