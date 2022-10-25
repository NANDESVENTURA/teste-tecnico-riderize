import { prisma } from '@prisma/client';
import { Router } from 'express';
import userController from '../services/UserService';

const userRouter = Router();

userRouter.get('/', async (req,res) => {
    try{
        const users = await userController.listUsers();
        return res.json(users)
    }catch (error) {
        console.log(error);
    }
});

userRouter.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const user = await userController.findUnique(parseInt(id));
        return res.json(user);
    }catch (error) {
        console.log(error);
    }
})

userRouter.post('/', async (req,res) => {
    try{
        const user = await userController.execute(req.body);
        return res.json(user);
    }catch (err: any) {
        return res.status(400).json({ error: err.message})
    }
});

export default userRouter;


