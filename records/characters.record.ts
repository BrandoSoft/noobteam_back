import {
    CharactersEntity,
    NewCharactersEntity, RiotCharacterEntity,
    SimpleCharactersEntity,
    SimpleRiotCharacterEntity
} from "../types";
import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
import axios from "axios";


type CharactersRecordResults = [CharactersEntity[], FieldPacket[]];

export class CharactersRecord implements CharactersEntity {
    public name: string;
    public userId: string;
    public puuid: string;

    constructor(obj: NewCharactersEntity) {
        this.puuid = obj.puuid;
        this.userId = obj.userId;
        this.name = obj.name;
    }

    static async getAllCharacters(userId: string): Promise<SimpleCharactersEntity[]> {
        const [results] = await pool.execute("SELECT `name`,`puuid` FROM `characters` WHERE `userId`= :userId", {
            userId
        }) as CharactersRecordResults;

        return results.map(result => {
            const {name, puuid} = result;

            return {
                name, puuid
            }
        })
    }

    async addCharacter(): Promise<void> {
        //@TODO add validation

        await pool.execute("INSERT INTO `characters`(`userId`, `name`, `puuid`) VALUES (:userId, :name, :puuid)", this)
    }

    static async findCharacter(characterName: string): Promise<RiotCharacterEntity | null> {

        try {
            const resp = await axios({
                method: 'get',
                url: `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${characterName}`,
                headers: {
                    'X-Riot-Token': process.env.API_KEY
                }
            })
            return resp.data
        }catch (e){
           console.log(e)
        }

        return null
    }
}