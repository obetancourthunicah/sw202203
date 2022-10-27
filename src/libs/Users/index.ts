import { getConnection } from "@models/mongodb/MongoDBConn";
import { UsersDao  } from "@models/mongodb/UsersDao";
import {getPassword/*, checkPassword */} from "@utils/crypto";

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
    const newUser = {
      name,
      email,
      password: getPassword(password),
      status: 'ACT',
      oldPasswords: [] as string[],
      created: new Date(),
      updated: new Date(),
      avatar:'',
      _id: null
    };
    return this.dao.createUser(newUser);
  }

  public login(_email: string, _password: string) {
    
  }
}
