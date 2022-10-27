import { IUser } from "../entities/User";
import { AbstractDao } from "./AbstractDao";
import {Db} from "mongodb";

export class UsersDao extends AbstractDao<IUser>{
  public constructor(db: Db) {
    super('users', db );
  }
  getUserByEmail(email:string){
    const query = {email};
    return this.findByFilter(query);
  }
  getAllUsers(){}
  updateUserStatus(){}
  changeUserPassword(){}

  createUser(user:IUser){
    const {_id, ...newUser} = user;
    return this.createOne(newUser);
  }
}
