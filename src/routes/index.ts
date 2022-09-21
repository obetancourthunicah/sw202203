import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

export default router;
