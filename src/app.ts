import express, { Application } from "express";

const app: Application = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello app').status(201)
})


export default app
