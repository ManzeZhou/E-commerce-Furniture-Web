import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Order} from "./Order";

// annotation

@Entity()

export class OrderStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string

    //一对多 一个status对应多个order
    @OneToMany(() => Order, order => order.orderStatus)
    orders: Order[]
}
