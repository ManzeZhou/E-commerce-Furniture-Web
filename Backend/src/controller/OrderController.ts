import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Order } from '../entity/Order';
import { Err, ErrStr, HttpCode } from '../helper/Err';
import { validate } from 'class-validator';
import { IdCheckRes, MkController } from './MkController';
import { UserController } from './UserController';
import { OrderStatusController } from './OrderStatusController';
import { PaymentStatusController } from './PaymentStatusController';
import { PaymentTypeController } from './PaymentTypeController';
import { createClient } from 'redis';

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

// 任何controller都包括crud，增删改查
export class OrderController extends MkController {
  public static get repo() {
    return getRepository(Order);
  }

  //获取所有订单
  static async all(request: Request, response: Response, next: NextFunction) {
    console.log('REDIS connected -----------');
    let orders = [];
    try {
      const ordersFromRedis = await client.get('orders');

      orders = JSON.parse(ordersFromRedis);

      if (!ordersFromRedis) {
        orders = await OrderController.repo.find();

        await client.set('orders', JSON.stringify(orders), { EX: 3600 });
        console.log('SET ORDER TO REDIS____________');
      }
    } catch (e) {
      console.log('error, write to db', e);
      return response
        .status(400)
        .send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
    }
    return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, orders));
  }

  //根据orderId 获取一个订单
  static async one(request: Request, response: Response, next: NextFunction) {
    const { orderId } = request.params;
    if (!orderId) {
      return response
        .status(400)
        .send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
    }
    let order = null;
    let ordersFromRedis = null;
    try {
      ordersFromRedis = await client.get('orders');
      if (ordersFromRedis === null) {
        order = await OrderController.repo.findOneOrFail(orderId);

        await client.set('orders', JSON.stringify(order), { EX: 3600 });
        ordersFromRedis = await client.get('orders');
      }

      const orders = JSON.parse(ordersFromRedis);

      orders.forEach(el => {
        if (parseFloat(el.id) === parseFloat(orderId)) {
          order = el;
        }
        console.log(`GET order from Redis: --- ${order}`);
      });
    } catch (e) {
      console.log('error, write to db', e);
      return response
        .status(400)
        .send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
    }
    return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, order));
  }

  static async validateOrder(
    orderStatus: number,
    paymentStatus: number,
    paymentType: number
  ) {
    let res: IdCheckRes[] = [];

    try {
      let temp = await MkController.checkIdExits(
        orderStatus,
        OrderStatusController.repo
      );
      if (temp.item === null) {
        throw new Err(HttpCode.E400, 'invalid status id', temp);
      }
      res.push(temp);

      temp = await MkController.checkIdExits(
        paymentStatus,
        PaymentStatusController.repo
      );
      if (temp.item === null) {
        throw new Err(HttpCode.E400, 'invalid payment id, ', temp);
      }
      res.push(temp);

      temp = await MkController.checkIdExits(
        paymentType,
        PaymentTypeController.repo
      );
      if (temp.item === null) {
        throw new Err(HttpCode.E400, 'invalid payment id, ', temp);
      }
      res.push(temp);
    } catch (e) {
      console.log('error, write to db', e);
      throw new Err(HttpCode.E400, 'invalid order status and payment id, ', e);
    }
    return res;
  }

  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let {
      invoice,
      totalQuantity,
      taxRate,
      totalPrice,
      productName,
      price,
      media,
      armPad,
      arms,
      backSupport,
      caster,
      frameBase,
      size,
      tilt,
      categoryPrice,
      user,
      orderStatus,
      paymentStatus,
      paymentType,
    } = request.body;

    let order = new Order();
    order.invoice = invoice;
    order.taxRate = taxRate;
    order.totalQuantity = totalQuantity;
    order.totalPrice = totalPrice;
    order.price = price;
    order.productName = productName;
    order.media = media;
    order.categories = {
      arms: arms,
      armPad: armPad,
      backSupport: backSupport,
      caster: caster,
      frameBase: frameBase,
      size: size,
      tilt: tilt,
    };
    order.categoryPrice = categoryPrice;
    order.orderStatus = orderStatus;
    order.paymentStatus = paymentStatus;
    order.paymentType = paymentType;
    order.user = user;

    try {
      const errors = await validate(order);
      if (errors.length > 0) {
        return response
          .status(HttpCode.E400)
          .send(new Err(HttpCode.E400, '', errors));
      }

      let res = await OrderController.validateOrder(
        orderStatus,
        paymentStatus,
        paymentType
      );
      order.orderStatus = res[0].item;
      order.paymentStatus = res[1].item;
      order.paymentType = res[2].item;

      await OrderController.repo.save(order);
    } catch (e) {
      return response
        .status(400)
        .send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
    }

    return response
      .status(HttpCode.E200)
      .send(new Err(HttpCode.E200, ErrStr.OK, order));
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {}

  static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {}

  // static 静态属性，通过类的名字，不需要通过类的实例，直接访问
  // 只能被static的函数或者变量来访问
}
