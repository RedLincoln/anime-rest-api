import express, { Application, Request, Response, Router } from 'express'
import mongoose, { Connection } from 'mongoose'
import bodyParser from 'body-parser'
import './lib/env'
import { AnimeRouter } from './routes/anime'
import { EpisodeRouter } from './routes/episode'

const app: Application = express()
app.use(bodyParser.json())
app.use('/anime', AnimeRouter)
app.use('/episode', EpisodeRouter)

mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)

const db: Connection = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('connected', () => console.log('Connected to mongoose'))


app.listen(5000, () => {
    console.log("Server listening in port 5000")
})
