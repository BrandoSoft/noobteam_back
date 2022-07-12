export interface SimpleCharactersEntity extends SimpleRiotCharacterEntity{
    name: string;
    puuid: string;
    profileIconId: number,
    summonerLevel: number,
    id: string
}

export interface CharactersEntity extends RiotCharacterEntity{
    userId: string;
}

export interface NewCharactersEntity extends Omit<CharactersEntity, 'id'>{
    id?: string;
}
export interface SimpleRiotCharacterEntity {
    name: string,
    profileIconId: number,
    summonerLevel: number,
}
export interface RiotCharacterEntity extends SimpleRiotCharacterEntity{
    id: string,
    accountId: number,
    puuid:string,
    revisionDate: number,
}

export interface LeaguesEntity {
    leagueId: 	string,
    summonerId: 	string,
    summonerName: 	string,
    queueType: 	string,
    tier:	string,
    rank: 	string ,
    leaguePoints: number,
    wins:number,
    losses:number,
    hotStreak:boolean
    veteran:boolean
    freshBlood:boolean
    inactive:boolean
    miniSeries: {
        losses: number,
        progress: string,
        target: number,
        wins: number,
    }
}