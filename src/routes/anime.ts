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
        res.json({ message: `${req.params.name} deleted` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:name', async (req: CustomRequest, res: Response) => {
    try {
        const anime: AnimeProps = req.body
        console.log(anime)
        const newAnime: AnimeProps | null = await Anime.findOneAndUpdate({
            name: req.params.name
        }, anime, { new: true })
        if (newAnime) {
            res.json(newAnime)
        } else {
            res.status(404).json({ message: `${req.params.name} not Found` })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export { router as AnimeRouter }
