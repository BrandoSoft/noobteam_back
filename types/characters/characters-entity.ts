export interface SimpleCharactersEntity extends SimpleRiotCharacterEntity{
    name: string;
    puuid: string;
    profileIconId: number,
    summonerLevel: number,
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