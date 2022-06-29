export interface UserReqEntity {
    name: string;
    email: string;
    password: string;
}

export interface SimpleUserEntity extends UserReqEntity {
    userId: string;

}

export interface UserEntity extends SimpleUserEntity {
    userId: string;
    cratedAt: Date;
}
