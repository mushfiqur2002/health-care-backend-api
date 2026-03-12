import express, { Application } from "express";
import { IndexRouter } from "./app/route";
import { notFound } from "./app/middleware/notFound";
import { globalError } from "./app/middleware/globalError";

const app: Application = express()
app.use(express.json())

app.use('/api/vi', IndexRouter)

app.get('/', (req, res) => {
    res.send('hello app').status(201)
})

app.use(notFound)
app.use(globalError)


export default app
