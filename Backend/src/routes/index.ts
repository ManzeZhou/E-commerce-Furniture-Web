
import { Router } from 'express';
import order from "./order";
import orderstatus from "./orderstatus";
import paymentstatus from "./paymentstatus";
import payment_type from "./payment_type";
import user from "./user";


const routes = Router()

routes.use('/order', order)
routes.use('/status', orderstatus)
routes.use('/payment_status', paymentstatus)
routes.use('/payment_type', payment_type)
routes.use('/user', user)

export default routes