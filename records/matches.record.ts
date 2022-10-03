import {MatchesEntity, MatchList, MatchScore} from "../types";
import axios from "axios";

export class MatchesRecord implements MatchesEntity {
    public list: string[];
    public puuid: string;

    constructor(obj: MatchesRecord) {
        this.list = obj.list;
        this.puuid = obj.puuid;
    }

    static async getMatchesList(puuid: string, counter: number): Promise<MatchList | null | string> {

        let list;
        try {
            const resp = await axios({
                method: 'get',
                url: `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${counter}`,
                headers: {
                    'X-Riot-Token': process.env.API_KEY
                }
            })
            console.log(puuid, 'odsylam : ', resp.data)
            list = resp.data
        } catch
            (e) {
            console.log(`error w getMatchesList`, e.response.status)
            return 'error 429 w getmatches list'
        }
        return list

    }

    static async getScore(matchId: string): Promise<MatchScore | string> {

        try {
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
                assists: gameResp.data.info.participants[0].assists,
                lane: gameResp.data.info.participants[0].lane,
                role: gameResp.data.info.participants[0].role,
                win: gameResp.data.info.participants[0].win,
            }

        } catch (e) {
            console.log(e.response.headers)
            return "Too many request, APIKEY cant handle so much"
        }
    }
}
