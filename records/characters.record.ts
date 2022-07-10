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
    public accountId: number;
    public id: string;
    public profileIconId: number;
    public revisionDate: number;
    public summonerLevel: number;

    constructor(obj: NewCharactersEntity) {
        this.puuid = obj.puuid;
        this.userId = obj.userId;
        this.name = obj.name;
        this.accountId = obj.accountId;
        this.id = obj.id
        this.profileIconId = obj.profileIconId;
        this.revisionDate = obj.revisionDate
        this.summonerLevel = obj.summonerLevel
    }

    static async getAllCharacters(userId: string): Promise<SimpleCharactersEntity[]> {
        const [results] = await pool.execute("SELECT `name`,`puuid`,`profileIconId`, `summonerLevel` FROM `characters` WHERE `userId`= :userId", {
            userId
        }) as CharactersRecordResults;

        return results.map(result => {
            const {name, puuid, profileIconId, summonerLevel} = result;

            return {
                name, puuid, profileIconId, summonerLevel
            }
        })
    }

    static async findCharacterInDb (name: string): Promise<boolean>{
        const [result] = await pool.execute("SELECT `name` FROM  `characters` WHERE `name` = :name", {
            name
        }) as CharactersRecordResults;

        return result.length < 1;

    }

    async addCharacter(): Promise<void> {
        //@TODO add validation

        await pool.execute("INSERT INTO `characters`(`puuid`,`userId`, `name`, `accountId`, `id`, `profileIconId`, `revisionDate`, `summonerLevel`) VALUES (:puuid, :userId, :name, accountId, :id, :profileIconId, :revisionDate, :summonerLevel)", this)
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
        } catch (e) {
            console.log(e)
        }

        return null
    }

    static async deleteCharacter(name: string, userId: string): Promise<any>{
        console.log(name, userId)
        const del = await pool.execute("DELETE FROM `characters` WHERE  `name`= :name AND `userId`= :userId",
            {name, userId})
        console.log(del)
        return del
    }

}