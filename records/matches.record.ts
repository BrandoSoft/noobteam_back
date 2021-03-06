import {MatchesEntity, MatchList, MatchScore} from "../types";
import axios from "axios";

export class MatchesRecord implements MatchesEntity {
    public list: string[];
    public puuid: string;

    constructor(obj: MatchesRecord) {
        this.list = obj.list;
        this.puuid = obj.puuid;
    }

    static async getMatchesList(puuid: string): Promise<MatchList | null> {

        let list;
        try {
            const resp = await axios({
                method: 'get',
                url: `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`,
                headers: {
                    'X-Riot-Token': process.env.API_KEY
                }
            })
            list = resp.data
        } catch
            (e) {
            console.log('errorekas d as dasdasd', e)

        }
        return list

    }

    static async getScore(matchId: string): Promise<MatchScore> {


        const gameResp = await axios({
            method: 'get',
            url: `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            headers: {
                'X-Riot-Token': process.env.API_KEY
            }
        })
        return {
            name: gameResp.data.info.participants[0].championName,
            kills: gameResp.data.info.participants[0].kills,
            deaths: gameResp.data.info.participants[0].deaths,
            assists: gameResp.data.info.participants[0].assists
        }
    }
}
