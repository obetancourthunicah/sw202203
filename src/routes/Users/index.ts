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

router.post('/login', async (req, res)=>{
  try {
    const {email, password} = req.body;
    const result = await users.login(email, password);
    console.log("LOGIN:", result);
    res.status(200).json(result);
  } catch(ex) {
    console.log("Error:", ex);
    res.status(403).json({error:"Credenciales no son Válidas"});
  }
});

router.post('/addrole/:id', async (req, res)=>{
  try {
    const {id} = req.params;
    const {role} = req.body;
    const result = await users.assignRoles(id, role);
    console.log("ADD_ROLE:", result);
    res.status(200).json(result);
  } catch (ex){
    console.log("Error:", ex);
    res.status(403).json({error:"No se pudo asignar rol"});
  }
});

export default router;
