import { Router } from 'express';
import ridesRouter from './rides.routes';
import userRouter from './user.routes';
import subscriptionsRouter from './subscription.routes';
import sessionRouter from './session.routes';
import {authorize} from '../middleware/auth';

const routes = Router();

routes.use('/rides', authorize, ridesRouter);
routes.use('/subscriptions', authorize, subscriptionsRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);


export default routes;
