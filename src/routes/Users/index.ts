import express from 'express';
const router = express.Router();
import {Users} from  '@libs/Users';

const users = new Users();
router.post('/signin', async (req, res)=> {
  try {
    const {name, email, password} = req.body;
    const result = await users.signin(name, email, password);
    console.log("SIGNIN:", result);
    res.status(200).json({"msg":"Usuario Creado Correctamente"});
  } catch(ex) {
    console.log("Error:", ex);
    res.status(500).json({error:"Error al crear usuario"});
  }
});

export default router;
