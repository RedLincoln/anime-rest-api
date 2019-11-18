import express, { Router, Response, Request } from 'express'
import { Episode, EpisodeProp } from '../models/episode'

const router: Router = express.Router()

router.get('/:anime', (req: Request, res: Response) => {
    res.json('test')
})

export { router as EpisodeRouter }