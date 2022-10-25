import { Router } from 'express';
import rideController from '../services/RideService';

const ridesRouter = Router();

ridesRouter.get('/', async (req,res) => {
    try{
        const rides = await rideController.listRides();
        return res.json(rides);
    }catch (error) {
        console.log(error);

    }
});

ridesRouter.get('/by-user/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const createForUser = await rideController.listCreateForUser(parseInt(id));
        return res.json(createForUser);
    }catch (error) {
        console.log(error);
    }
})

ridesRouter.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const ride = await rideController.findUnique(parseInt(id));
        return res.json(ride);
    }catch (error) {
        console.log(error);
    }
})

ridesRouter.post('/', async (req,res) => {
    try{               
        const ride = await rideController.execute(req.body);
        return res.json(ride);
    }catch (err: any) {
        console.log(err);
        return res.status(400).json({ error: err.message});
    }
});

ridesRouter.post('/user', async (req, res) => {
    try{
        const user = await rideController.execute(req.body);
        return res.json(user);
    }catch (err: any) {
        return res.status(400).json({ error: err.message})
    }
})
export default ridesRouter;