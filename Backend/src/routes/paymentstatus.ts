import { Router } from 'express';
import {PaymentStatusController} from "../controller/PaymentStatusController";


//获取订单用get，产生订单用post
const router = Router()

router.get('/', PaymentStatusController.all)
router.get('/:payment_statusId', PaymentStatusController.one)
router.post('/', PaymentStatusController.create)  //创建一个订单
router.put('/:payment_statusId', PaymentStatusController.update)  //更新一个订单
router.delete('/:payment_statusId', PaymentStatusController.delete)


export default router