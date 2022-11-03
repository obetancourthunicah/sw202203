import { ICashFlow } from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao";
import {Db, ObjectId} from "mongodb";

export class CashFlowDao extends AbstractDao<ICashFlow> {
  public constructor(db: Db) {
    super('cashflow', db );
  }
  public getClashFlows() {
    return super.findAll()
  }
  public getCashFlowByUser(id:string){
    return super.findByFilter({userId: new ObjectId(id)},{sort:{'type': -1}});
  }

  public async getClashFlowById( identifier : string ){
    try{
      const result = await super.findByID(identifier);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async insertNewCashFlow( newCashFlow: ICashFlow, userId: string) {
    try {
      const {_id, ...newObject} = newCashFlow;
      newObject.userId = new ObjectId(userId);
      const result = await super.createOne(newObject);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async updateCashFlow( updateCashFlow: ICashFlow) {
    try {
      const {_id, ...updateObject} = updateCashFlow;
      const result = await super.update(_id as string, updateObject);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async getCountCashFlow(userId:string) {
    try {
      return await super.getCollection().countDocuments({userId: new ObjectId(userId)});
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async deleteCashFlow( deleteCashFlow: Partial<ICashFlow>) {
    try {
      const {_id } = deleteCashFlow;
      const result = await super.delete(_id as string);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }
}
