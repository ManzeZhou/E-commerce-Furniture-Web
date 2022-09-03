import { Router } from 'express';
import {PaymentTypeController} from "../controller/PaymentTypeController";


//获取订单用get，产生订单用post
const router = Router()

router.get('/', PaymentTypeController.all)
router.get('/:payment_typeId', PaymentTypeController.one)
router.post('/', PaymentTypeController.create)  //创建一个订单
router.put('/:payment_typeId', PaymentTypeController.update)  //更新一个订单
router.delete('/:payment_typeId', PaymentTypeController.delete)


export default router