import { getConnection } from "@models/sqlite/SqliteConn";
import { CashFlowDao } from "@models/sqlite/CashFlowDao";
export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
};
export class CashFlow {
  private dao: CashFlowDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new CashFlowDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  private cashFlowItems : ICashFlow[] = [];
  // Consultas
  public getAllCashFlow() {
    return this.dao.getClashFlows()
    // return this.cashFlowItems; // select * from cashflow;
  }
  public getCashFlowByIndex( index:number) {
      return this.dao.getClashFlowById({_id:index});
      //return this.cashFlowItems[index];
  }

  public addCashFlow( cashFlow:ICashFlow) {
    return this.dao.insertNewCashFlow(cashFlow);
  }
  public updateCashFlow( index:number, cashFlow:ICashFlow): boolean {
    if (index >= 0 && index < this.cashFlowItems.length) {
      this.cashFlowItems[index] = cashFlow;
      return true;
    }
    return false;
  }
  public deleteCashFlow( index:number) {
    return this.dao.deleteCashFlow({_id:index});
  }
}
