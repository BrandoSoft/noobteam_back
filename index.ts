import 'dotenv/config';
import cors from "cors";
import express, {json, Request, Response, Router} from "express";
import rateLimit from "express-rate-limit";
import {handleError} from "./utils/error";
import {CharactersRouter} from "./routers/characters.router";
import {UserRouter} from "./routers/user.router";
import {MatchesRouter} from "./routers/matches.router";
import {InfoRouter} from "./routers/info.router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

app.get('/', (req:Request, res:Response) => {
    res.send('all works fine')
})

app.use('/characters', CharactersRouter);
app.use('/user', UserRouter);
app.use('/matches', MatchesRouter);
app.use('/info', InfoRouter);

app.use(handleError)



app.listen(config.server.port,  () => {
    console.log('Listening on port http://localhost:3001')
})
