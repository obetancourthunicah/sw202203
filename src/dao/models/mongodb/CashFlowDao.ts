import { ICashFlow } from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao";
import {Db, ObjectId} from "mongodb";
import { useLogger } from "@server/utils/logger";

export class CashFlowDao extends AbstractDao<ICashFlow> {
  public constructor(db: Db) {
    super('cashflow', db );
  }
  @useLogger()
  public getClashFlows() {
    return super.findAll()
  }
  @useLogger()
  public getCashFlowByUser(id:string){
    return super.findByFilter({userId: new ObjectId(id)},{sort:{'type': -1}});
  }
  @useLogger()
  public async getCashFlowByUserPaged(userId: string, page:number = 1, itemsPerPage: number = 10){
    try {
      const total = await super.getCollection().countDocuments({userId: new ObjectId(userId)});
      const totalPages = Math.ceil(total / itemsPerPage);
      const items = await super.findByFilter(
        { userId: new ObjectId(userId)},
        { sort:{'type': -1,"date":-1},
          skip:((page-1) * itemsPerPage),
          limit:itemsPerPage
          }
        );
        return {
          total,
          totalPages,
          page,
          itemsPerPage,
          items
        };
    } catch (ex) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }
  @useLogger()
  public getTypeSumarry(userId:string){
    const match = {$match: {userId: new ObjectId(userId)}};
    const group = {$group: {_id: "$type", item: {$sum: 1}}};
    return this.aggregate([match, group], {});
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
