export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
};
export class CashFlow {
  private cashFlowItems : ICashFlow[] = [];
  
  public addCashFlow( cashFlow:ICashFlow): number {
    const cashFlowExists = this.cashFlowItems.findIndex(
      (obj) => {
        return obj.amount === cashFlow.amount && obj.description === cashFlow.description;
      }
    );
    if (cashFlowExists < 0) {
      this.cashFlowItems.push(cashFlow);
      return this.cashFlowItems.length - 1;
    }
    throw Error('CashFlow Exists on Collection');
  } 
}
