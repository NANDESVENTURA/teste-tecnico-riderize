import {Router} from 'express';
import subscriptionController from '../services/SubscriptionService';

const subscriptionRouter = Router();

subscriptionRouter.get('/by-ride/:ride_id', async (req,res) => {
    try{
        const {ride_id} = req.params;
        const subscriptions = await subscriptionController.listSubscriptions({ride_id: parseInt(ride_id)});
        return res.json(subscriptions);
    }catch (error){
        console.log(error);
    }
})

subscriptionRouter.get('/by-user/:user_id', async (req,res) => {
    try{
        const {user_id} = req.params;
        const subscriptionsForUser = await subscriptionController.listSubscriptionsForUser({ user_id: parseInt(user_id)});
        return res.json(subscriptionsForUser)
    }catch (error) {
        console.log(error);
    }
})

subscriptionRouter.post('/', async (req, res) => {
    try {
        
        const newSubscription = await subscriptionController.execute(req.body);
        return res.json(newSubscription);
    } catch (error) {
        return res.json(error)
    }
})

export default subscriptionRouter;