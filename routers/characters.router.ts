import {Router} from "express";
import {CharactersRecord} from "../records/characters.record";

const authToken = require("../middleware/authenticateToken");

export const CharactersRouter = Router()
    .get('/', (req, res) => {
        res.json('Witamy w characters')
    })

    .get('/:userId', authToken, async (req, res) => {
        const characters = await CharactersRecord.getAllCharacters(req.params.userId);
        res.json(characters);
    })

    .get('/find/:name', authToken, async (req, res) => {
       const character = await CharactersRecord.findCharacter(req.params.name)

        if(character){
            return res.json(character)
        }
        return res.status(400).json({
            errors: [
                {
                    msg: 'No character found',
                },
            ],
        });
    })

    .post('/', async (req, res) => {
        const newCharacter = new CharactersRecord(req.body)
        await newCharacter.addCharacter()
        res.json('ok')
    })