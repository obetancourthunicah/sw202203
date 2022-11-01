import { getConnection } from "@models/mongodb/MongoDBConn";
import { UsersDao  } from "@models/mongodb/UsersDao";
import {checkPassword, getPassword } from "@utils/crypto";
import { sign } from "@utils/jwt";
const availableRole = ['public', 'admin', 'auditor', 'support'];
export class Users {
  private dao: UsersDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UsersDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  public signin(name: string, email:string, password: string){
    const currentDate = new Date();
    const newUser = {
      name,
      email,
      password: getPassword(password),
      status: 'ACT',
      oldPasswords: [] as string[],
      created: currentDate,
      updated: currentDate,
      failedAttempts: 0,
      lastLogin: currentDate,
      avatar:'',
      roles: ['public'],
      _id: null
    };
    return this.dao.createUser(newUser);
  }

  public async login(email: string, password: string) {
    try {
      const user = await this.dao.getUserByEmail(email);
      if(!!!user){
        console.log("LOGIN: NO USER FOUND: ", `${email}`);
        throw new Error("LOGIN NO USER FOUND");
      }
      if (user.status !== 'ACT' ) {
        console.log("LOGIN: STATUS NOT ACTIVE: ", `${user.email} - ${user.status}`);
        await this.dao.updateUserFailed(user._id.toString());
        throw new Error("LOGIN STATUS INVALID");
      }
      if(!checkPassword(password, user.password)){
        console.log("LOGIN: PASSWORD INVALID: ", `${user.email} - ${user.status}`);
        await this.dao.updateUserFailed(user._id.toString());
        throw new Error("LOGIN PASSWORD INVALID");
      }
      const {name, email: emailUser, avatar, _id} = user;
      const returnUser = {name, email: emailUser, avatar, _id};
      await this.dao.updateLoginSuccess(user._id.toString());
      return {...returnUser, token: sign(returnUser)};
    } catch(err){
      console.log("LOGIN:" , err);
      throw err;
    }
  }

  public async assignRoles(id: string, role: string) {
    if( ! availableRole.includes(role) ){
      throw new Error(`Role ${role} must be one of ${availableRole.join(', ')}`);
    }
    return this.dao.addRoleToUser(id, role);
  }
}
