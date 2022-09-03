import {Factory, Seeder} from "typeorm-seeding";
import {Connection, getRepository} from "typeorm";
import {PaymentStatus} from "../../entity/PaymentStatus";


export class PaymentStatusSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repo = getRepository(PaymentStatus)
        let status1 = new PaymentStatus()
        status1.status = 'paid'
        await repo.save(status1)

        let status2 = new PaymentStatus()
        status2.status = 'pending'
        await repo.save(status2)

        let status3 = new PaymentStatus()
        status3.status = 'completed'
        await repo.save(status3)

        let status4 = new PaymentStatus()
        status4.status = 'refund'
        await repo.save(status4)

        let status5 = new PaymentStatus()
        status5.status = 'rejected'
        await repo.save(status5)

        let status6 = new PaymentStatus()
        status6.status = 'refundRejected'
        await repo.save(status6)
    }
}