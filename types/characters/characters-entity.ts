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