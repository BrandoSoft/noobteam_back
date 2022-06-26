import {Router} from "express";

export const UserRouter = Router()
    .get('/', (req, res) =>
    {
        res.json('Witamy w panelu użytkownika')
    })

    .post('/register', async (req, res) =>{

    })

    .post('/login', async (req, res) =>{

    })