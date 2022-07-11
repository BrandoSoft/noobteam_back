export interface MatchList{
    list:string[];
}
export interface MatchScore{
    name: string,
    kills: number,
    deaths: number,
    assists: number
}


export interface MatchesEntity{
    puuid: string
    list: string[]
}