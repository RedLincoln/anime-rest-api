import express, { Router, Request, Response, NextFunction } from 'express'
import { Anime, AnimeProps } from '../models/anime'
import { Episode, EpisodeProp } from '../models/episode'

const router: Router = express.Router()
interface CustomRequest extends Request {
    anime?: AnimeProps
}

router.get('/', async (req: Request, res: Response) => {
    try {
        const animes: AnimeProps[] = await Anime.find({})
        if (animes) {
            res.json(animes)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:name', getAnime, (req: CustomRequest, res: Response) => {
    res.json(req.anime)
})

router.get('/:name/:number', getAnime, async (req: CustomRequest, res: Response) => {
    try {
        const episode = await Episode.findOne({
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

async function getAnime(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const anime = await Anime.findOne({
            name: req.params.name
        })
        if (!anime) {
            res.status(404).json({ message: `Anime ${req.params.name} not found` })
        } else {
            req.anime = anime
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    next()
}


export { router as animeRouter }
