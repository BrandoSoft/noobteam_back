export interface UserReqEntity {
    name: string;
    email: string;
}

export interface SimpleUserEntity extends UserReqEntity {
    password: string;
}

export interface UserEntity extends SimpleUserEntity {
    userId: string;
    cratedAt: Date;
}
