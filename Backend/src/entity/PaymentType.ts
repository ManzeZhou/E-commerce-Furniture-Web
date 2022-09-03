import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Order} from "./Order";

@Entity()

export class PaymentType{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string


    // 一对多 一个payment type可以对应多个order
    @OneToMany(() =>  Order, order => order.paymentType)
    orders: Order[]

}