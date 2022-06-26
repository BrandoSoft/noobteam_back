import {CharactersEntity, NewCharactersEntity, SimpleCharactersEntity} from "../types";
import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";


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

            return{
                name, puuid
            }
        })
    }

    async addCharacter(): Promise<void> {
        //@TODO add validation

        await pool.execute("INSERT INTO `characters`(`userId`, `name`, `puuid`) VALUES (:userId, :name, :puuid)", this)
    }
}