import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./Order";

@Entity()

export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    fullName: string;

    @Column()
    phoneNumber: string

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    country: string;

    @Column()
    postalCode: string;

    // 一个用户可以有多个order 一对多
    @OneToMany(() => Order, order => order.user)
    orders: Order[]

}