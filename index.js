import {findPossiblePasswords, calcAddress} from './functions.js'
import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
    res.send("Server Online.")
})

app.get('/calcAddress', (req, res) => {
    res.send(calcAddress(req.query.commands))
})

app.get('/possiblePasswords', (req, res) => {
    res.send(findPossiblePasswords({exactlyOneGroup: parseInt(req.query.exactlyOneGroup)}))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})