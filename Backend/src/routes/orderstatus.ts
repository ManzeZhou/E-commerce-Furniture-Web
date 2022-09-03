import { Router } from 'express';
import { OrderStatusController } from "../controller/OrderStatusController";

//获取订单用get，产生订单用post
const router = Router()


router.get('/', OrderStatusController.all)
router.get('/:productId', OrderStatusController.one)
router.post('/', OrderStatusController.create)  //创建一个订单
router.put('/:productId', OrderStatusController.update)  //更新一个订单
router.delete('/:productId', OrderStatusController.delete)


export default router