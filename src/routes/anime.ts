import express, { Router, Request, Response, NextFunction } from 'express'
import { Anime, AnimeDoc, AnimeProps } from '../models/anime'
import { Episode } from '../models/episode'
import { CustomRequest, getAnime } from './partials'

const router: Router = express.Router()

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


router.post('/', async (req: Request, res: Response) => {
    try {
        const anime: AnimeDoc = new Anime(req.body)
        const response = await anime.save()
        res.json(response)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:name', getAnime, async (req: CustomRequest, res: Response) => {
    try {
        await Anime.deleteOne({ name: req.params.name })
        await Episode.deleteMany({ anime: req.anime?._id })
        res.json(`${req.params.name} deleted`)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export { router as AnimeRouter }
