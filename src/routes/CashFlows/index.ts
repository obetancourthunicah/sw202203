import {Router} from 'express';
import { ICashFlow, CashFlow } from '@libs/CashFlow';

const router = Router();
const cashFlowInstance = new CashFlow();

router.get('/', async (_req, res)=>{
  try {
    res.json(await cashFlowInstance.getAllCashFlow());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({error:ex});
  }
});

router.get('/byindex/:index', async (req, res) => {
  try {
    const { index } = req.params;
    res.json(await cashFlowInstance.getCashFlowByIndex(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});
router.post('/new', async (req, res)=>{
  try {
    const newCashFlow = req.body as unknown as ICashFlow;
    const newCashFlowIndex = await cashFlowInstance.addCashFlow(newCashFlow);
    res.json({newIndex: newCashFlowIndex});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.put('/update/:index', (req, res)=>{
  try {
    const { index } = req.params;
    const cashFlowFromForm = req.body as ICashFlow;
    const cashFlowUpdate = Object.assign(
      cashFlowInstance.getCashFlowByIndex(+index), cashFlowFromForm
    );
    // const cashFlowUpdate = {...cashFlowInstance.getCashFlowByIndex(index), ...cashFlowFromForm};
    if (cashFlowInstance.updateCashFlow(+index, cashFlowUpdate)){
      res.json(cashFlowUpdate);
    } else {
      res.status(404).json({"msg":"Update not posible"});
    }
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.delete('/delete/:index', (req, res)=>{
  try {
    const { index } = req.params;
    if (cashFlowInstance.deleteCashFlow(+index)) {
      res.status(200).json({"msg": "Registro Eliminado"});
    } else {
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al eliminar Registro'});
  }
});


export default router;
