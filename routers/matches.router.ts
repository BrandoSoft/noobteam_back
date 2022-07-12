import {Router} from "express";
import {MatchesRecord} from "../records/matches.record";

const authToken = require("../middleware/authenticateToken");

export const MatchesRouter = Router()
    .get('/', (req, res) => {
        res.json('Witamy w Meczach')
    })

    .get('/playermatches/:puuid', authToken, async (req, res) => {
        const matches = await MatchesRecord.getMatchesList(req.params.puuid)
        res.json(matches)
    })
    .get('/matchinfo/:id', authToken, async (req, res) => {
        const score = await MatchesRecord.getScore(req.params.id);
        res.json(score)
    })