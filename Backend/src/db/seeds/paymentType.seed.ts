import {Factory, Seeder} from "typeorm-seeding";
import {Connection, getRepository} from "typeorm";
import {PaymentType} from "../../entity/PaymentType";


export class PaymentTypeSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repo = getRepository(PaymentType)
        let type1 = new PaymentType()
        type1.type = 'Paypal'
        await repo.save(type1)

        let type2 = new PaymentType()
        type2.type = 'Debit'
        await repo.save(type2)

        let type3 = new PaymentType()
        type3.type = 'Credit'
        await repo.save(type3)

        let type4 = new PaymentType()
        type4.type = 'Wechat'
        await repo.save(type4)

        let type5 = new PaymentType()
        type5.type = 'AliPay'
        await repo.save(type5)

        let type6 = new PaymentType()
        type6.type = 'ApplePay'
        await repo.save(type6)
    }
}