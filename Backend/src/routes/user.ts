import { Router } from 'express';
import { UserController } from "../controller/UserController";

//获取订单用get，产生订单用post
const router = Router()


router.get('/', UserController.all)
router.get('/:userId', UserController.one)
router.post('/', UserController.create)  //创建一个订单
router.put('/:userId', UserController.update)  //更新一个订单
router.delete('/:userId', UserController.delete)


export default router