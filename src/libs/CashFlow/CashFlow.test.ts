import {ICashFlow, CashFlow} from './index';

describe('CashFlow Lib Unit Tests', ()=>{

  it( 'should Create an Instance of CashFlow', ()=>{
      const cashFlowInstance = new CashFlow();
      expect(cashFlowInstance).toBeDefined();
  });
  it(' should Add a new CashFlow Item', ()=>{
      const cashFlowInstance = new CashFlow();
      const cashFlowItem : ICashFlow = {
        type: 'INCOME',
        date: new Date(),
        amount: 100,
        description: 'Receipt A101 from SW'
      };
      const index = cashFlowInstance.addCashFlow(cashFlowItem);
      expect(index).toBe(0);
  });
});
