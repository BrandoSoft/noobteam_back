import {SimpleUserEntity, UserEntity} from "../types";
import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";


type UserRecordResults = [UserEntity[], FieldPacket[]];


export class UserRecord implements UserEntity {
   public cratedAt: Date;
   public email: string;
   public name: string;
   public password: string;
   public userId: string;

   constructor(obj: UserEntity) {
       this.userId = obj.userId;
       this.name = obj.name;
       this.password = obj.password;
       this.email = obj.email;
   }

   static async getUser(email: string): Promise<SimpleUserEntity | null>{
       const [result] = await pool.execute("SELECT `name`, `email`, `password` FROM `users` WHERE `email` = :email", {
           email
       }) as UserRecordResults;

       return result.length === 0? null : new UserRecord(result[0])
   }

   async addUserToDB(): Promise<void>{

       await pool.execute( "INSERT INTO `users`(`userId`, `name`,`password`,`email`) VALUES(:userId, :name, :password, :email)",{
           userId: this.userId,
           name: this.name,
           password: this.password,
           email: this.email,
       })
   }
}