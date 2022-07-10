export interface SimpleCharactersEntity{
    name: string;
    puuid: string;
}

export interface CharactersEntity extends SimpleCharactersEntity{
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