
import { Request, Response, NextFunction } from 'express'
import { Anime, AnimeProps, AnimeDoc } from '../models/anime'

export interface CustomRequest extends Request {
    anime?: AnimeProps
}

export async function getAnime(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const anime: AnimeProps | null = await Anime.findOne({
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
