import {Router} from "express";
import {CharactersRecord} from "../records/characters.record";

export const CharactersRouter = Router()
    .get('/', (req, res) => {
        res.json('Witamy w characters')
    })

    .get('/:userId', async (req, res) => {
        const characters = await CharactersRecord.getAllCharacters(req.params.userId);
        res.json(characters);
    })

    .post('/', async (req,res)=>{
        const newCharacter = new CharactersRecord(req.body)
        await newCharacter.addCharacter()
        res.json('ok')
    })