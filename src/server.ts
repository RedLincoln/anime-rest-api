import express, { Application, Request, Response, Router } from 'express'
import mongoose, { Connection } from 'mongoose'
import './lib/env'
import { animeRouter } from './routes/anime'

const app: Application = express()
app.use('/anime', animeRouter)

mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db: Connection = mongoose.connection
db.on('error', (err) => console.log(err.message))
db.once('connected', () => console.log('Connected to mongoose'))


app.listen(5000, () => {
    console.log("Server listening in port 5000")
})
