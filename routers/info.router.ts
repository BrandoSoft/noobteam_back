import {Router} from "express";

export const InfoRouter = Router()
    .get('/version', (req, res) => {
        res.json( process.env.VERSION)
    })

.get('/getapikey', (req, res) => {
    res.json( process.env.API_KEY)
})
