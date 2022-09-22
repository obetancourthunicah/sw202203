import express from 'express';
import { ICashFlow, CashFlow} from '@libs/CashFlow';
const router  = express.Router();

const cashFlowInstance = new CashFlow();

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

router.get('/hello', (req, res)=>{
  const { name = 'NOT NAME FOUND' } = req.query;
  res.json({name});
});

router.get('/view/:id', (req, res)=>{
  const { id = -1 } = req.params as unknown as {id?:number};
  res.json({id});
});

router.post('/new', (req, res)=>{
  try {
    const params = req.body as unknown as ICashFlow;
    const newCashFlow = cashFlowInstance.addCashFlow(params);
    res.json({newIndex: newCashFlow});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.put('/update/:id', (req, res)=>{
  const { id = -1} = req.params as unknown as {id?:number};
  const { name = 'NO NAME', email = "", age = 0 } = req.body as {name?: String, email?: String, age?: number };
  res.json({id, name, email, age});
});

router.delete('/delete/:id', (req, res)=>{
  const { id = -1} = req.params as unknown as {id?:number};
  res.json({ id });
});



export default router;
