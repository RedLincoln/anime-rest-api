import express, { Router, Response, Request } from 'express'
import { Episode, EpisodeProp } from '../models/episode'
import { CustomRequest, getAnime } from './partials'

const router: Router = express.Router()

router.get('/:name', getAnime, async (req: CustomRequest, res: Response) => {
    try {
        const episodes: EpisodeProp[] = await Episode.find({
            anime: req.anime,
        })
        if (episodes) {
            res.json(episodes)
        } else {
            res.status(404).json(`No episodes found for ${req.params.name}`)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:name/:number', getAnime, async (req: CustomRequest, res: Response) => {
    try {
        const episode: EpisodeProp | null = await Episode.findOne({
            anime: req.anime?._id,
            number: parseFloat(req.params.number)
        })
        if (episode) {
            res.json(episode)
        } else {
            res.status(404).json(`Episode ${req.params.number} of anime ${req.params.name} not found`)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export { router as EpisodeRouter }