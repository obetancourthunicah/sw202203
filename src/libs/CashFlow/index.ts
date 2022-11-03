import { getConnection as getMongoDBConn } from "@models/mongodb/MongoDBConn";
import { CashFlowDao as CashFlowMongoDbDao } from "@models/mongodb/CashFlowDao";
export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
};
export class CashFlow {
  private dao: CashFlowMongoDbDao;
  public constructor(){
    const getConnection =  getMongoDBConn;
    const CashFlowDao =  CashFlowMongoDbDao;
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
  public getAllCashFlowFromUser(id:string) {
    return this.dao.getCashFlowByUser(id);
  }
  public getCashFlowByIndex( index:string) {
        return this.dao.getClashFlowById(index);
  }

  public getCountCashflow(userId:string){
    return this.dao.getCountCashFlow(userId);
  }

  public addCashFlow( cashFlow:ICashFlow, userId: string) {
    const { type, date, amount, description} = cashFlow;
    return this.dao.insertNewCashFlow(
      {
        type,
        date: new Date(date),
        amount: Number(amount),
        description
      }, userId
    );
  }
  public updateCashFlow( index:number|string, cashFlow:ICashFlow){
      return (this.dao as CashFlowMongoDbDao).updateCashFlow({...cashFlow, _id:index});
  }
  public deleteCashFlow( index:string) {
      return this.dao.deleteCashFlow({_id: index})
  }
}
