import express, { Application, Request, Response } from 'express'
import mongoose, { Connection } from 'mongoose'
import './lib/env'

mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db: Connection = mongoose.connection
db.on('error', () => {

})

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.listen(5000, () => {
    console.log("Server listening in port 5000")
})
