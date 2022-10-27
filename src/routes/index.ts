import { Router} from 'express';

import CashFlowRouter  from './CashFlows';
import UsersRouter from './Users';
import apiKeyMW from '@middleware/apiKeyHeaderValidator';

const router  = Router();

// http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', apiKeyMW, CashFlowRouter);
router.use('/security', apiKeyMW, UsersRouter);

export default router;
