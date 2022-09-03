import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Order} from "./Order";

@Entity()
// @Unique(['invoice'])

export class PaymentStatus{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: false})
    status: string

    @OneToMany(() =>  Order, order => order.paymentStatus)
    orders: Order[]
}