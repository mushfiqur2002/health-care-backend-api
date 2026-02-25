import express, { Application } from "express";
import { IndexRouter } from "./route";

const app: Application = express()
app.use(express.json())

app.use('/api/vi', IndexRouter)

app.get('/', (req, res) => {
    res.send('hello app').status(201)
})


export default app
