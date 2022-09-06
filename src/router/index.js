import { Router} from 'express';
import UserRouter from './userRoute.js';

const router = new Router();

router.use('/user', UserRouter);

export default router;