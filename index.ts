import cors from "cors";
import 'dotenv/config'
import express, {json} from "express";
import rateLimit from "express-rate-limit";
import {handleError} from "./utils/error";
import {CharactersRouter} from "./routers/characters.router";
import { UserRouter } from "./routers/user.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

app.use('/characters', CharactersRouter)
app.use('/user', UserRouter)

app.use(handleError)


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})
