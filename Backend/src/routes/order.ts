import { Router } from 'express';
import {OrderController} from "../controller/OrderController";


//获取订单用get，产生订单用post
const router = Router()

router.get('/', OrderController.all)
router.get('/:orderId', OrderController.one)
router.post('/', OrderController.create)  //创建一个订单
router.put('/:orderId', OrderController.update)  //更新一个订单
router.delete('/:orderId', OrderController.delete)


export default router

// router.get('/:orderId/:paymentStatus', (req,rs) => {
//     //前端发请求的方式有很多种：params, query, headers, body
//     const { orderId, paymentStatus} = req.params
//         // 能满足restful api 的参数写在网址里
//     const { name, age } =req.query  //可直接写在url中&name=cassie&age=30
//         // 分页等辅助的api放在query里
//     const { token, did} = req.headers
//         // 登录状态，前端浏览器和id等信息放在headers里
//     let bodyOrder = req.body
//         // 传大量的数据，放在body里
//     let msg = `orderId is: ${orderId}, payment status: ${paymentStatus}`
//     let msg2 = `token is: ${token}, device id: ${did}`
//     let userInfo = {
//         name: 'Cassie',
//         age: '30',
//         address: 'Toronto ON',
//         education: {
//             primary: 'Urumqi 1st school',
//             high: "youhao school"
//         }
//     }
//     // 这些是标准的header头的字段
//     rs.setHeader('Content-Type', 'application/json')
//     rs.setHeader('X-Powered-By', 'mark2winserver')
//     rs.setHeader('lastVisit', '202434412:33:33')
//     console.log(bodyOrder)
//     console.log(msg)
//     return rs.status(200).json(userInfo)
//     // return rs.status(200).redirect('http://baidu.com')  点击以后重定项，调转到baidu页面
// })


