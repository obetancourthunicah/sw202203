import { getConnection as getSQLiteConn } from "@models/sqlite/SqliteConn";
import { getConnection as getMongoDBConn } from "@models/mongodb/MongoDBConn";
import { CashFlowDao as CashFlowSqLiteDao } from "@models/sqlite/CashFlowDao";
import { CashFlowDao as CashFlowMongoDbDao } from "@models/mongodb/CashFlowDao";
export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
};
export class CashFlow {
  private dao: CashFlowSqLiteDao|CashFlowMongoDbDao;
  public constructor(typeConn: "SQLITE"|"MONGODB"){
    const getConnection = typeConn === "SQLITE" ? getSQLiteConn : getMongoDBConn;
    const CashFlowDao =  typeConn === "SQLITE" ? CashFlowSqLiteDao : CashFlowMongoDbDao;
    getConnection()
      .then(conn=>{
        this.dao = new CashFlowDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  // Consultas
  public getAllCashFlow() {
    return this.dao.getClashFlows()
  }
  public getCashFlowByIndex( index:number|string) {
      if (typeof index === "string") {
        return (this.dao as CashFlowMongoDbDao).getClashFlowById(index as string);
      } else {
        return (this.dao as CashFlowSqLiteDao).getClashFlowById({_id:index as number});
      }
  }

  public addCashFlow( cashFlow:ICashFlow) {
    return this.dao.insertNewCashFlow(cashFlow);
  }
  public updateCashFlow( index:number|string, cashFlow:ICashFlow){
      return (this.dao as CashFlowMongoDbDao).updateCashFlow({...cashFlow, _id:index});
  }
  public deleteCashFlow( index:number|string) {
    if (typeof index === "string") {
      return (this.dao as CashFlowMongoDbDao).deleteCashFlow({_id: index as string});
    } else {
      return (this.dao as CashFlowSqLiteDao).deleteCashFlow({_id:index as number});
    }
  }
}
