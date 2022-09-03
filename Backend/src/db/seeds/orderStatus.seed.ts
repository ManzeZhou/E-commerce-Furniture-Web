import {Factory, Seeder} from "typeorm-seeding";
import {getRepository} from "typeorm";
import {Connection} from "typeorm";
import {OrderStatus} from "../../entity/OrderStatus";


export class OrderStatusSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repo = getRepository(OrderStatus)
        let status1 = new OrderStatus()
        status1.status = 'orderPaid'
        await repo.save(status1)

        let status2 = new OrderStatus()
        status2.status = 'orderConfirmed'
        await repo.save(status2)

        let status3 = new OrderStatus()
        status3.status = 'orderShipped'
        await repo.save(status3)

        let status4 = new OrderStatus()
        status4.status = 'orderDelivered'
        await repo.save(status4)

        let status5 = new OrderStatus()
        status5.status = 'orderCanceled'
        await repo.save(status5)

        let status6 = new OrderStatus()
        status6.status = 'orderRefund'
        await repo.save(status6)
    }
}

