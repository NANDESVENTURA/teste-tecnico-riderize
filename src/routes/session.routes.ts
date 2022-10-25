import { Router } from 'express';
import sessionController from "../services/sessionService";

const sessionRouter = Router();

sessionRouter.post('/', async (req,res) => {
    try{
        const { email, password} = req.body;
        const auth = await sessionController.authLogin({email,password});
        return res.json(auth);
    }catch (error){
        return res.json(error)
    } 
})

export default sessionRouter;