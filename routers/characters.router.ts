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
    .get('/leagues/:userId', authToken, async (req, res) => {
        const leagues = await CharactersRecord.getLeagues(req.params.userId);
        res.json(leagues);
    })

    .get('/find/:name', authToken, async (req, res) => {
        const character = await CharactersRecord.findCharacter(req.params.name)

        if (character) {
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

    .get('/random/player', authToken, async (req, res) => {
        const random = await CharactersRecord.findRandomCharacter();

        const randomPlayer = await CharactersRecord.findCharacter(random.summonerName)

        if (randomPlayer) {
            return res.json(randomPlayer)
        }
        return res.status(400).json({
            errors: [
                {
                    msg: 'No character found (coś poszło nie tak)',
                },
            ],
        });
    })

    .get('/game/:id', authToken, async (req, res) => {

        console.log(req.params.id)

        const game = await CharactersRecord.findMatch(req.params.id)

        if (game) {
            return res.json(game)
        }
        return res.status(400).json({
            errors: [
                {
                    msg: 'No match found',
                },
            ],
        });
    })

    .post('/', authToken, async (req, res) => {
        console.log(req.body)
        const isCharViable = await CharactersRecord.findCharacterInDb(req.body.name, req.body.userId)

        if (isCharViable) {
            const newCharacter = new CharactersRecord(req.body)
            await newCharacter.addCharacter()
            return res.status(200).json('mozna')
        }
        if (!isCharViable) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Postać jest już na Twojej liście."
                    }
                ]
            })
        }

    })


    .delete('/', authToken, async (req, res) => {
        const {name, userId} = req.body
        await CharactersRecord.deleteCharacter(name, userId);

        res.json('chyba się udało')

        //@TODO Add Validation
    })
